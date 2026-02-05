import {HALF_SECOND_IN_MILLISECONDS} from "../../utils/ticks.js";

const characterShouldBeVisible = (timestamp, interval) => Math.floor((timestamp % (interval * 2)) / interval) === 0;

export const makeCollidedPlayerSymbolBlink = (timestamp, unicode) => {
    if (characterShouldBeVisible(timestamp, HALF_SECOND_IN_MILLISECONDS)) return unicode.PLAYER_DEAD;
    return unicode.AIR;
};

export const getBlinkingCursor = timestamp => Math.floor(timestamp / 500) % 2 === 0 ? '█' : ' ';