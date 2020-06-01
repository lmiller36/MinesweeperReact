/* eslint-disable no-undef */
import React from 'react';
import { hot } from 'react-hot-loader';
import GameDisplay from './GameDisplay';

import './App.css';

const App = () => (
    <div className="App-Wrapper">
        <div className="App">
            <GameDisplay />
        </div>
    </div>
);

export default hot(module)(App);