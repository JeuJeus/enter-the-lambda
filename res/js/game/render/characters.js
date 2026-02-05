import {findObjectAtPosition} from "../component/object.js";
import {getFloorAtX} from "../component/floor.js";
import {makeCollidedPlayerSymbolBlink} from "./helper/blink.js";

const isCorner = (x, width, y, height) => (x === 0 || x === width - 1) && (y === 0 || y === height - 1);
const isYBorder = (y, height) => y === 0 || y === height - 1;
const isXBorder = (x, width) => x === 0 || x === width - 1;
const isPlayer = (x, player, y) => x === player.position.x && y === player.position.y;

const multipleFloorPatternsAvailable = unicode => Array.isArray(unicode.FLOOR_PATTERN) && unicode.FLOOR_PATTERN.length;

const getFloorPatternArray = unicode => {
    if (multipleFloorPatternsAvailable(unicode)) return unicode.FLOOR_PATTERN;
    return [unicode.FLOOR];
};

const multipleUndergroundFloorPatternsAvailable = unicode => Array.isArray(unicode.UNDERGROUND_FLOOR_PATTERN) && unicode.UNDERGROUND_FLOOR_PATTERN.length;

const getUndergroundFloorPatternArray = unicode => {
    if (multipleUndergroundFloorPatternsAvailable(unicode)) return unicode.UNDERGROUND_FLOOR_PATTERN;
    return getFloorPatternArray(unicode);
};

const getWorldXCoordinate = (worldOffset, x) => (typeof worldOffset === 'number' ? worldOffset : 0) + x;

const isTopFloor = (y, floor, x) => y === getFloorAtX(floor, x);

const isUndergroundFloor = (y, floor, x) => y < getFloorAtX(floor, x);

const generateFloor = (x, unicode, worldOffset) => {
    const pattern = getFloorPatternArray(unicode);
    const worldX = getWorldXCoordinate(worldOffset, x);
    const currentXCoordinate = Math.abs(worldX) % pattern.length;
    return pattern[currentXCoordinate];
};

const generateUndergroundFloor = (x, unicode, worldOffset) => {
    const pattern = getUndergroundFloorPatternArray(unicode);
    const worldX = getWorldXCoordinate(worldOffset, x);
    const currentXCoordinate = Math.abs(worldX) % pattern.length;
    return pattern[currentXCoordinate];
};

export const getCellCharacter = (x, y, width, height, player, objects, unicode, floor, worldOffset, timestamp) => {
    if (isCorner(x, width, y, height)) return unicode.EDGE;
    if (isYBorder(y, height)) return unicode.Y_BORDER;
    if (isXBorder(x, width)) return unicode.X_BORDER;
    if (isPlayer(x, player, y)) {
        if (player.collided) return makeCollidedPlayerSymbolBlink(timestamp, unicode);
        return unicode.PLAYER;
    }
    if (findObjectAtPosition(objects, x, y)) return findObjectAtPosition(objects, x, y).character;
    if (isTopFloor(y, floor, x)) return generateFloor(x, unicode, worldOffset);
    if (isUndergroundFloor(y, floor, x)) return generateUndergroundFloor(x, unicode, worldOffset);

    return unicode.AIR;
};