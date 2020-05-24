import {
    initialClick
} from './actions';

export const displayAlert = text => () => {
    alert(text);
};