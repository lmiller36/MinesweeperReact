export const INITIAL_CLICK = 'INITIAL_CLICK';
export const initialClicky = (index) => ({
    type: INITIAL_CLICK,
    payload: { index },
});


export const REMOVE_CACHED_BOARD = 'REMOVE_CACHED_BOARD';
export const removeCachedBoard = () => ({
    type: REMOVE_CACHED_BOARD,
    payload: { },
});

// export const INITIAL_CLICK = 'INITIAL_CLICK';
// export const initialClick = (index) => ({
//     type: INITIAL_CLICK,
//     payload: { index },
// });