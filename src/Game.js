import React from 'react';
// import './Game.css';
import Tile from './Minesweeper/Tile';
import Bomb from './Minesweeper/Bomb';
import { connect } from 'react-redux';
import displayAlert from './thunks';
import styled from 'styled-components';
import Timer from './Timer';
import {
    getBoard,
    getIsSet,
    getGame,
    plsRerender,

} from './selectors';
import { initializeBoard, updateBoard, removeCachedBoard, initializeTimer, updateTimer } from './actions';

import MinesweeperGame, { genNonBombs } from './Minesweeper/Minesweeper';
import { isBomb } from './Minesweeper/Tile';

const rows = 10;
const cols = 10;
const numBombs = 10;
let stop = false;

let emptyBoard = new MinesweeperGame(rows, cols, 0, null);

const GameWrapper = styled.div`
    display: inline-grid;
    grid-template-columns: repeat(10,1fr);
`;

const Game = ({ performInitialSetup, clickTile, removeCachedBoard, board, game, isSet, rerender, setStartTime, updateTimer }) => {
    return <div>
        <Timer />
        <button onClick={() => {
            removeCachedBoard();
            stop = true;
            // console.log("here");
        }}>remove cachced</button>
        <GameWrapper>
            {
                isSet ?
                    board.map((tile) => {
                        if (isBomb(tile))
                            return <Bomb click={
                                (tile) => {
                                    // game.clickTile(tile);
                                    alert("loss!")
                                    // clickTile(game.board);
                                }} />
                        return <Tile tile={tile} click={
                            (tile) => {
                                game.clickTile(tile);
                                clickTile(game.board);
                            }} />
                    }) :
                    emptyBoard.board.map((item) => {
                        return <Tile tile={item} click={(tile) => {
                            stop = false;
                            performInitialSetup(tile);
                            var timerInterval;
                            timerInterval = setInterval(() => {
                                updateTimer(new Date());
                                // console.log(stop);
                                if (stop) clearInterval(timerInterval);
                            }, 1000);

                            setStartTime(new Date(), timerInterval);

                        }} />
                    })
            }
        </GameWrapper>
    </div>


};

const mapStateToProps = state => ({
    board: getBoard(state),
    isSet: getIsSet(state),
    game: getGame(state),
    rerender: plsRerender(state),
});

const mapDispatchToProps = dispatch => ({
    performInitialSetup: (tile) => dispatch(initializeBoard(new MinesweeperGame(rows, cols, numBombs, tile.index))),
    clickTile: (tile) => dispatch(updateBoard(tile)),
    removeCachedBoard: () => dispatch(removeCachedBoard()),
    setStartTime: (startTime, interval) => dispatch(initializeTimer(startTime, interval)),
    updateTimer: (now) => dispatch(updateTimer(now)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);  