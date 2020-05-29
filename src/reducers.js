import {
    INITIALIZE_BOARD,
    REMOVE_CACHED_BOARD,
    UPDATE_BOARD,
    INITILIZE_TIMER,
    UPDATE_TIMER
} from './actions';

const initialState = { game: { board: [], isSet: false } };

export const data = (state = initialState, action) => {
    const { type, payload } = action;
    // console.log(type);
    // console.log(payload);

    switch (type) {
        case INITIALIZE_BOARD: {
            const { game } = payload;
            state.game = payload.game;
            state.board = payload.game.board;

            // console.log(payload.game)
            // console.log(game)

            // console.log(state);

            state.isSet = true;
            state.update = 0;
            state.shouldRerender = 0;
            state.now = null;
            state.startTime = null;
            // clearInterval(state.timerInterval);
            state.timerInterval = null;


            return state;
        }

        case UPDATE_BOARD: {
            const { game } = payload;
            // console.log(state);
            // console.log(payload)

            // game.board.push([]);

            // state.game = game;
            // state.board = game.board;

            // state.update += 1;
            // console.log(state.shouldRerender);
            state.shouldRerender = state.shouldRerender + 1;
            // console.log(game.game.board);
            // state.game = game;
            // state = 

            return {
                startTime: state.startTime,
                now: state.now,
                board: game,
                game: state.game,
                isSet: state.isSet,
                shouldRerender: state.shouldRerender ,
            }


        }

        case INITILIZE_TIMER: {
            const { startTime, timerInterval } = payload;
            // console.log(payload);

            state.now = startTime;
            state.startTime = startTime;
            state.timerInterval = timerInterval;

            // clearInterval(timerInterval);


            return {
                ...state,
            }
        }

        case UPDATE_TIMER: {
            const { now } = payload;
            state.now = now;
            // console.log(state);

            return {
                ...state,
            };
        }

        case REMOVE_CACHED_BOARD: {
            // console.log(state);
            state.game.board = [];
            state.isSet = false;
            state.now = null;
            state.startTime = null;
            // clearInterval(state.timerInterval);
            state.timerInterval = null;

            return {
                ...state,
            };
        }
        default: {
            // console.log("DeFAULT");
            return state;
        }
    }
}