/* eslint-disable complexity */
import {
    INITIALIZE_BOARD,
    REMOVE_CACHED_BOARD,
    UPDATE_BOARD,
    INITILIZE_TIMER,
    UPDATE_TIMER,
    TOGGLE_GAME_MODE,
    SET_GAME_DIFFICULTY
} from './actions';

import { EasyDifficulty } from './StatusBar';

const initialState = { difficulty: EasyDifficulty, game: { board: [], isSet: false } };

export const data = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case INITIALIZE_BOARD: {
            const { game } = payload;
            const board = game.board;

            console.log(game);

            return {
                ...state,
                game: game,
                board: board,
                isSet: true,
                update: 0,
                shouldRerender: 0,
                now: null,
                startTime: null,
                gameMode: 'clicking',
                timerInterval: null,
            };
        }

        case UPDATE_BOARD: {
            const { game } = payload;

            return {
                ...state,
                shouldRerender: state.shouldRerender + 1,
                board: game,
            };
        }

        case INITILIZE_TIMER: {
            const { startTime, timerInterval } = payload;

            return {
                ...state,
                now: startTime,
                startTime: startTime,
                timerInterval: timerInterval,
            };
        }

        case UPDATE_TIMER: {
            const { now } = payload;

            return {
                ...state,
                now: now,
            };
        }

        case REMOVE_CACHED_BOARD: {

            return {
                ...state,
                timerInterval: null,
                now: null,
                isSet: false,
                startTime: null,
                game: {
                    board: []
                },
                difficulty: EasyDifficulty,
            };
        }
        case TOGGLE_GAME_MODE: {
            const newMode = state.gameMode === 'clicking' ? 'flagging' : 'clicking';

            return {
                ...state,
                gameMode: newMode,
            };
        }
        case SET_GAME_DIFFICULTY: {
            const { difficulty } = payload;
            console.log(difficulty);
            return {
                ...state,
                difficulty: difficulty,
            };
        }
        default: {
            return state;
        }
    }
};