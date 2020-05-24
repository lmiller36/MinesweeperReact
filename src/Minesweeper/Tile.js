import React from 'react';
import './Tile.css';

export const safe = {
    "type": "safe"
}

export const bombTile = {
    "type": "bomb"
};


export const safeTile = {
    "type": "safe"
};

//     safeTile.index = index;

//     return safeTile
// }

export function isBomb(tile) {
    return tile.type === "bomb";
}

const Tile = ({ tile, performInitialSetup }) => {
    // console.log(tile);
    // console.log(performInitialSetup);
    return <div className="unopened" onClick={() => { console.log(tile.index); performInitialSetup(tile.index) }}>
    </div>
};


export default Tile;