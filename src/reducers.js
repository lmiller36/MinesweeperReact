import {
    INITIAL_CLICK,
    REMOVE_CACHED_BOARD
} from './actions';

const initialState = { game: { board: [], isSet: false } };

export const data = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case INITIAL_CLICK: {
            console.log(payload)
            const { initialClick } = payload;
            console.log(state.game);
            state.game.board = payload.index;
            state.game.isSet = true;
            
            return {
                ...state,
            };
        }
        case REMOVE_CACHED_BOARD: {
    
            console.log("we doing it!")
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