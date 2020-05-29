import React from 'react';
import styled from 'styled-components';


export const safe = {
    "type": "safe"
}

export const bombTile = {
    "type": "bomb"
};


export const safeTile = {
    "type": "safe"
};

export function isBomb(tile) {
    return tile.type === "bomb";
}

const UnopenedTile = styled.div`
    content: url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Minesweeper_unopened_square.svg/1024px-Minesweeper_unopened_square.svg.png");
    width: 50px;
    height: 50px;
`;

const FlaggedTile = styled.div`
    content: url(${props => (getUrl("flagged"))});
    width: 50px;
    height: 50px;
`;

const OpenedTile = styled.div`
    content: url(${props => (getUrl(props.neighbors))});
    width: 50px;
    height: 50px;
`;

//"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Minesweeper_2.svg/2000px-Minesweeper_2.svg.png"
function getUrl(neighbors) {
    switch (neighbors) {
        case 0:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Minesweeper_0.svg/2000px-Minesweeper_0.svg.png";
        case 1:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Minesweeper_1.svg/2000px-Minesweeper_1.svg.png";
        case 2:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Minesweeper_2.svg/2000px-Minesweeper_2.svg.png";
        case 3:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Minesweeper_3.svg/2000px-Minesweeper_3.svg.png";
        case 4:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Minesweeper_4.svg/2000px-Minesweeper_4.svg.png";
        case 5:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Minesweeper_5.svg/2000px-Minesweeper_5.svg.png";
        case 6:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Minesweeper_6.svg/2000px-Minesweeper_6.svg.png";
        case 7:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Minesweeper_7.svg/2000px-Minesweeper_7.svg.png";
        case 8:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Minesweeper_8.svg/2000px-Minesweeper_8.svg.png";
        case "bomb":
            return "https://apprecs.org/ios/images/app-icons/256/e7/451931111.jpg";
        case "flagged":
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Minesweeper_flag.svg/2000px-Minesweeper_flag.svg.png";
        default:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Minesweeper_unopened_square.svg/1024px-Minesweeper_unopened_square.svg.png";
    }
}

const Tile = ({ tile, click }) => {
    return tile.isOpened ? <OpenedTile
        neighbors={tile.numBombs}
        onClick={() => {
            click(tile);
        }}
    >
    </OpenedTile>
        :
        tile.isFlagged ? <FlaggedTile onClick={
            () => {
                click(tile);
            }
        } /> :
            <UnopenedTile onClick={() => {
                click(tile);
                // alert("rip")
            }}></UnopenedTile>;
};

export default Tile;