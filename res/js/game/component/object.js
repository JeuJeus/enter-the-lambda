import {advanceFloor, getFloorAtX} from "./floor.js";
import {getSecureRandomValue} from "../utils/random.js";

const isAboveZero = newX => newX > 0;

const calculateObjectHeight = (newFloor, newX, floorConfig) => getFloorAtX(newFloor, newX) + floorConfig.SURFACE_OFFSET;

const getObjectHeightLevel = (newX, newFloor, floorConfig, object) => {
    if (!isAboveZero(newX)) return object.y;
    return calculateObjectHeight(newFloor, newX, floorConfig);
};

const newObject = (object, newX, newFloor, floorConfig) => ({
    ...object,
    x: newX,
    y: getObjectHeightLevel(newX, newFloor, floorConfig, object)
});

const getNewWorldOffset = field => (field.worldOffset || 0) + 1;

const getMovedObjects = (field, newFloor, floorConfig) => field.objects
    .map(object => {
        const newX = object.x - 1;
        return newObject(object, newX, newFloor, floorConfig);
    })
    .filter(object => object.x > 0);

export const moveObjectsForNextFrame = (field, floorConfig, holesConfig) => {
    const newFloor = advanceFloor(field.floor, field.dimensions.HEIGHT, floorConfig, holesConfig);
    const movedObjects = getMovedObjects(field, newFloor, floorConfig);
    const newWorldOffset = getNewWorldOffset(field);

    return {newFloor, movedObjects, newWorldOffset};
};

const isObjectAtPosition = (xPosition, yPosition) => object => object.x === xPosition && object.y === yPosition;

export const detectCollision = (movedObjects, xPosition, yPosition) =>
    movedObjects.some(isObjectAtPosition(xPosition, yPosition));

const shallObjectSpawn = (probability) => getSecureRandomValue() < probability;

const getRandomBox = (boxes) => boxes[Math.floor(getSecureRandomValue() * boxes.length)];

const getDistanceToNearestObject = (spawnX, existingObjects) => {
    if (existingObjects.length === 0) return Infinity;
    return Math.min(...existingObjects.map(obj => Math.abs(obj.x - spawnX)));
};

const isSpawnDistanceValid = (spawnX, existingObjects, minimumDistance) =>
    getDistanceToNearestObject(spawnX, existingObjects) >= minimumDistance;

const isHole = (floor, xPosition) => xPosition >= 0 && xPosition < floor.length && floor[xPosition] === 0;

const getDistanceToNearestHole = (spawnX, floor) =>
    floor
        .map((_, x) => (isHole(floor, x) ? Math.abs(x - spawnX) : Infinity))
        .reduce((nearest, d) => Math.min(nearest, d), Infinity);

const isSpawnSafeFromHoles = (spawnX, floor, safetyDistance) =>
    getDistanceToNearestHole(spawnX, floor) > safetyDistance;

const getNewObject = (spawnX, spawnY, boxes) => ({
    x: spawnX,
    y: spawnY,
    character: getRandomBox(boxes)
});

export const handleObjectSpawning = (width, probability, boxes, floor, existingObjects, settings) => {
    if (!shallObjectSpawn(probability)) return [];

    const spawnX = width - 2;
    const spawnY = getFloorAtX(floor, spawnX) + settings.FLOOR.SURFACE_OFFSET;

    const minimumObjectDistance = settings.OBJECTS.MINIMUM_OBJECT_DISTANCE;
    const holesSafetyDistance = settings.OBJECTS.OBJECT_TO_HOLE_SAFETY_DISTANCE;

    if (!isSpawnDistanceValid(spawnX, existingObjects, minimumObjectDistance)) return [];
    if (!isSpawnSafeFromHoles(spawnX, floor, holesSafetyDistance)) return [];

    return [getNewObject(spawnX, spawnY, boxes)];
};

export const findObjectAtPosition = (objects, x, y) => objects.find(obj => obj.x === x && obj.y === y);