/* eslint-disable complexity */
import React from 'react';
import Tile from './Minesweeper/Tile';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
    getBoard,
    getIsSet,
    getGame,
    plsRerender,
    getGameMode,
    getGameDifficulty,

} from './selectors';
import { initializeBoard, updateBoard, removeCachedBoard, initializeTimer, updateTimer, toggleGameMode, setGameDifficulty } from './actions';

import MinesweeperGame from './Minesweeper/Minesweeper';
import { isBomb } from './Minesweeper/Tile';
import './Game.css';

let stop = false;
let emptyBoard = null;

let first = true;
const secondInMilli = 1000;

const Game = ({
    // state
    board, game, isSet, gameMode,
    // actions
    performInitialSetup, updateBoard, localRemoveCachedBoard, setDifficulty, setStartTime, updateTimer, toggleGameMode, gameDifficulty
}) => {

    const GameWrapper = styled.div`
        display: inline-grid;
        grid-template-columns: repeat(${gameDifficulty.cols},1fr);
    `;

    emptyBoard = new MinesweeperGame(gameDifficulty.rows, gameDifficulty.cols, 0, null);

    if (first && isSet) {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'F' || event.key === 'f') {
                toggleGameMode();
            }
        }, false);
        first = false;
    }
    const visibleBoard = isSet ? board : emptyBoard.board;


    const initialTileClick = (tile) => {

        stop = false;
        console.log(gameDifficulty);
        const newGame = new MinesweeperGame(gameDifficulty.rows, gameDifficulty.cols, gameDifficulty.numBombs, tile.index);
        performInitialSetup(newGame);
        const timerInterval = setInterval(() => {
            updateTimer(new Date());
            if (stop) {
                clearInterval(timerInterval);
            }
        }, secondInMilli);

        setStartTime(new Date(), timerInterval);
    };

    const bombClick = () => {
        console.log('LOSS!');
    };

    const unopenedTileClick = (tile) => {
        game.clickTile(tile);
        updateBoard(game.board);
    };

    const flagClick = (tile) => {
        game.flagTile(tile);
        updateBoard(game.board);
    };

    const openNeighbors = (tile) => {
        game.openNeighbors(tile);
        updateBoard(game.board);
    };

    function isClicked(tile) {
        if (tile && tile.isOpened) {
            return true;
        }

        return false;
    }

    return <div>
        <GameWrapper>
            {
                visibleBoard.map((tile) => {
                    return <Tile
                        key={tile.index}
                        tile={tile}
                        gameMode={gameMode}
                        click={
                            (tile) => {
                                if (!isSet) {
                                    initialTileClick(tile);
                                    return;
                                }

                                if (isClicked(tile)) {
                                    openNeighbors(tile);
                                    return;
                                }

                                if (gameMode === 'flagging') {
                                    flagClick(tile);
                                    return;
                                }

                                if (tile.isFlagged) {
                                    return;
                                }
                                if (isBomb(tile)) {
                                    bombClick(tile);
                                    return;
                                }

                                unopenedTileClick(tile);
                            }
                        }
                    />;
                })
            }
        </GameWrapper>
    </div>;
};

const mapStateToProps = (state) => ({
    board: getBoard(state),
    isSet: getIsSet(state),
    game: getGame(state),
    rerender: plsRerender(state),
    gameMode: getGameMode(state),
    gameDifficulty: getGameDifficulty(state),
});

const mapDispatchToProps = (dispatch) => ({
    performInitialSetup: (newGame) => dispatch(initializeBoard(newGame)),
    updateBoard: (tile) => dispatch(updateBoard(tile)),
    removeCachedBoard: () => dispatch(removeCachedBoard()),
    setStartTime: (startTime, interval) => dispatch(initializeTimer(startTime, interval)),
    updateTimer: (now) => dispatch(updateTimer(now)),
    toggleGameMode: () => dispatch(toggleGameMode()),
    localRemoveCachedBoard: () => dispatch(removeCachedBoard()),
    setDifficulty: (newDifficulty) => dispatch(setGameDifficulty(newDifficulty)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Game);