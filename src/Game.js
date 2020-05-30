import React from 'react';
// import './Game.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMousePointer, faFlag } from '@fortawesome/free-solid-svg-icons'
import Tile from './Minesweeper/Tile';
import { connect } from 'react-redux';
import displayAlert from './thunks';
import styled from 'styled-components';
import Timer from './Timer';
import {
    getBoard,
    getIsSet,
    getGame,
    plsRerender,
    getGameMode,

} from './selectors';
import { initializeBoard, updateBoard, removeCachedBoard, initializeTimer, updateTimer, toggleGameMode } from './actions';

import MinesweeperGame, { genNonBombs } from './Minesweeper/Minesweeper';
import { isBomb } from './Minesweeper/Tile';

const rows = 30;
const cols = 16;
const numBombs = 99;
let stop = false;

let emptyBoard = new MinesweeperGame(rows, cols, 0, null);

const GameWrapper = styled.div`
    display: inline-grid;
    grid-template-columns: repeat(${cols},1fr);
`;

const ModeWrapper = styled.div`
    // border:2px solid black;
    // display:inline;
`;

function handleKeyPress(event) {
    console.log(event)
    if (event.key === 'Enter') {
        console.log('enter press here! ')
    }
}

let first = true;


const Game = ({ performInitialSetup, updateBoard, removeCachedBoard, board, game, isSet, rerender, setStartTime, updateTimer, gameMode, toggleGameMode }) => {

    if (first && isSet) {
        window.addEventListener("keydown", (event) => {
            if (event.key === "F" || event.key === "f") {
                toggleGameMode();
            }
        }, false);
        first = false;
    }
    var visibleBoard = isSet ? board : emptyBoard.board;


    const initialTileClick = (tile) => {
        stop = false;
        performInitialSetup(tile);
        var timerInterval;
        timerInterval = setInterval(() => {
            updateTimer(new Date());
            if (stop) clearInterval(timerInterval);
        }, 1000);

        setStartTime(new Date(), timerInterval);
    };

    const bombClick = (tile) => {
        alert("LOSS!");
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
    }

    function isClicked(tile) {
        if (tile && tile.isOpened)
            return true;

        return false;
    }

    var clickFunction = initialTileClick;

    console.log(gameMode);

    return <div>
        <Timer />
        <ModeWrapper >
            <FontAwesomeIcon
                size="2x"
                icon={gameMode === "flagging" ? faFlag : faMousePointer}
                onClick={
                    () => {
                        toggleGameMode();
                    }
                }
            />
            {/* return <FontAwesomeIcon icon={faFlag} /> :
                return             <FontAwesomeIcon icon={faMousePointer} /> */}


        </ModeWrapper>


        <button onClick={() => {
            removeCachedBoard();
            stop = true;
        }}>remove cachced</button>
        <GameWrapper>
            {
                visibleBoard.map((tile) => {
                    return <Tile tile={tile} click={
                        (tile) => {
                            if (!isSet) {
                                initialTileClick(tile);
                                return;
                            }

                            if (isClicked(tile)) {
                                openNeighbors(tile);
                                return;
                            }

                            if (gameMode === "flagging") {
                                flagClick(tile);
                                return;
                            }

                            if (tile.isFlagged) return;

                            if (isBomb(tile)) {
                                bombClick(tile);
                                return;
                            }

                            unopenedTileClick(tile);
                        }
                    } />
                })
            }
        </GameWrapper>
    </div >


};

const mapStateToProps = state => ({
    board: getBoard(state),
    isSet: getIsSet(state),
    game: getGame(state),
    rerender: plsRerender(state),
    gameMode: getGameMode(state),
});

const mapDispatchToProps = dispatch => ({
    performInitialSetup: (tile) => dispatch(initializeBoard(new MinesweeperGame(rows, cols, numBombs, tile.index))),
    updateBoard: (tile) => dispatch(updateBoard(tile)),
    removeCachedBoard: () => dispatch(removeCachedBoard()),
    setStartTime: (startTime, interval) => dispatch(initializeTimer(startTime, interval)),
    updateTimer: (now) => dispatch(updateTimer(now)),
    toggleGameMode: () => dispatch(toggleGameMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);  