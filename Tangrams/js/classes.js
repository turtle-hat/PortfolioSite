const defaultTangramList = {
    "type" : "list",
    "parity" : 0,
    "rows" : 0,
    "columns" : 0,
    "tiles" : []
};

const defaultTangramGrid = {
    "type" : "grid",
    "parity" : 0,
    "rows" : 1,
    "columns" : 1,
    "tiles" : [[[0, 0]]]
};

class Tangram extends PIXI.Graphics {
    constructor(tileStorage, tileSize, x = 0, y = 0, color = palette.genericTangram) {
        super();
        this.tileSize = tileSize;
        this.tileStorage = tileStorage;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    // Draws all triangles on a grid
    drawGridTriangles(grid, emptyColor) {
        // Start drawing
        this.lineStyle(2, palette.boardLine, 1);
        // Loop through rows, columns, and tiles within each square
        for(let i = 0; i < grid.rows; i++) {
            for(let j = 0; j < grid.columns; j++) {
                for(let k = 0; k < 2; k++) {
                    // Set color based on whether the tile is filled or not
                    if (grid.tiles[i][j][k]) {
                        this.beginFill(this.color);
                    }
                    else {
                        this.beginFill(emptyColor);
                        // this.endFill();
                    }
                    // Draw the triangle at that position
                    this.drawTriangle([i, j, k]);
                }
            }
        }
        this.endFill();
    }

    // Draws all triangles in a list
    drawListTriangles(list) {
        // Start drawing
        this.lineStyle(2, palette.pieceLine, 1);
        this.beginFill(this.color);
        // Loop through all tiles in the list
        for(let i = 0; i < list.tiles.length; i++) {
            this.drawTriangle(list.tiles[i]);
        }
        this.endFill();
    }

    // Draws a triangle at the given position (as it appears in a list)
    drawTriangle(position) {
        // object representing the triangle's starting position
        let st = {
            x : position[1],
            y : position[0]
        }
        // get parity of this triangle specifically
        let par = (position[0] + position[1] + this.tileStorage.parity) % 2;
        this.moveSpacesTo(0, par, st);
        this.lineSpacesTo(1, 1-par, st);
        this.lineSpacesTo(position[2], (position[2] + par + 1) % 2, st);
        this.closePath();
    }

    // Calls PIXI.Graphics.moveTo() relative to this Tangram
    moveSpacesTo(x, y, start) {
        this.moveTo((start.x + x) * this.tileSize, (start.y + y) * this.tileSize);
    }

    // Calls PIXI.Graphics.lineTo() relative to this Tangram
    lineSpacesTo(x, y, start) {
        this.lineTo((start.x + x) * this.tileSize, (start.y + y) * this.tileSize);
    }

    // Check if any of this tangram's triangles contain the mouse's current position
    checkMouseOver(mousePosition, checkValue = -1) {
        // Find X and Y of the mouse relative to this tangram, in units of tile squares
        let hoveredTile = tileAtPosition(
            positionToTangramSpace(mousePosition, this),
            this.tileStorage.parity
            );

        // If outside bounds of this tangram, return false immediately
        if (hoveredTile[0] < 0 || hoveredTile[0] >= this.tileStorage.rows
            || hoveredTile[1] < 0 || hoveredTile[1] >= this.tileStorage.columns) {
            return false;
        }
        
        // Return true only if the tile storage contains an item with the mouse's row, column, and tile
        if (this.tileStorage.type == "list") {
            return listContainsPosition(this.tileStorage, hoveredTile);
        }
        else {
            return gridContainsPosition(this.tileStorage, hoveredTile, checkValue);
        }
    }
}

class Piece extends Tangram {
    constructor(tileStorage = defaultTangramList, tileSize, x = 0, y = 0, color = palette.piece) {
        super(tileStorage, tileSize, x, y, color);
        this.drawListTriangles(tileStorage);
    }
}

class Board extends Tangram {
    constructor(tileStorage = defaultTangramGrid, tileSize, x = 0, y = 0, color = palette.boardFull) {
        super(tileStorage, tileSize, x, y, color);
        this.drawGridTriangles(tileStorage, palette.boardEmpty);
        this.storedPieces = [];
    }

    checkFilled() {
        for (let i of this.tileStorage.tiles) {
            for (let j of i) {
                for (let k of j) {
                    if (!k) { return false; }
                }
            }
        }
        return true;
    }
}