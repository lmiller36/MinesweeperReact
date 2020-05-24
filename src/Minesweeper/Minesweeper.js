import { shuffle } from './utils';
import { bombTile, safeTile, isBomb } from './Tile';

class MinesweeperGame {
    constructor(rows, cols, bombs, initialClick) {
        this.rows = rows;
        this.cols = cols;
        this.bombs = bombs;
        if (this.bombs == 0)
            this.board = this.createEmptyBoard(rows, cols);
        else
            this.board = this.createBoard(rows, cols, bombs, initialClick);
    }

    createEmptyBoard(rows, cols) {
        var x = genNonBombs(rows * cols);
        return x;
    }

    createBoard(rows, cols, numBombs, initialClick) {
        const pos = this.indexToPos(initialClick, cols);
        const totalTiles = rows * cols;
        const bombs = genBombs(numBombs);
        const numSafe = 9;

        if (this.isCorner(pos, rows, cols)) numSafe = 4;
        else if (this.isOnAnEdge(pos, rows, cols)) numSafe = 6;

        const randomSafe = genNonBombs(totalTiles - numSafe - numBombs);
        const randomizeBoard = shuffle(bombs.concat(randomSafe));

        var finishedBoard = [];
        for (var i = 0; i < rows; i++) {
            var tmp = [];
            for (var j = 0; j < cols; j++) {
                tmp.push(0);
            }
            finishedBoard.push(tmp);
        }

        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                var coords = { x: pos.x + i, y: pos.y + j };
                if (coords.x < 0 || coords.x >= cols) continue;
                if (coords.y < 0 || coords.y >= rows) continue;

                console.log(coords)

                finishedBoard[coords.y][coords.x] = safeTile;

            }
        }

        var index = 0;
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                if (!finishedBoard[row][col]) {
                    finishedBoard[row][col] = randomizeBoard[index];
                    index++;
                }
            }
        }

        return [].concat(...finishedBoard);;
    }

    insertIntoArray(pos, arr, itemToInsert) {

        // const index = this.posToArrIndex(pos);

        // arr.splice(index, 0, itemToInsert);

        // return arr;
    }

    posToArrIndex(pos, cols) {
        return pos.x * cols + pos.y;
    }

    isCorner(pos, rows, cols) {
        return this.numEdgesOfPos(pos, rows, cols) == 2;
    }

    numEdgesOfPos(pos, rows, cols) {
        // console.log(pos)
        // console.log(rows + " " + cols);
        const left = pos.y === 0;
        const right = pos.y === cols - 1;
        const top = pos.x === 0;
        const bottom = pos.x === rows - 1;

        // console.log(left + " " + right + " " + top + " " + bottom);

        let total = 0;
        if (left || right) total++;
        if (top || bottom) total++;

        return total;
    }

    isOnAnEdge(pos, rows, cols) {
        return this.numEdgesOfPos(pos, rows, cols) > 0;
    }



    indexToPos(index, cols) {
        const y = Math.trunc(index / cols);
        const x = index - y * cols;

        return { x: x, y: y };
    }

    setupGame(initialClick) {
        console.log(initialClick);
        // board = 
        return createBoard(10, 10, 15, indexToPos(initialClick));
    }


    // // creates an empty board
    // constructor(rows,cols){
    //    this.board = genNonBombs(rows * cols, true);
    // }
}

// const rows = 10;
// const cols = 10;
// const numBombs = 10;

// export function genNonBombs(numTiles, includeIndex) {
//     const tiles = [];


//     for (var i = 0; i < numTiles; i++) {
//         tiles.push(safeTile(includeIndex ? i : null));
//     }

//     return tiles;
// }


function genNonBombs(numTiles, includeIndex) {
    const tiles = [];


    for (var i = 0; i < numTiles; i++) {
        tiles.push({
            ...safeTile,
            index: i,
        });
    }

    return tiles;
}

function genBombs(numBombs) {
    const bombs = [];

    for (var i = 0; i < numBombs; i++) {
        bombs.push(bombTile);
    }

    return bombs;
}

export default MinesweeperGame;