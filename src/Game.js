import React from 'react';
import './Game.css';
import Tile from './Tile';
import Bomb from './Bomb';
import { connect } from 'react-redux';
import displayAlert from './thunks';
import {
    getBoard,
    getIsSet,
} from './selectors';
import { initialClicky, removeCachedBoard } from './actions';

const Tiles = [];
const rows = 10;
const cols = 10;
for (var i = 0; i < rows * cols; i++) {
    Tiles.push({ "key": i });
}

let emptyBoard = genNonBombs(rows * cols, true);

// let board = [];

//createBoard(10, 10, 15, { x: 9, y: 9 });

function createBoard(rows, cols, numBombs, initialClick) {
    const totalTiles = rows * cols;

    const bombs = genBombs(numBombs);
    // console.log(bombs);

    let numSafe = 9;

    // console.log(numEdgesOfPos(initialClick));

    if (isCorner(initialClick)) numSafe = 4;
    else if (isOnAnEdge(initialClick)) numSafe = 6;

    const randomSafe = genNonBombs(totalTiles - numSafe - numBombs);

    const randomizeBoard = shuffle(bombs.concat(randomSafe));
    console.log(randomizeBoard)

    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            insertIntoArray({ x: initialClick.x + i, y: initialClick.y + j }, randomizeBoard, new safeTile());
        }
    }

    // console.log(safe);
    console.log(randomizeBoard);

    return randomizeBoard;
}

function insertIntoArray(pos, arr, itemToInsert) {
    if (pos.x < 0 || pos.x >= cols) return arr;
    if (pos.y < 0 || pos.y >= rows) return arr;

    const index = posToArrIndex(pos);

    arr.splice(index, 0, itemToInsert);

    return arr;
}

function posToArrIndex(pos) {
    return pos.x * cols + pos.y;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function isCorner(pos) {
    return numEdgesOfPos(pos) == 2;
}

function numEdgesOfPos(pos) {
    const left = pos.y == 0;
    const right = pos.y == cols - 1;
    const top = pos.x == 0;
    const bottom = pos.x == rows - 1;

    let total = 0;
    if (left || right) total++;
    if (top || bottom) total++;

    return total;
}

function isOnAnEdge(pos) {
    return numEdgesOfPos(pos) > 0;
}

function safeTile(index) {
    let safeTile = {
        "type": "safe"
    };

    safeTile.index = index;

    return safeTile
}

function bombTile() {
    return {
        "type": "bomb"
    };
}

function genNonBombs(numTiles, includeIndex) {
    const tiles = [];


    for (var i = 0; i < numTiles; i++) {
        tiles.push(new safeTile(includeIndex ? i : null));
    }

    return tiles;
}

function genBombs(numBombs) {
    const bombs = [];

    for (var i = 0; i < numBombs; i++) {
        bombs.push(new bombTile());
    }

    return bombs;
}

function isBomb(tile) {
    return tile.type === "bomb";
}

function indexToPos(index) {
    const y = Math.trunc(index / cols);
    const x = index - y * cols;

    return { x: x, y: y };
}

function setupGame(initialClick) {
    console.log(initialClick);
    // board = 
    return createBoard(10, 10, 15, indexToPos(initialClick));
}



const Game = ({ performInitialSetup, removeCachedBoard, board, isSet }) => {
    console.log(isSet);
    return <div>
        <button onClick={removeCachedBoard}>remove cachced</button>
        <div className="gameWrapper">
            {
                isSet ?
                    board.map((tile) => {
                        if (isBomb(tile))
                            return <Bomb />
                        return <Tile />
                    }) :
                    emptyBoard.map((item) => {
                        // console.log(item);
                        return <Tile tile={item} performInitialSetup={performInitialSetup} />
                    })
            }
        </div>
    </div>


};

const mapStateToProps = state => ({
    board: getBoard(state),
    isSet: getIsSet(state),
});

const mapDispatchToProps = dispatch => ({
    performInitialSetup: (initialClick) => dispatch(initialClicky(setupGame(initialClick))),
    removeCachedBoard: () => dispatch(removeCachedBoard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);