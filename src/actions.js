export const INITIALIZE_BOARD = 'INITIALIZE_BOARD';
export const initializeBoard = (game) => ({
    type: INITIALIZE_BOARD,
    payload: { game },
});

export const UPDATE_BOARD = 'UPDATE_BOARD';
export const updateBoard = (game) => ({
    type: UPDATE_BOARD,
    payload: { game },
});


export const REMOVE_CACHED_BOARD = 'REMOVE_CACHED_BOARD';
export const removeCachedBoard = () => ({
    type: REMOVE_CACHED_BOARD,
    payload: { },
});

export const INITILIZE_TIMER = 'INITILIZE_TIMER';
export const initializeTimer = (startTime) => ({
    type: INITILIZE_TIMER,
    payload: {startTime},
});

export const UPDATE_TIMER = 'UPDATE_TIMER';
export const updateTimer = (now) => ({
    type: UPDATE_TIMER,
    payload: {now},
});




// export const INITIAL_CLICK = 'INITIAL_CLICK';
// export const initialClick = (index) => ({
//     type: INITIAL_CLICK,
//     payload: { index },
// });