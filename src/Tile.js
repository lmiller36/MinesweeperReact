import React from 'react';
import './Tile.css';

const Tile = ({ tile, performInitialSetup }) => {
    // console.log(tile);
    // console.log(performInitialSetup);
    return <div className="unopened" onClick={() => { console.log(tile.index); performInitialSetup(tile.index) }}>
    </div>
};


export default Tile;