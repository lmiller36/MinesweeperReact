import React from 'react';
import { hot } from 'react-hot-loader';
import Game from './Game';

import './App.css';

const App = () => (
    <div className="App-Wrapper">
        <div className="App">
            <Game />
        </div>
    </div>
);

export default hot(module)(App);