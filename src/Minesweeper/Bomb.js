import React from 'react';
import styled from 'styled-components';

const BombTile = styled.div`
    content: url("https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Minesweeper_flag.svg/1200px-Minesweeper_flag.svg.png");
    width: 50px;
    height: 50px;
`;

const Bomb = () => (
    <BombTile />
);

export default Bomb;