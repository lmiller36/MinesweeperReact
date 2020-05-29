import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setStartTime } from './actions';
import {
    getStartTime,
    getCurrentTime,
} from './selectors';

const TimerWrapper = styled.div`

`;

const Timer = (startTime) => {
    // console.log(startTime);
    const actualStartTime = startTime.startTime;
    const now = startTime.now;


    const timeElapsed = now - actualStartTime;

    let seconds = 0;

    if (!isNaN(seconds))
        seconds = Math.round(timeElapsed / 1000);

    return <TimerWrapper>{seconds}</TimerWrapper>;
};

const mapStateToProps = (state) => ({
    startTime: getStartTime(state),
    now: getCurrentTime(state),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);  