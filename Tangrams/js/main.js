"use strict";

// constants
const sceneWidth = 960;
const sceneHeight = 720;
const app = new PIXI.Application({
    width: sceneWidth,
    height: sceneHeight,
    backgroundColor: palette.background
});

// aliases
let stage;

// scenes
let gameScene;
let winScene;

// game GUI
let winText;
let instructions;
let scoreText;

// game variables
let paused = false;
let mousePosition;
let board;
let boardSquares = {"rows" : 5, "columns" : 4};
let boardScreenHeight = 360;
let moves;
let par;
let pieces = [];
let heldPiece = null;
let holdPosition;

// Sounds
let snd = {};

// Placeholder variables/functions for testing/warmup
const time = 0.2;
let placeholderTimer = 0;
let placeholderSprites = [];

window.onload = (e) => {
    document.querySelector("#gameContainer").appendChild(app.view);
    app.view.id = "game";

    app.loader.add(
        [
            "gameAssets/placeholder.png"
        ]
    );
    // app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
    app.loader.onComplete.add(setup);
    app.loader.load();
}

// Initializes game state
function setup() {
    stage = app.stage;

    // #1 - Create the main scene
    gameScene = new PIXI.Container();
    stage.addChild(gameScene);

    // #2 - Create the win scene
    winScene = new PIXI.Container();
    winScene.visible = false;
    stage.addChild(winScene);

    // #3 - Create label for win scene
    createGUI();

    // #4 - Start game
    newGame(3, 3);

    // #6 - Load sounds
    snd["pickup"] = new Howl({src: ['gameAssets/sounds/pickup.mp3']});
    snd["place"] = new Howl({src: ['gameAssets/sounds/place.mp3']})
    snd["placeSuccess"] = new Howl({src: ['gameAssets/sounds/placeSuccess.mp3']})

    // #7 - Start update loop
    app.ticker.add(gameLoop);

    // #8 - Mouse events
    app.view.onpointerdown = pickupPiece;
    window.onpointerup = releasePiece;
}

// GUI code taken from Circle Blast
function createGUI() {
    let buttonTextStyle = new PIXI.TextStyle({
        fill: palette.button,
        fontSize: 90,
        fontFamily: "Cormorant"
    });

    let uiStyle = new PIXI.TextStyle({
        fill: palette.text,
        fontSize: 32,
        fontFamily: "Cormorant",
    });

    instructions = new PIXI.Text("Move tangrams by\nclicking and dragging.\nTry to fill the grid!");
    instructions.style = uiStyle;
    instructions.x = sceneWidth - 290;
    instructions.y = 0;
    gameScene.addChild(instructions);

    scoreText = new PIXI.Text("");
    scoreText.style = uiStyle;
    scoreText.x = sceneWidth - 290;
    scoreText.y = (sceneHeight - boardScreenHeight) / 2 + boardScreenHeight;
    gameScene.addChild(scoreText);
    scoreText.visible = false;

    let winText = new PIXI.Text("Well put!");
    winText.style = new PIXI.TextStyle({
        fill: palette.background,
        fontSize: 128,
        fontFamily: "Cormorant",
        stroke: palette.text,
        strokeThickness: 6
    });
    winText.x = 0;
    winText.y = (sceneHeight - boardScreenHeight) / 2;
    winScene.addChild(winText);

    let restartButton = new PIXI.Text("{ Play again }");
    restartButton.style = buttonTextStyle;
    restartButton.x = 10;
    restartButton.y = (sceneHeight - boardScreenHeight) / 2 + 200;
    restartButton.interactive = true;
    restartButton.buttonMode = true;
    restartButton.on('pointerup', newGame);
    restartButton.on('pointerover', e => e.target.alpha = 0.7);
    restartButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    winScene.addChild(restartButton);
}

// Called every frame
function gameLoop(){
	if (paused) return; // keep this commented out for now

    // #1 - Calculate "delta time"
    let dt = 1/app.ticker.FPS;
    if (dt > 1/12) { dt = 1/12; }

    mousePosition = app.renderer.plugins.interaction.mouse.global;

    // If holding a tangram, move it alongside the mouse
    if (heldPiece) {
        heldPiece.x = Math.min(
            sceneWidth - (heldPiece.tileStorage.columns * heldPiece.tileSize),
            // Set position of tangram to stay with mouse (clamped within screen bounds)
            Math.max(0, mousePosition.x - holdPosition.x)
            );
        heldPiece.y = Math.min(
            sceneHeight - (heldPiece.tileStorage.rows * heldPiece.tileSize),
            Math.max(0, mousePosition.y - holdPosition.y)
            );
    }

    // runPlaceholderLogic(dt);
}

function newGame() {
    winScene.visible = false;
    // Build a board with the the given dimensions
    createBoard(buildGrid(boardSquares.rows, boardSquares.columns));
    board.x = sceneWidth - (boardSquares.columns * board.tileSize)
    board.y = (sceneHeight - boardScreenHeight) / 2

    // Calculate out how often tangrams should split when generating
    let chance = 1 / Math.pow(boardSquares.rows * boardSquares.columns, 0.5);
    // Generate pieces into the board
    resetPieceList();
    generatePieces(board, chance);

    moves = -1;
    par = Math.floor(pieces.length * 1.5);
    increaseMoves();
}

function increaseMoves() {
    moves++;
    scoreText.text = `Par: ${par}  Moves: ${moves}`;
}

function createPiece(tileList, x, y) {
    let p = new Piece(tileList, boardScreenHeight / boardSquares.rows, x, y, Math.floor(Math.random() * Math.pow(16, 6)));
    p.interactive = true;
    pieces.push(p);
    gameScene.addChild(p);
}

function createBoard(tileGrid, x, y) {
    let b = new Board(tileGrid, boardScreenHeight / boardSquares.rows, x, y, 0xFF0000);
    b.interactive = false;
    board = b;
    gameScene.addChild(b);
}

// Remove all pieces from the board and 
function resetPieceList() {
    for (let i = pieces.length - 1; i >= 0; i--) {
        gameScene.removeChild(pieces[i]);
        pieces.pop();
    }
}

// Pick up a piece if one is under the mouse
function pickupPiece(e) {
    if (paused) return;

    let clickedPieceIndex = -1;

    // Loop through all pieces to get the one last in the scene hierarchy that was clicked
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].checkMouseOver(mousePosition)) {
            clickedPieceIndex = i;
        };
    }

    // If a clicked piece was found
    if (clickedPieceIndex >= 0) {
        snd.pickup.play();
        // Remove and re-add the piece to both the scene and the array to bump it to the top layer
        gameScene.removeChild(heldPiece);
        heldPiece = pieces.splice(clickedPieceIndex, 1)[0];
        pieces.push(heldPiece);
        gameScene.addChild(heldPiece);
        holdPosition = {
            "x" : mousePosition.x - heldPiece.x,
            "y" : mousePosition.y - heldPiece.y
        };

        // If the piece just picked up is on the board
        let index = board.storedPieces.indexOf(heldPiece);
        if (index >= 0) {
            winScene.visible = false;
            // Moves used to increase upon lifting a placed piece off the grid
            // increaseMoves();
            // Remove it from the board
            board.storedPieces.splice(index, 1);
            // Get the position of the held piece on the board
            let boardPosition = tileAtPosition(
                positionToClosestTangramSpace(heldPiece, board),
                board.tileStorage.parity
            );
            // Subtract its tiles from the board
            board.tileStorage = addListToGrid(board.tileStorage, heldPiece.tileStorage, boardPosition[0], boardPosition[1], 0);
        }
    }
}

// Release the held piece if there is any
function releasePiece(e) {
    if (paused) return;

    // If there's any held piece,
    if (heldPiece) {

        // Get the coordinates of the piece relative to the closest board square
        let closestCoordinates = positionToClosestTangramSpace(heldPiece, board)
        // Get the position on the board of these coordinates
        let boardPosition = tileAtPosition(
            closestCoordinates,
            board.tileStorage.parity
        );

        if(confirmGridPlaceability(board.tileStorage, heldPiece.tileStorage, boardPosition[0], boardPosition[1])
        ) {
            instructions.visible = false;
            scoreText.visible = true;
            increaseMoves();
            board.tileStorage = addListToGrid(board.tileStorage, heldPiece.tileStorage, boardPosition[0], boardPosition[1], 1);
            board.storedPieces.push(heldPiece);
            heldPiece.x = board.x + (boardPosition[1] * board.tileSize);
            heldPiece.y = board.y + (boardPosition[0] * board.tileSize);
            snd.placeSuccess.play();
            if (board.checkFilled()) {
                winScene.visible = true;
            }
        }
        else {
            snd.place.play();
        }

        // Delete references to it
        heldPiece = null;
        holdPosition = null;
    }
}

// Get the positions of tiles adjacent to this one on a given grid
// Optionally, only return adjacencies that match a certain value
function getAdjacentTiles(grid, position, checkValue = null) {
    let adjacentPositions = [];

    // Get other tile in same square
    let adjacentTile = [
        position[0], // Row is same
        position[1], // Column is same
        (position[2] + 1) % 2 // Tile is opposite whatever the tile is at that position
    ];
    // If there is no necessary value or that tile matches the value, push it
    if (checkValue == null || grid.tiles[adjacentTile[0]][adjacentTile[1]][adjacentTile[2]] == checkValue) {
        adjacentPositions.push(adjacentTile);
    }

    // Get adjacent tile in same row
    let tileParity = (grid.parity + position[0] + position[1]) % 2;
    let adjacentRow = [
        position[0] + 1 - (2 * ((tileParity + position[2]) % 2)), // Row is +1 if tile parity and tile are same, -1 if different
        position[1], // Column is always same as the one being checked
        position[2] // Tile is always same as the one being checked
    ];
    // If that tile is inbounds, and either there is no necessary value or that tile matches the value, push it
    if (confirmGridWithinBounds(grid, 1, 1, adjacentRow[0], adjacentRow[1])
        && (checkValue == null || grid.tiles[adjacentRow[0]][adjacentRow[1]][adjacentRow[2]] == checkValue))
    {
        adjacentPositions.push(adjacentRow);
    }

    // Get adjacent tile in same column
    let adjacentColumn = [
        position[0], // Row is always same as the one being checked
        position[1] - 1 + (2 * position[2]), // Column is -1 if checking first tile, +1 if checking second tile
        (position[2] + 1) % 2 // Tile is always opposite the one being checked
    ];
    if (confirmGridWithinBounds(grid, 1, 1, adjacentColumn[0], adjacentColumn[1])
        && (checkValue == null || grid.tiles[adjacentColumn[0]][adjacentColumn[1]][adjacentColumn[2]] == checkValue))
    {
        adjacentPositions.push(adjacentColumn);
    }

    return adjacentPositions;
}

// Takes a board and generates a list of tangram pieces that can fit on it
function generatePieces(board, newTileFrequency = 0.25) {
    // Create a grid of the same dimensions as the board
    let workingGrid = buildGrid(board.tileStorage.rows, board.tileStorage.columns, board.tileStorage.parity, 1);
    // workingGrid represented as a list
    let workingList = gridToList(workingGrid, 1);
    // The total number of tiles in the grid at the start, used to iterate the correct number of times
    let totalTiles = workingList.tiles.length;
    let currentPiece = buildGrid(workingGrid.rows, workingGrid.columns, workingGrid.parity, 0);
    // Create an array to store all positions that could be added to the current piece as we go
    let possibleAdjacencies = [];

    // Add our first tile to our first piece

    // Get random index within the list
    let index = Math.floor(Math.random() * workingList.tiles.length);
    // Add that value to our piece
    currentPiece = addValueToGrid(currentPiece, workingList.tiles[index], 1);
    // Set the possibleAdjacencies array to include just that piece's adjacencies
    possibleAdjacencies = getAdjacentTiles(workingGrid, workingList.tiles[index], 1);
    // Zero the value in the workingGrid and remove the value from workingList
    workingGrid = addValueToGrid(workingGrid, workingList.tiles[index], 0);
    workingList.tiles.splice(index, 1);

    // console.log(gridToString(workingGrid));
    // console.log(workingList.tiles);
    // console.log(gridToString(currentPiece));
    // console.log(possibleAdjacencies);

    // For the rest 
    for (let i = 1; i < totalTiles; i++) {
        // If a random roll passes, or if no adjacent tiles are available,
        // create our current tile as a tile and make a new tile
        if (possibleAdjacencies.length == 0 || Math.random() < newTileFrequency) {
            // Create current piece (guaranteed to have at least one tile)
            let currentPieceList = gridToList(currentPiece);
            createPiece(
                currentPieceList,
                Math.random() * (sceneWidth / 2 - currentPieceList.columns * board.tileSize),
                Math.random() * (sceneHeight - currentPieceList.rows * board.tileSize)
            );

            // Let our piece be a new tile using the same process as above
            index = Math.floor(Math.random() * workingList.tiles.length);
            currentPiece = buildGrid(workingGrid.rows, workingGrid.columns, workingGrid.parity, 0);
            currentPiece = addValueToGrid(currentPiece, workingList.tiles[index], 1);
            possibleAdjacencies = getAdjacentTiles(workingGrid, workingList.tiles[index], 1);
            workingGrid = addValueToGrid(workingGrid, workingList.tiles[index], 0);
            workingList.tiles.splice(index, 1);
        }
        // Otherwise, add an adjacent tile to this piece
        else {
            // Add a random tile adjacent to one of the tiles in the current piece
            let index = Math.floor(Math.random() * possibleAdjacencies.length);
            currentPiece = addValueToGrid(currentPiece, possibleAdjacencies[index], 1);
            // Get the new tile's adjacencies
            let newAdjacencies = getAdjacentTiles(workingGrid, possibleAdjacencies[index], 1);
            // Filter out any adjacencies already accounted for
            newAdjacencies = newAdjacencies.filter((adj) => !arrayContains(possibleAdjacencies, adj, false, false));
            // Remove that chosen tile position from workingGrid, workingList.tiles, and possibleAdjacencies
            workingGrid = addValueToGrid(workingGrid, possibleAdjacencies[index], 0);
            workingList.tiles.splice(listIndexOfPosition(workingList, possibleAdjacencies[index]), 1);
            possibleAdjacencies.splice(index, 1);
            // Add the new tile's adjacencies to possibleAdjacencies
            for (let adj of newAdjacencies) {
                possibleAdjacencies.push(adj);
            }
        }
    }

    // Add the final piece
    let currentPieceList = gridToList(currentPiece);
    createPiece(
        currentPieceList,
        Math.random() * (sceneWidth / 2 - currentPieceList.columns * board.tileSize),
        Math.random() * (sceneHeight - currentPieceList.rows * board.tileSize)
    );
}