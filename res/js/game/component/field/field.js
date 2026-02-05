import {generateInitialFloor, getFloorAtX} from '../floor.js';
import {getInitialPlayer} from '../player/player.js';
import {getHighScore, getNextScore} from '../../utils/score.js';
import {detectCollision, handleObjectSpawning, moveObjectsForNextFrame} from "../object.js";
import {calculatePlayerPhysics} from "../player/physics.js";

export const createBlankField = (config) =>
    Array.from({length: config.DIMENSIONS.HEIGHT}, () =>
        Array.from({length: config.DIMENSIONS.WIDTH}, () =>
            config.STYLE.UNICODE.AIR).join('')
    );

const generateInitialField = (config, floor, initialPlayerHeight) => ({
    dimensions: config.DIMENSIONS,
    floor,
    worldOffset: 0,
    player: getInitialPlayer(initialPlayerHeight),
    objects: [],
    score: 0,
    highScore: getHighScore(config.STORAGE_KEY)
});

export const getInitialField = (config) => {
    const floor = generateInitialFloor(config.DIMENSIONS.WIDTH, config.DIMENSIONS.HEIGHT, config.SETTINGS.FLOOR, config.SETTINGS.HOLES);
    const initialPlayerHeight = getFloorAtX(floor, 2);
    return generateInitialField(config, floor, initialPlayerHeight);
};

const hitObjectOrFellThroughHole = (movedObjects, updatedPlayer, config) => detectCollision(movedObjects, updatedPlayer.position.x, updatedPlayer.position.y) || isFallenThroughHole(updatedPlayer, config);

const getUpdatedField = (field, newFloor, newWorldOffset, updatedPlayer, movedObjects, spawned, config) => ({
    ...field,
    floor: newFloor,
    worldOffset: newWorldOffset,
    score: getNextScore(field),
    player: {
        ...updatedPlayer,
        collided: hitObjectOrFellThroughHole(movedObjects, updatedPlayer, config)
    },
    objects: [
        ...movedObjects,
        ...spawned
    ]
});

const isFallenThroughHole = (player, config) => player.position.y === config.SETTINGS.FLOOR.HEIGHT_ABOVE_GAME_BORDER;

export const generateNextField = (field, isHoldingJump, config) => {
    if (!field || field.player.collided) return field;

    const {WIDTH, HEIGHT} = config.DIMENSIONS;

    const {newFloor, movedObjects, newWorldOffset} = moveObjectsForNextFrame(field, config.SETTINGS.FLOOR, config.SETTINGS.HOLES);

    const playerSurfaceY = getFloorAtX(newFloor, field.player.position.x) + config.SETTINGS.FLOOR.SURFACE_OFFSET;
    const updatedPlayer = calculatePlayerPhysics(field.player, isHoldingJump, HEIGHT, config.SETTINGS.PHYSICS, playerSurfaceY);

    const spawned = handleObjectSpawning(WIDTH, config.SETTINGS.OBJECTS.OBJECT_SPAWN_PROBABILITY, config.STYLE.UNICODE.BOXES, newFloor, movedObjects, config.SETTINGS);

    return getUpdatedField(field, newFloor, newWorldOffset, updatedPlayer, movedObjects, spawned, config);
};


