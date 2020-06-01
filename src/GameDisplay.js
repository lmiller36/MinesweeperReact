/* eslint-disable react/prop-types */
/* eslint-disable complexity */
import React from 'react';
import { connect } from 'react-redux';
import { removeCachedBoard, toggleGameMode, setGameDifficulty } from './actions';
import './Game.css';
import StatusBar from './StatusBar';


import Game from './Game';

const GameDisplay = ({
    localRemoveCachedBoard, setDifficulty, toggleGameMode,
}) => {

    return <div>
        <StatusBar toggleGameMode={toggleGameMode} localRemoveCachedBoard={localRemoveCachedBoard} setGameDifficulty={setDifficulty} />
        <Game />
    </div>;
};

const mapDispatchToProps = (dispatch) => ({
    toggleGameMode: () => dispatch(toggleGameMode()),
    localRemoveCachedBoard: () => dispatch(removeCachedBoard()),
    setDifficulty: (newDifficulty) => dispatch(setGameDifficulty(newDifficulty)),
});

export default connect(null, mapDispatchToProps)(GameDisplay);