/* eslint-disable func-style */
/* eslint-disable no-magic-numbers */
/* eslint-disable complexity */
import React from 'react';
import styled from 'styled-components';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TileImage from './TileImageFactory';

const TileWrapper = styled.div`
    position:relative;
    width: 50px;
    height: 50px;
`;

const Tile = ({ tile, gameMode, click }) => {
    return <TileWrapper
        onClick={() => {
            click(tile);
        }}>

        <TileImage style={{ position: 'absolute' }} tile={tile} />
        <FontAwesomeIcon size='2x' style={{
            display: `${gameMode === 'flagging' && !tile.isOpened && !tile.isFlagged ? '' : 'none'}`,
            zIndex: '20',
            position: 'absolute',
            left: '10',
            top: '10',
            opacity: '.6'
        }} icon={faFlag} />
    </TileWrapper>;
};

export default Tile;