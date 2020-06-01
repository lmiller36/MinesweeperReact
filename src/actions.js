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

export const TOGGLE_GAME_MODE = 'TOGGLE_GAME_MODE';
export const toggleGameMode = (now) => ({
    type: TOGGLE_GAME_MODE,
    payload: {now},
});

export const SET_GAME_DIFFICULTY = 'SET_GAME_DIFFICULTY';
export const setGameDifficulty = (difficulty) => ({
    type: SET_GAME_DIFFICULTY,
    payload: {difficulty},
});