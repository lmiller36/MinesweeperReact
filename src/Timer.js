import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
    getStartTime,
    getCurrentTime,
} from './selectors';

const TimerWrapper = styled.div``;

const Timer = (startTime) => {
    const actualStartTime = startTime.startTime;
    const now = startTime.now;
    const milliseconds = 1000;
    const timeElapsed = now - actualStartTime;

    let seconds = 0;

    if (!isNaN(seconds)) {
        seconds = Math.round(timeElapsed / milliseconds);
    }

    return <TimerWrapper>{seconds}</TimerWrapper>;
};

const mapStateToProps = (state) => ({
    startTime: getStartTime(state),
    now: getCurrentTime(state),
});

export default connect(mapStateToProps)(Timer);