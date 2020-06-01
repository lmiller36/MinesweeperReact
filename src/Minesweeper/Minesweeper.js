/* eslint-disable complexity */
import { shuffle } from './utils';

const bombTile = {
    type: 'bomb',
};

const safeTile = {
    type: 'safe',
};

function isBomb(tile) {
    return tile.type === 'bomb';
}

class MinesweeperGame {
    constructor(gameDifficulty, initialClick) {
        const { rows, cols, numBombs } = gameDifficulty;
        this.rows = rows;
        this.cols = cols;
        this.bombs = numBombs;
        this.nonBombs = (rows * cols) - numBombs;
        this.remaining = (rows * cols) - numBombs;
        this.opened = new Set();
        if (this.bombs === 0) {
            this.board = genNonBombs(rows * cols);
        } else {
            this.board = this.createBoard(gameDifficulty, initialClick);
            this.clickTile(this.board[initialClick]);
        }
    }

    createBoard(gameDifficulty, initialClick) {
        const { rows, cols, numBombs } = gameDifficulty;

        const pos = this.indexToPos(initialClick, cols);
        const totalTiles = rows * cols;
        const bombs = genBombs(numBombs);

        let numSafe = 9;

        if (this.isCorner(pos, rows, cols)) {
            numSafe = 4;
        } else if (this.isOnAnEdge(pos, rows, cols)) {
            numSafe = 6;
        }

        const randomSafe = genNonBombs(totalTiles - numSafe - numBombs, safeTile);
        const randomizeBoard = shuffle(bombs.concat(randomSafe));

        const finishedBoard = [...Array(rows)].map(() => Array(cols).fill(0));

        this.iterateOverNeighbors(pos, (coords) => {
            finishedBoard[coords.y][coords.x] = safeTile;
        });

        let index = 0;
        this.iterateOverRowsCols((row, col) => {
            if (!finishedBoard[row][col]) {
                finishedBoard[row][col] = randomizeBoard[index];
                index++;
            }

            finishedBoard[row][col] = {
                ...finishedBoard[row][col],
                index: this.posToArrIndex({ x: col, y: row }, cols),
                numBombs: 0,
            };
        });


        this.calculateBombNumberForEachTile(finishedBoard, rows, cols);

        return [].concat(...finishedBoard);
    }

    iterateOverNeighbors(pos, callback) {
        for (let xDelta = -1; xDelta <= 1; xDelta++) {
            for (let yDelta = -1; yDelta <= 1; yDelta++) {
                const coords = { x: pos.x + xDelta, y: pos.y + yDelta };
                if (coords.x < 0 || coords.x >= this.cols) {
                    continue;
                }
                if (coords.y < 0 || coords.y >= this.rows) {
                    continue;
                }
                callback(coords);
            }
        }
    }

    iterateOverRowsCols(callback) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                callback(row, col);
            }
        }
    }

    calculateBombNumberForEachTile(finishedBoard, rows, cols) {
        this.iterateOverRowsCols((row, col) => {
            if (!isBomb(finishedBoard[row][col])) {
                return;
            }
            const pos = { x: col, y: row };

            this.iterateOverNeighbors(pos, (coords) => {
                finishedBoard[coords.y][coords.x].numBombs += 1;
            });

        });
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

    // setupGame(initialClick) {
    //     return createBoard(10, 10, 15, this.indexToPos(initialClick));
    // }

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
        let numFlagged = 0;
        this.iterateOverNeighbors(this.indexToPos(tile.index, this.cols), (coords) => {
            const index = this.posToArrIndex(coords, this.cols);
            if (this.isFlagged(index)) {
                numFlagged++;
            }
        });

        return numFlagged;
    }

    openNeighbors(tileToOpen) {
        const numFlagged = this.neighborsWithFlags(tileToOpen);
        const pos = this.indexToPos(tileToOpen.index, this.cols);

        if (numFlagged === tileToOpen.numBombs) {

            this.iterateOverNeighbors(pos, (coords) => {
                const index = this.posToArrIndex(coords, this.cols);

                if (this.indexWithinBounds(index)) {
                    const tile = this.board[index];
                    if (this.isFlagged(index)) {
                        return;
                    }
                    if (tile.isOpened) {
                        return;
                    }
                    this.clickTile(tile);
                }
            });
        }
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
        const pos = this.indexToPos(tileToOpen.index, this.cols);
        // console.log(tileToOpen.index);
        if (tileToOpen.isOpened) {
            return;
        }
        this.board[tileToOpen.index].isOpened = true;

        this.decrementUsed(tileToOpen.index);

        if (tileToOpen.numBombs && tileToOpen.numBombs > 0) {
            return;
        }

        this.iterateOverNeighbors(pos, (coords) => {
            const tileToOpen = this.board[this.posToArrIndex(coords, this.cols)];
            if (isBomb(tileToOpen)) {
                return;
            }

            this.openNonBombNeighbors(tileToOpen);
        });
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