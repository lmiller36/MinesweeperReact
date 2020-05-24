import React from 'react';
import './Game.css';
import Tile from './Minesweeper/Tile';
import Bomb from './Bomb';
import { connect } from 'react-redux';
import displayAlert from './thunks';
import {
    getBoard,
    getIsSet,
} from './selectors';
import { initializeBoard, removeCachedBoard } from './actions';

import MinesweeperGame, { genNonBombs } from './Minesweeper/Minesweeper';
import {  isBomb } from './Minesweeper/Tile';

// const Tiles = [];
const rows = 5;
const cols = 5;
const numBombs = 10;

// for (var i = 0; i < rows * cols; i++) {
//     Tiles.push({ "key": i });
// }


let emptyBoard = new MinesweeperGame(rows, cols, 0, null);



const Game = ({ performInitialSetup, removeCachedBoard, board, isSet }) => {
    return <div>
        <button onClick={removeCachedBoard}>remove cachced</button>
        <div className="gameWrapper">
            {
                isSet ?
                    board.board.map((tile) => {
                        if (isBomb(tile))
                            return <Bomb />
                        return <Tile />
                    }) :
                    emptyBoard.board.map((item) => {
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
    performInitialSetup: (initialClick) => dispatch(initializeBoard(new MinesweeperGame(rows, cols, numBombs, initialClick))),
    removeCachedBoard: () => dispatch(removeCachedBoard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);  