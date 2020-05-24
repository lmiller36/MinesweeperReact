import {
    INITIALIZE_BOARD,
    REMOVE_CACHED_BOARD
} from './actions';

const initialState = { game: { board: [], isSet: false } };

export const data = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case INITIALIZE_BOARD: {
            const { initialClick } = payload;
            state.game.board = payload.index;
            state.game.isSet = true;

            return {
                ...state,
            };
        }
        case REMOVE_CACHED_BOARD: {
            state.game.board = [];
            state.game.isSet = false

            return {
                ...state,
            };
        }
        default:
            return state;
    }
}