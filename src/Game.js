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

const rows = 10;
const cols = 10;
const numBombs = 10;
let stop = false;

let emptyBoard = new MinesweeperGame(rows, cols, 0, null);

const GameWrapper = styled.div`
    display: inline-grid;
    grid-template-columns: repeat(10,1fr);
`;

const ModeWrapper = styled.div`

`;

const Game = ({ performInitialSetup, clickTile, removeCachedBoard, board, game, isSet, rerender, setStartTime, updateTimer, gameMode,toggleGameMode }) => {

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
        clickTile(game.board);
    };


    var clickFunction = initialTileClick;

    return <div>
        <Timer />
        <ModeWrapper >
            <FontAwesomeIcon
                size="10x"
                icon={gameMode === "flag" ? faFlag : faMousePointer}
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
    </div>


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
    clickTile: (tile) => dispatch(updateBoard(tile)),
    removeCachedBoard: () => dispatch(removeCachedBoard()),
    setStartTime: (startTime, interval) => dispatch(initializeTimer(startTime, interval)),
    updateTimer: (now) => dispatch(updateTimer(now)),
    toggleGameMode: () => dispatch(toggleGameMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);  