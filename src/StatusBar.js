/* eslint-disable complexity */
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { faMousePointer, faFlag, faCog, faTimes, faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    getBoard,
    getGame,
    getGameMode,

} from './selectors';
import Timer from './Timer';

const ModeWrapper = styled.div`
`;

const RemainingBombs = styled.div`
`;

const StatusBarWrapper = styled.div`
    display:flex;
    margin:15px;
    justify-content: space-around;
`;

export const EasyDifficulty = {
    rows: 9,
    cols: 9,
    numBombs: 10,
};

export const MediumDifficulty = {
    rows: 16,
    cols: 16,
    numBombs: 40,
};

export const HardDifficulty = {
    rows: 30,
    cols: 16,
    numBombs: 99,
};

// const StatusBarWrapper = styled.div``;

const StatusBar = (
    props,
) => {

    console.log(props);

    return <StatusBarWrapper>
        <Timer />
        <RemainingBombs>{props.game.remaining}</RemainingBombs>

        <ModeWrapper >
            <FontAwesomeIcon
                size='2x'
                icon={props.gameMode === 'flagging' ? faFlag : faMousePointer}
                onClick={
                    () => {
                        props.toggleGameMode();
                    }
                }
            />
        </ModeWrapper>
        <div className='dropdown'>
            <FontAwesomeIcon
                onClick={() => {
                    const curr = document.getElementById('dropdown-menu').style.display;
                    document.getElementById('dropdown-menu').style.display = curr === 'block' ? 'none' : 'block';
                }}
                className='dropdown'
                icon={faCog}
                size='2x'
            />
            <div id='dropdown-menu' className='dropdown-content'>
                <FontAwesomeIcon
                    icon={faTimes}
                    style={{ position: 'absolute', right: '5' }}
                    onClick={() => {
                        document.getElementById('dropdown-menu').style.display = 'none';
                    }}
                />
                <div>
                    <p>Game Difficulty:</p>
                    <div>
                        <input type='radio' id='easy' name='gameDifficulty' value='easy' />
                        <label htmlFor='easy'>Easy (9 x 9, 10 mines) </label>
                    </div>
                    <div>
                        <input type='radio' id='medium' name='gameDifficulty' value='medium' />
                        <label htmlFor='medium'>Medium (16 x 16, 40 mines)</label>
                    </div>
                    <div>
                        <input type='radio' id='hard' name='gameDifficulty' value='hard' />
                        <label htmlFor='hard'>Hard (16 x 30, 99 mines)</label>
                    </div>
                </div>
            </div>
        </div>
        <FontAwesomeIcon size='2x' icon={faRedo} onClick={() => {
            console.log(props);
            props.localRemoveCachedBoard();

            const gameDifficultySelector = document.querySelectorAll('input[name=\'gameDifficulty\']');
            let selectedValue;
            for (const difficultyOption of gameDifficultySelector) {
                if (difficultyOption.checked) {
                    selectedValue = difficultyOption.value;
                    break;
                }
            }

            let gameDifficulty = EasyDifficulty;

            if (selectedValue === 'medium') {
                gameDifficulty = MediumDifficulty;
            } else if (selectedValue === 'hard') {
                gameDifficulty = HardDifficulty;
            }

            props.setGameDifficulty(gameDifficulty);

        }} />
    </StatusBarWrapper>;
};

const mapStateToProps = (state) => ({
    board: getBoard(state),
    // isSet: getIsSet(state),
    game: getGame(state),
    // rerender: plsRerender(state),
    gameMode: getGameMode(state),
});

export default connect(mapStateToProps)(StatusBar);