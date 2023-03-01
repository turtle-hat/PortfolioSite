// APPEARANCE

const palette = {
    "background"        : 0xFFFFFF,
    "text"              : 0x222222,
    "button"            : 0x123456,
    "genericTangram"    : 0x0000FF,
    "boardEmpty"        : 0xCDDDDD,
    "boardFull"         : 0x81A45B,
    "boardLine"         : 0x899999,
    "piece"             : 0x00FF00,
    "pieceLine"         : 0x222222,
};

// ARRAY UTILITIES

// Creates a deep copy of an array
function copyArray(array) {
    if (Array.isArray(array)) {
        // If this is an array, create a new array to hold its elements
        let elements = [];
        // Iterate through the old array's elements and collect them in the new array
        for (let i = 0; i < array.length; i++) {
            elements.push(copyArray(array[i]));
        }
        // Return the collected elements
        return elements;
    }
    // If it's not an array (ie. it's either stored in an array or completely unrelated),
    // return its own value
    else {
        return array;
    }
}

// Returns true if array contains element, false otherwise. Can tell it to compare references instead of data if stringify wouldn't work.
function arrayContains(array, element, compareReference = false, returnIndex = false) {
    // Iterates through the list
    for(let i = 0; i < array.length; i++) {
        // Returns true, or the index, if a match is found
        if (
            (!compareReference && JSON.stringify(array[i]) == JSON.stringify(element))
            || (compareReference && array[i] == element)
        ) { return returnIndex ? i : true; }
    }
    // If no match found, return false, or -1
    return returnIndex ? -1 : false;
}

// TANGRAM UTILITIES

const defaultGrid = {
    "type" : "grid",
    "parity" : 0,
    "rows" : 1,
    "columns" : 1,
    "tiles" : [[[0, 0]]]
}

const defaultList = {
    "type" : "list",
    "parity" : 0,
    "rows" : 1,
    "columns" : 1,
    "tiles" : [0, 0, 0]
}

// Creates a deep copy of a grid
function copyGrid(grid) {
    try {
        return {
            "type" : "grid",
            "parity" : grid.parity,
            "rows" : grid.rows,
            "columns" : grid.columns,
            "tiles" : copyArray(grid.tiles)
        };
    }
    catch {
        return null;
    }
}

// Creates an empty board with given dimensions and parity.
// Optionally, all tiles can be set to a specific value
function buildGrid(rows = 1, columns = 1, parity = 0, value = 0) {
    let result = {
        "type" : "grid",
        "parity" : parity,
        "rows" : 0,
        "columns" : 0,
        "tiles" : []
    };
    // Iterate through rows
    for (let i = 0; i < rows; i++) {
        // Create new row
        result.tiles[i] = [];
        // Iterate through columns
        for (let j = 0; j < columns; j++) {
            // Create new column (populated with ordered pairs of triangular cells)
            result.tiles[i][j] = [value, value];
        }
    }

    // Set rows and columns
    result.rows = result.tiles.length;
    result.columns = result.tiles[0].length;

    return result;
}

// Takes a pre-existing grid and copies its contents to a new array of a given size.
// Offset determines the new row and column of the topleftmost element of the original grid.
function resizeGrid(grid, rows, columns, rowOffset = 0, columnOffset = 0) {
    // Create new grid of necessary size
    let result = buildGrid(rows, columns);

    // 1. Iterate through rows
    for (let i = 0; i < grid.rows; i++) {
        destinationRow = i + rowOffset;
        // 2. Only try to access values if within array bounds
        if (destinationRow >= 0 && destinationRow < rows) {
            // 3. Iterate through columns
            for (let j = 0; j < grid.columns; j++) {
                destinationCol = j + columnOffset;
                // 4. Ditto with 2.
                if (destinationCol >= 0 && destinationCol < columns) {
                    // 5. Copy the tile to the destination
                    result.tiles[destinationRow][destinationCol] = grid.tiles[i][j];
                }
            }
        }
    }
    // Determine parity
    result.parity = Math.abs(rowOffset + columnOffset + grid.parity) % 2;

    return result;
}

// Resizes a grid to fit another set of tiles of a given size at a given position.
// Returns an object containing the (potentially) resized grid
// and the coordinates of the original grid's first element (since those are subject to change upon resizing).
function smartResizeGrid(grid, rows, columns, rowOffset = 0, columnOffset = 0) {
    if (!confirmGridWithinBounds(grid, rows, columns, rowOffset, columnOffset))
    {
        originalGridOffset = [
            // For new offsets, get the inverse of the amount of underflow
            Math.abs(Math.min(rowOffset, 0)),
            Math.abs(Math.min(columnOffset, 0))
        ];
        // Returns an object with the resultant grid, and however far it offset the original grid's elements within that grid
        return {
            "grid" : resizeGrid(
                grid,
                // For new size, add the amounts of underflow and overflow to the grid's dimensions
                originalGridOffset[0] + Math.max(rowOffset + rows, grid.rows),
                originalGridOffset[1] + Math.max(columnOffset + columns, grid.columns),
                originalGridOffset[0],
                originalGridOffset[1]
            ),
            "originalGridOffset" : originalGridOffset
        }
    }

    // If the grid could already contain the element,
    // don't do any resizing and just return an object with the original info (dereferenced from the original)
    return {
        "grid" : copyGrid(grid),
        "originalGridOffset" : [0, 0]
    };
}

// Get coordinates of all notable tiles in the grid (or those that match an optional set value)
function gridToList(grid, checkValue = null) {
    let result = [];
    let lowest = {"row" : 0, "col" : 0};
    let highest = {"row" : 0, "col" : 0};
    // Loop through all elements of grid
    for (let i = 0; i < grid.rows; i++) {
        for (let j = 0; j < grid.columns; j++) {
            for (let k = 0; k < grid.tiles[i][j].length; k++) {
                // If a check value is specified and the element is equal to it, record the element
                // If no check value is specified, record the element if it is truthy
                if (grid.tiles[i][j][k] == checkValue || (checkValue == null && grid.tiles[i][j][k])) {
                    // Track the top-left corner of the array
                    if (result.length == 0) {
                        // If this is the first entry, immediately snap the lowest and highest row & column to it
                        // (they will be updated later)
                        lowest.row = i;
                        lowest.col = j;
                        highest.row = i;
                        highest.col = j;
                    }
                    if (i < lowest.row) { lowest.row = i; }
                    if (j < lowest.col) { lowest.col = j; }
                    if (i > highest.row) { highest.row = i; }
                    if (j > highest.col) { highest.col = j; }
                    result.push([i, j, k]);
                }
            }
        }
    }

    // Trim empty cells off the beginning
    for (let i = 0; i < result.length; i++) {
        result[i][0] = result[i][0] - lowest.row;
        result[i][1] = result[i][1] - lowest.col;
    }

    // The parity of the grid defines whether the topleftmost tile fits in with
    // even or odd tiles (ie. which way the diagonal divide runs along the triangles)
    return {
        "type" : "list",
        "parity" : (lowest.row + lowest.col + grid.parity) % 2,
        "rows" : highest.row - lowest.row + 1,
        "columns" : highest.col - lowest.col + 1,
        "tiles" : result
    };
}

// Create a grid from coordinates of all notable tiles
function listToGrid(list) {
    // Build a grid big enough to fit 
    result = buildGrid(list.rows, list.columns);
    result = addListToGrid(result, list, 0, 0);
    return result;
}

// Places a single tiles in the list onto the grid, replacing pre-existing tile values and resizing the grid if necessary.
// A custom value can be set for the tiles, allowing the list to either add or subtract tiles from the grid.
// Does not check for compatible parity first; to ensure compatibility, call confirmGridPlaceability() first.
// Returns the coordinates of the position that was (0, 0) so functions using it can place items in the correct spot.
function addValueToGrid(grid, position, value = 1) {
    // First check if the grid would need resizing
    resizeResult = smartResizeGrid(grid, 1, 1, position[0], position[1]);
    // Get information resulting from the resizing
    result = resizeResult.grid;
    offset = resizeResult.originalGridOffset;

    // Set the value of the corresponding grid tile
    result.tiles[position[0] + offset[0]]
                [position[1] + offset[1]]
                [position[2]]
    = value;

    return result;
}

// Places any tiles in the list onto the grid, replacing pre-existing tile values
// A custom value can be set for the tiles, allowing the list to either add or subtract tiles from the grid.
// Does not check for compatible parity first; to ensure compatibility, call confirmGridPlaceability() first.
function addListToGrid(grid, list, rowOffset = 0, columnOffset = 0, value = 1) {
    // First check if the grid would need resizing
    resizeResult = smartResizeGrid(grid, list.rows, list.columns, rowOffset, columnOffset);
    // Get information resulting from the resizing
    result = resizeResult.grid;
    offset = resizeResult.originalGridOffset;
    
    tiles = list.tiles;

    // For all tiles in the list, set the value of each corresponding grid tile
    for (let i = 0; i < tiles.length; i++) {
        result.tiles[tiles[i][0] + rowOffset + offset[0]]
                    [tiles[i][1] + columnOffset + offset[1]]
                    [tiles[i][2]]
        = value;
    }

    return result;
}

// Takes an 
function positionToTangramSpace(position, tangram) {
    return {
        "x" : ((position.x - tangram.x) / tangram.tileSize),
        "y" : ((position.y - tangram.y) / tangram.tileSize),
    };
}

// Same as positionToTangramSpace but 0.5 is added to each value to make the calculation reference the tile's center
function positionToClosestTangramSpace(position, tangram, tileSize) {
    let newPos = positionToTangramSpace(position, tangram, tileSize);
    newPos.x += 0.5;
    newPos.y += 0.5;
    return newPos;
}

// Takes a position with x and y coordinates relative to the top left of the grid, where 1 unit is the dimension of 1 tile,
// as well as the parity of the structure being referred to,
// and returns the coordinates of the tile containing that position.
function tileAtPosition(position, parity) {
    // The square the mouse lies in
    let row = Math.floor(position.y);
    let column = Math.floor(position.x);
    // The position of the mouse within that square
    let yInSquare = position.y - row;
    let xInSquare = position.x - column;
    // The parity of the square the mouse is hovering over
    let squareParity = (row + column + parity) % 2;
    let tile = 0;
    // Get ratio of the mouse's X to Y within the square (flipped if parity = 1) to determine the triangle it's in
    if(xInSquare / Math.abs(squareParity * -1 + yInSquare) > 1) { tile = 1; }
    return [row, column, tile];
}

// Checks whether the list contains the given position
function listContainsPosition(list, position) { 
    return arrayContains(list.tiles, position);
}

// Returns the index of the given position in the list, or -1 if it does not contain it
function listIndexOfPosition(list, position) {
    return arrayContains(list.tiles, position, false, true);
}

// Checks whether the grid contains the given position, and optionally whether it matches checkValue
function gridContainsPosition(grid, position, checkValue = null) {
    let tile = grid.tiles[position[0]][position[1]][position[2]];
    return (checkValue == null && tile) || tile == checkValue;
}

// Returns whether an arbitrary thing with dimensions and position could fit entirely within a grid.
function confirmGridWithinBounds(grid, rows, columns, rowOffset = 0, columnOffset = 0) {
    // If the first row or column is negative,
    // or if its last element would overflow the grid, return false
    return rowOffset >= 0 && rowOffset + rows <= grid.rows
        && columnOffset >= 0 && columnOffset + columns <= grid.columns;
}

// Returns whether the given grid and an arbitrary thing with parity and position are compatible
// For lists, if the parity of the topleftmost tile of the list doesn't match that of the grid coordinate it's being placed on, return false
function confirmGridParity(grid, parity, rowOffset = 0, columnOffset = 0) {
    return parity == (rowOffset + columnOffset + grid.parity) % 2;
}

// Returns true if the grid and the list (with its topleftmost tile at the given row and column)
// share no tiles. Returns false if there is at least one overlapping tile. Returns null if the list cannot be placed properly.
function confirmGridDisjoint(grid, list, rowOffset = 0, columnOffset = 0) {
    // Before checking to make sure the grid and list are disjoint,
    // make sure the program won't run into errors iterating through the list fully
    if (!confirmGridWithinBounds(grid, list.rows, list.columns, rowOffset, columnOffset)) {
        return false;
    }

    tiles = list.tiles;

    // For each tile in the list, test if the corresponding grid value is occupied by testing for truthiness;
    // if occupied, return false
    for (let i = 0; i < tiles.length; i++) {
        if (
            grid.tiles[tiles[i][0] + rowOffset]
                      [tiles[i][1] + columnOffset]
                      [tiles[i][2]]
        )
        {
            return false;
        }
    }

    // If no conflicts, return true
    return true;
}

// Returns whether a list can be placed on the grid:
// with proper parity; without going out of bounds; and without overwriting pre-existing tiles.
function confirmGridPlaceability(grid, list, rowOffset = 0, columnOffset = 0) {
    return confirmGridParity(grid, list.parity, rowOffset, columnOffset)
        && confirmGridDisjoint(grid, list, rowOffset, columnOffset); // Includes a call of confirmGridWithinBounds
}

// Takes a given grid and returns a string (intended for printing)
function gridToString(grid, includePunctuation = false, removeWhitespace = false, includeData = false) {
    let result = "";

    // If any issues, return null;
    try {
        if (includeData) { result += gridDataToString(grid); }
        if (includeData && !removeWhitespace ) { result += "\n"; }

        // Brackets and commas included if includePunctuation is true
        if (includePunctuation) { result += "["; }
        // Spaces, tabs, and linebreaks included if removeWhitespace is false
        if (!removeWhitespace && includePunctuation) { result += "\n\t"; }

        // Print out every row
        for (let i = 0; i < grid.tiles.length; i++) {
            if (includePunctuation) { result += "["; }
            if (!removeWhitespace && includePunctuation) { result += " "; }

            // Print out every column
            for (let j = 0; j < grid.tiles[i].length; j++) {
                // Print out every ordered pair in that column
                if (includePunctuation) { result += "["; }
                result += grid.tiles[i][j][0];
                if (includePunctuation) { result += ","; }
                if (!removeWhitespace && includePunctuation) { result += " "; }
                result += grid.tiles[i][j][1];
                if (includePunctuation) { result += "]"; }

                // If there's a next entry, print separating comma/space (if desired)
                if (j < grid.tiles[i].length - 1) {
                    if (includePunctuation) { result += ","; }
                    if (!removeWhitespace) { result += " "; }
                }
            }

            if (!removeWhitespace && includePunctuation) { result += " "; }
            if (includePunctuation) { result += "]"; }

            if (i < grid.tiles.length - 1) {
                if (includePunctuation) { result += ","; }
                if (!removeWhitespace) { result += "\n"; }
                if (!removeWhitespace && includePunctuation) { result += "\t"; }
            }
        }
        if (!removeWhitespace) { result += "\n"; }
        if (includePunctuation) { result += "]"; }
        return result;
    }
    // If grid is null, return null
    catch
    {
        return null;
    }
}

function gridDataToString(grid) {// Only run if the grid is nonempty
    if (grid.tiles) {
        return `ROWS: ${grid.rows} COLUMNS: ${grid.columns} PARITY: ${grid.parity}`;
    }
    // If grid is null, return null
    else {
        return null;
    }
}