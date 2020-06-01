/* eslint-disable complexity */
/* eslint-disable func-style */

import styled from 'styled-components';
import { BOMB_TILE, HINT_TILES, FLAG_TILE, UNOPENED_TILE } from './ImageUrls';

const BombImage = function () {
    this.url = BOMB_TILE;
};

const OpenedImage = function (numBombs) {
    this.url = HINT_TILES[numBombs];
};

const FlaggedImage = function () {
    this.url = FLAG_TILE;
};

const UnopenedImage = function () {
    this.url = UNOPENED_TILE;
};

function TileImageFactory() {
    this.createImage = function (tile) {
        let image;

        if (tile.isOpened && tile.type === 'bomb') {
            image = new BombImage();
        } else if (tile.isOpened) {
            image = new OpenedImage(tile.numBombs);
        } else if (tile.isFlagged) {
            image = new FlaggedImage();
        } else {
            image = new UnopenedImage();
        }

        return image.url;
    };
}

const timeImageFactory = new TileImageFactory();

const TileImage = styled.div`
content: url(${(props) => {
        return timeImageFactory.createImage(props.tile);
    }});
    width: 50px;
    height: 50px;
`;

export default TileImage;