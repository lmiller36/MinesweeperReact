import React from 'react';
// import './Game.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMousePointer, faFlag, faCog, faTimes, faRedo } from '@fortawesome/free-solid-svg-icons'
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
import './Game.css';

let rows = 9;
let cols = 9;
let numBombs = 10;
let stop = false;

let emptyBoard = null;



const ModeWrapper = styled.div`
    // border:2px solid black;
    // display:inline;
`;

const RemainingBombs = styled.div`
`;

const Header = styled.div`
    display:flex;
    margin:15px;
    justify-content: space-around;
`;

const Settings = styled.div`
`;

const SettingsDropDown = styled.div`
    // display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
`;

function handleKeyPress(event) {
    console.log(event)
    if (event.key === 'Enter') {
        console.log('enter press here! ')
    }
}

let first = true;


const Game = ({ performInitialSetup, updateBoard, removeCachedBoard, board, game, isSet, rerender, setStartTime, updateTimer, gameMode, toggleGameMode }) => {

    console.log(cols);

    const GameWrapper = styled.div`
        display: inline-grid;
        grid-template-columns: repeat(${cols},1fr);
    `;

    emptyBoard = new MinesweeperGame(rows, cols, 0, null);

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

    return <div>
        <Header>
            <Timer />
            <RemainingBombs>{game.remaining}</RemainingBombs>

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
            </ModeWrapper>
            <div className="dropdown">
                <FontAwesomeIcon
                    onClick={() => {
                        const curr = document.getElementById("dropdown-menu").style.display;
                        document.getElementById("dropdown-menu").style.display = curr == "block" ? "none" : "block";
                        // "block";
                    }}
                    className="dropdown"
                    icon={faCog}
                    size="2x"
                />
                {/* <button class="dropbtn">Dropdown</button> */}
                <div id="dropdown-menu" className="dropdown-content">
                    <FontAwesomeIcon icon={faTimes} style={{ position: "absolute", right: "5" }} onClick={() => { document.getElementById("dropdown-menu").style.display = "none"; }} />
                    <div>
                        <p>Game Difficulty:</p>
                        <div>
                            <input type="radio" id="easy" name="gameDifficulty" value="easy" onClick={() => {
                                rows = 9;
                                cols = 9;
                                numBombs = 10;
                            }} />
                            <label for="easy">Easy (9 x 9, 10 mines) </label>
                        </div>
                        <div>
                            <input type="radio" id="medium" name="gameDifficulty" value="medium" onClick={() => {
                                rows = 16;
                                cols = 16;
                                numBombs = 40;
                            }} />
                            <label for="medium">Medium (16 x 16, 40 mines)</label>
                        </div>
                        <div>
                            <input type="radio" id="hard" name="gameDifficulty" value="hard" onClick={() => {
                                rows = 30;
                                cols = 16;
                                numBombs = 99;
                            }} />
                            <label for="hard">Hard (16 x 30, 99 mines)</label>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Settings>
                <FontAwesomeIcon icon={faCog} size="2x" />
                <SettingsDropDown>
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </SettingsDropDown>
            </Settings> */}
            <FontAwesomeIcon size="2x" icon={faRedo} onClick={() => {
                removeCachedBoard();
                const rbs = document.querySelectorAll('input[name="gameDifficulty"]');
                let selectedValue;
                for (const rb of rbs) {
                    if (rb.checked) {
                        selectedValue = rb.value;
                        break;
                    }
                }

                switch (selectedValue) {
                    case "easy": {
                        rows = 9;
                        cols = 9;
                        numBombs = 10;
                        break;
                    }
                    case "medium": {
                        rows = 16;
                        cols = 16;
                        numBombs = 40;
                        break;
                    }
                    case "hard": {
                        rows = 30;
                        cols = 16;
                        numBombs = 99;
                        break;
                    }
                    default: {
                        break;
                    }
                }

                console.log(rows + " " + cols + " " + numBombs);

                // console.log(document.getElementsByTagName('input'))
                stop = true;
            }} />
        </Header>
        <GameWrapper>
            {
                visibleBoard.map((tile) => {
                    return <Tile tile={tile} gameMode={gameMode} click={
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