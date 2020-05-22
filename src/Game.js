import React from 'react';
import './Game.css';
import Tile from './Tile';

const Tiles = [];
const rows = 10;
const cols = 10;
for (var i = 0; i < rows * cols; i++) {
    Tiles.push({"key":i});
}

// const Game = (
//     <div>

//     </div>
// );

const Game = () => (
    <div className="gameWrapper">
        {Tiles.map(todo => <Tile
         />)}
    </div>
);

export default Game;