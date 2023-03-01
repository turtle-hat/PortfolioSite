let testGrid = {
    "parity" : 1,
    "rows" : 3,
    "columns" : 2,
    "tiles" : [
        [[0, 1], [1, 0]],
        [[0, 0], [1, 1]],
        [[0, 0], [0, 1]]
    ]
};
let testBoard = {
    "parity" : 0,
    "rows" : 4,
    "columns" : 4,
    "tiles" : [
        [[1, 0], [1, 1], [1, 0], [0, 1]],
        [[0, 1], [1, 0], [0, 1], [1, 1]],
        [[1, 1], [0, 1], [1, 0], [0, 1]],
        [[0, 1], [1, 0], [1, 1], [1, 0]]
    ]
};
let testBoard2 = {
    "parity" : 0,
    "rows" : 4,
    "columns" : 4,
    "tiles" : [
        [[0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 1], [0, 1]],
        [[0, 0], [0, 0], [0, 0], [1, 1]],
        [[0, 0], [1, 0], [0, 0], [1, 1]]
    ]
};

function runPlaceholderLogic(dt) {
    placeholderTimer -= dt;

    if (placeholderTimer < 0) {
        let pl = new Placeholder();
        pl.x = Math.random() * sceneWidth;
        pl.y = Math.random() * sceneHeight;
        placeholderSprites.push(pl);
        gameScene.addChild(pl);

        placeholderTimer = time;
    }

    for (let pl of placeholderSprites) {
        pl.resize(dt);
        if (pl.size >= 5) {
            gameScene.removeChild(pl);
        }
    }

    placeholderSprites = placeholderSprites.filter(pl => pl.size < 5);
}

function printPrototypeText() {
    console.log("Hi Nick! Sorry this isn't as far along as I'd hoped to be, but I hope seeing most of the main technical stuff working will be a good sign at least :)");
    console.log("I don't have much to show visually, hence the placeholder screensaver thing I made as a warmup for getting back into PIXI.");
    console.log("Anyway, I'll just list a few things I have so far for backend tile management!");
    console.log("Here's a representation of one possible tangrams board.");
    console.log(gridToString(testBoard, true));
    console.log("It's a visualization of a board looking something like this: \n◣ ◼︎ ◣ ◢\n◢ ◣ ◢ ◼︎\n◼︎ ◢ ◣ ◢\n◢ ◣ ◼︎ ◣");
    console.log("It's stored internally as a triple-nested array. Each number value there represents whether that triangular tile is filled on the board or not.");
    console.log("The first two dimensions represent the rectangular row and column each tile resides in, like in a standard 2D array. The third dimension represents the position of the tile inside that square; the first value represents the leftmost tile, and the second is the rightmost one. You can see how each ordered pair of numbers corresponds to a square with one triangle filled in.");
    console.log("As you can see, triangles are pointed in one of two different directions; or more generally, for each square block, the division between two triangles can go along either of the square's diagonals. This is what I've been calling the square's \"parity,\" since it rather handily corresponds to whether the sum of each square's X and Y coordinates are even or odd. The final game will only allow tangrams to be placed in spots that allow its parity to match with the underlying tiles. Thankfully since these parities have translation symmetry (at least for this board configuration), only the parity of a tangram's top-left tile needs to be checked against the board to confirm placeability.");
    console.log("Let's take a look at some operations with two different grids.");
    console.log("The first is the board we'll be placing the other piece onto:");
    console.log(gridToString(testBoard2));
    console.log("The second is the piece we'll be placing onto the board:");
    console.log(gridToString(testGrid));
    console.log("For each of these functions, you can specify where you want the piece to be placed on the board. Coordinates are listed as (row, column) and refer to where the piece's top-left tile is, relative to the top-left tile of the board.");
    console.log("First, I have functions to check whether the piece can be placed onto the board in its current position. Let's confirm that it can be placed in the top-left corner:");
    console.log(confirmGridPlaceability(testBoard2, gridToList(testGrid)));
    console.log("However, trying to place it 1 square below that will not work, since the parities of the pieces would conflict:");
    console.log(confirmGridPlaceability(testBoard2, gridToList(testGrid), 1));
    console.log("Trying to place it 2 squares below the top-left corner won't work either, since it would cause the piece to extend outside the bounds of the board:");
    console.log(confirmGridPlaceability(testBoard2, gridToList(testGrid), 2));
    console.log("There's also a function to test for whether the piece overlaps existing tiles on the board. For instance, let's check placing the piece at (1, 1):");
    console.log(confirmGridDisjoint(testBoard2, gridToList(testGrid), 1, 1));
    console.log("However, placing it at (0, 2) would cause at least one conflict:");
    console.log(confirmGridDisjoint(testBoard2, gridToList(testGrid), 0, 2));
    console.log("Now let's get to the fun part: Actually placing our tiles on the board!");
    console.log("Here's the result of placing the piece at (1, 1):");
    console.log(gridToString(addListToGrid(testBoard2, gridToList(testGrid), 1, 1)));
    console.log("As you can see it fits snugly in!");
    console.log("If there is any overlap between the piece and the board, as with placing it at (0, 2), the values in the piece overwrite those in the board (though this would be checked for and prevented in-game):");
    console.log(gridToString(addListToGrid(testBoard2, gridToList(testGrid), 0, 2)));
    console.log("You can also subtract the piece's values from the board instead, as seen here:");
    console.log(gridToString(addListToGrid(testBoard2, gridToList(testGrid), 0, 2, 0)));
    console.log("To do this how I wanted it to, I also created my own function for recursively creating a deep copy of an array. It would probably stack overflow if someone put a self-containing array into it, but nobody'd ever do that, riiiiight?? ;)");
    console.log("Anyway, thanks for reading through this stuff! I know it's not the movable pieces I had hoped for, but it's a start and I should have more free time this week to work on it. (Also sorry for turning this in so late!!)");
}