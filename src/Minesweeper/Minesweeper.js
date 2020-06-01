import { shuffle } from './utils';
import { bombTile, safeTile, isBomb } from './Tile';

class MinesweeperGame {
    constructor(rows, cols, bombs, initialClick) {
        console.log(`rows:${rows} cols:${cols}`);
        this.rows = rows;
        this.cols = cols;
        this.bombs = bombs;
        this.nonBombs = (rows * cols) - bombs;
        this.remaining = (rows * cols) - bombs;
        this.opened = new Set();
        if (this.bombs === 0) {
            this.board = this.createEmptyBoard(rows, cols);
        }
        else {
            this.board = this.createBoard(rows, cols, bombs, initialClick);
            this.clickTile(this.board[initialClick]);
        }
    }

    createEmptyBoard(rows, cols) {
        var x = genNonBombs(rows * cols);
        return x;
    }

    createBoard(rows, cols, numBombs, initialClick) {
        const pos = this.indexToPos(initialClick, cols);
        const totalTiles = rows * cols;
        const bombs = genBombs(numBombs);

        let numSafe = 9;

        if (this.isCorner(pos, rows, cols)) numSafe = 4;
        else if (this.isOnAnEdge(pos, rows, cols)) numSafe = 6;

        const randomSafe = genNonBombs(totalTiles - numSafe - numBombs, safeTile);
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

                finishedBoard[row][col] = {
                    ...finishedBoard[row][col],
                    index: this.posToArrIndex({ x: col, y: row }, cols),
                    numBombs: 0,
                }
            }
        }

        this.calculateBombNumberForEachTile(finishedBoard, rows, cols);

        return [].concat(...finishedBoard);
    }

    calculateBombNumberForEachTile(finishedBoard, rows, cols) {
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {

                if (!isBomb(finishedBoard[row][col])){
                    continue;
                }



                for (var xDelta = -1; xDelta <= 1; xDelta++) {
                    for (var yDelta = -1; yDelta <= 1; yDelta++) {
                        var coords = { x: col + xDelta, y: row + yDelta };
                        if (coords.x < 0 || coords.x >= cols) continue;
                        if (coords.y < 0 || coords.y >= rows) continue;

                        finishedBoard[coords.y][coords.x].numBombs += 1;
                    }
                }
            }
        }
    }


    posToArrIndex(pos, cols) {
        return pos.y * cols + pos.x;
    }

    isCorner(pos, rows, cols) {
        return this.numEdgesOfPos(pos, rows, cols) === 2;
    }

    numEdgesOfPos(pos, rows, cols) {
        const left = pos.y === 0;
        const right = pos.y === cols - 1;
        const top = pos.x === 0;
        const bottom = pos.x === rows - 1;

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
        return createBoard(10, 10, 15, indexToPos(initialClick));
    }

    clickTile(tile) {
        this.openNonBombNeighbors(tile);
    }

    flagTile(tile) {
        const curr = this.board[tile.index];
        const flaggedState = curr.isFlagged;
        curr.isFlagged = !flaggedState;
    }

    indexWithinBounds(index) {
        return index >= 0 && index < this.rows * this.cols;
    }

    isFlagged(index) {
        return this.board[index].isFlagged;
    }

    neighborsWithFlags(tile) {
        var numFlagged = 0;
        for (var i = -this.cols; i <= this.cols; i += this.cols) {
            for (var j = -1; j <= 1; j++) {
                var index = i + tile.index + j;

                if (this.indexWithinBounds(index) && this.isFlagged(index)) {
                    numFlagged++;
                }
            }
        }

        return numFlagged;
    }

    openNeighbors(tileToOpen) {
        var numFlagged = this.neighborsWithFlags(tileToOpen);
        var pos = this.indexToPos(tileToOpen.index, this.cols);

        if (numFlagged === tileToOpen.numBombs) {
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    var coords = { x: pos.x + i, y: pos.y + j };
                    if (coords.x < 0 || coords.x >= this.cols) continue;
                    if (coords.y < 0 || coords.y >= this.rows) continue;
                    var index = this.posToArrIndex(coords, this.cols);

                    if (this.indexWithinBounds(index)) {
                        var tile = this.board[index];
                        console.log(tile);
                        if (this.isFlagged(index))
                            continue;
                        if (tile.isOpened) continue;
                        this.clickTile(tile);
                    }
                }
            }
        }

        console.log(tileToOpen);
    }

    decrementUsed(index) {
        if (!this.opened.has(index)) {
            this.remaining--;
        }
        this.opened.add(index);
        if (this.opened.size === this.nonBombs) {
            alert('WIN!');
        }
    }

    openNonBombNeighbors(tileToOpen) {
        if (tileToOpen.type === 'bomb') {
            alert('loss!');
            return;
        }
        var pos = this.indexToPos(tileToOpen.index, this.cols);
        // console.log(tileToOpen.index);
        if (tileToOpen.isOpened) {
            return;
        }
        this.board[tileToOpen.index].isOpened = true;

        this.decrementUsed(tileToOpen.index);

        if (tileToOpen.numBombs && tileToOpen.numBombs > 0) return;
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                var coords = { x: pos.x + i, y: pos.y + j };
                if (coords.x < 0 || coords.x >= this.cols) continue;
                if (coords.y < 0 || coords.y >= this.rows) continue;

                const tileToOpen = this.board[this.posToArrIndex(coords, this.cols)];
                if (isBomb(tileToOpen)) continue;

                this.openNonBombNeighbors(tileToOpen);

            }
        }
    }

}

function genNonBombs(numTiles, includeIndex, toInsert) {
    const tiles = [];


    for (let count = 0; count < numTiles; count++) {
        tiles.push({
            ...toInsert,
            index: count,
        });
    }

    return tiles;
}

function genBombs(numBombs) {
    const bombs = [];

    for (let count = 0; count < numBombs; count++) {
        bombs.push(bombTile);
    }

    return bombs;
}

export default MinesweeperGame;