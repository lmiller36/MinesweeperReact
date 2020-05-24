// import { createSelector } from 'reselect';

export const getBoard = state => {
    // console.log();
    return state.data.game.board;
}

export const getIsSet = state => {
    // console.log();
    return state.data.game.isSet;
}



// export const getIncompleteTodos = createSelector(
//     getTodos,
//     (todos) => todos.filter(todo => !todo.isCompleted),
// );

// export const getCompletedTodos = createSelector(
//     getTodos,
//     (todos) => todos.filter(todo => todo.isCompleted),
// );
