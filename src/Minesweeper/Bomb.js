import React from 'react';
import styled from 'styled-components';

const unopened = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Minesweeper_unopened_square.svg/1024px-Minesweeper_unopened_square.svg.png";
const bomb = "https://apprecs.org/ios/images/app-icons/256/e7/451931111.jpg";

const BombTile = styled.div`
    content: url(${bomb});
    width: 50px;
    height: 50px;
    `;

const Unopened = styled.div`
    content: url(${unopened});
    width: 50px;
    height: 50px;
    `;

const BombWrapper = styled.div`
    background-color:coral;
`;

// return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Minesweeper_unopened_square.svg/1024px-Minesweeper_unopened_square.svg.png";

const Bomb = (tile) => {
    return tile.isOpened ?  <BombTile /> : <Unopened onClick={() => {
        // click(tile);
        alert("rip")
    }}/>;
};

export default Bomb;