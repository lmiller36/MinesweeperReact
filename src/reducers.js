import {
    INITIALIZE_BOARD,
    REMOVE_CACHED_BOARD,
    UPDATE_BOARD,
    INITILIZE_TIMER,
    UPDATE_TIMER,
    TOGGLE_GAME_MODE,
} from './actions';

const initialState = { game: { board: [], isSet: false } };

export const data = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case INITIALIZE_BOARD: {
            const { game } = payload;
            const board = game.board;

            return {
                ...state,
                game: game,
                board: board,
                isSet: true,
                update: 0,
                shouldRerender: 0,
                now: null,
                startTime: null,
                gameMode: "clicking",
                timerInterval: null,
            };
        }

        case UPDATE_BOARD: {
            const { game } = payload;
          
            return {
                ...state,
                shouldRerender: state.shouldRerender + 1,
                board: game,
            }
        }

        case INITILIZE_TIMER: {
            const { startTime, timerInterval } = payload;

            return {
                ...state,
                now: startTime,
                startTime: startTime,
                timerInterval: timerInterval,
            }
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
                }
            };
        }
        case TOGGLE_GAME_MODE: {
            const newMode = state.gameMode === "clicking" ? "flagging" : "clicking";

            console.log("toggle")
            return {
                ...state,
                gameMode: newMode,
            }
        }
        default: {
            return state;
        }
    }
}