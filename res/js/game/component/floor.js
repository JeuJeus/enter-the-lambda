import {getSecureRandomValue} from '../utils/random.js';

export const getRandomFloorStep = (floorConfig) => {
    const randomValue = getSecureRandomValue();
    if (randomValue < floorConfig.STEP_DOWN_PROBABILITY) return -1;
    if (randomValue > 1 - floorConfig.STEP_UP_PROBABILITY) return 1;
    return 0;
};

export const clampFloorLevelRange = (v, min, max) => Math.max(min, Math.min(max, v));

export const upperThirdLimit = (height, floorConfig) => Math.floor(floorConfig.UPPER_THIRD_FRACTION * height);

export const computeMaximumFloorLevel = (height, floorConfig) => Math.max(1, Math.min(height - floorConfig.TOP_MARGIN, upperThirdLimit(height, floorConfig) - 1));

export const lastNAllEqual = (floorHeights, n) => {
    const lastNFloorHeights = floorHeights.slice(-n);
    return lastNFloorHeights.length === n && lastNFloorHeights.every(floorHeight => floorHeight === lastNFloorHeights[0]);
};

const getEnforceMinimumRun = (floor, minimumRunOfSameHeight) => floor.length >= minimumRunOfSameHeight && !lastNAllEqual(floor, minimumRunOfSameHeight);

const getEnforceTwoWidthRun = floor => floor.length >= 2 && floor[floor.length - 1] !== floor[floor.length - 2];

const getCurrent = (enforceMinimumRun, enforceTwoWidthRun, floor, levelCandidate) => (enforceMinimumRun || enforceTwoWidthRun) ? floor[floor.length - 1] : levelCandidate;

const shouldCreateHole = (holesConfig) =>
    holesConfig
    && holesConfig.ALLOW_HOLES
    && getSecureRandomValue() < holesConfig.HOLE_PROBABILITY;

const getDistanceToNearestHole = (floor) =>
  floor
    .map((v, i) => (v === 0 ? floor.length - i : Infinity))
    .reduce((nearest, d) => Math.min(nearest, d), Infinity);

const isHoleSafeDistance = (floor, safeDistance) => getDistanceToNearestHole(floor) > safeDistance;

const hasMinimumRunBeforeHole = (floor, minimumRunLength) => floor.length > 0 && lastNAllEqual(floor, Math.min(minimumRunLength, floor.length));

export const getNewFloorLevelRespectingConstraints = (accumulator, floorConfig, bottomMargin, maximumFloorLevel, minimumRunOfSameHeight, holesConfig) => {
    const currentLevel = accumulator.current;
    const floor = accumulator.floor.concat(currentLevel);

    if (shouldCreateHole(holesConfig) && isHoleSafeDistance(floor, holesConfig.OBJECT_TO_HOLE_SAFETY_DISTANCE) && hasMinimumRunBeforeHole(floor, minimumRunOfSameHeight)) {
        return {floor, current: 0};
    }

    const levelCandidate = clampFloorLevelRange(currentLevel + getRandomFloorStep(floorConfig), bottomMargin, maximumFloorLevel);

    const enforceMinimumRun = getEnforceMinimumRun(floor, minimumRunOfSameHeight);
    const enforceTwoWidthRun = getEnforceTwoWidthRun(floor);

    const current = getCurrent(enforceMinimumRun, enforceTwoWidthRun, floor, levelCandidate);
    return {floor, current};
};

const calculateLevelStartingPoint = (floorConfig, maximumFloorLevel) => Math.floor(floorConfig.BOTTOM_MARGIN + (maximumFloorLevel - floorConfig.BOTTOM_MARGIN) * floorConfig.START_FRACTION);

export const generateInitialFloor = (width, height, floorConfig, holesConfig) => {
    const maximumFloorLevel = computeMaximumFloorLevel(height, floorConfig);
    const startLevel = calculateLevelStartingPoint(floorConfig, maximumFloorLevel);
    const result = Array
        .from({length: width})
        .reduce((accumulator) => getNewFloorLevelRespectingConstraints(accumulator, floorConfig, floorConfig.BOTTOM_MARGIN, maximumFloorLevel, floorConfig.MIN_RUN_LENGTH, holesConfig), {
            floor: [],
            current: startLevel
        });

    return result.floor;
};

export const countConsecutiveHeightAtEnd = (floor, height) => {
    const indexResult = floor
        .slice()
        .reverse()
        .findIndex(v => v !== height);
    return indexResult === -1 ? floor.length : indexResult;
};


const getLastFloorLevel = (oldFloor, fallback) => {
    if (oldFloor && oldFloor.length) return oldFloor[oldFloor.length - 1];
    return fallback;
};

const consecutiveCountIsBelowMinimumRun = (consecutiveCount, floorConfig) => consecutiveCount < floorConfig.MIN_RUN_LENGTH;

const getNextFloorLevel = (consecutiveCount, floorConfig, lastFloorLevel, maximumFloorLevel) => {
    if (consecutiveCountIsBelowMinimumRun(consecutiveCount, floorConfig)) return lastFloorLevel;
    return clampFloorLevelRange(lastFloorLevel + getRandomFloorStep(floorConfig), floorConfig.BOTTOM_MARGIN, maximumFloorLevel);
};

export const advanceFloor = (oldFloor, height, floorConfig, holesConfig) => {
    const maximumFloorLevel = computeMaximumFloorLevel(height, floorConfig);
    const fallback = calculateLevelStartingPoint(floorConfig, maximumFloorLevel);

    const lastFloorLevel = getLastFloorLevel(oldFloor, fallback);
    const consecutiveCount = countConsecutiveHeightAtEnd(oldFloor, lastFloorLevel);

    const newFloorWithoutLastElement = oldFloor.slice(1);
    const nextLevel = getNextFloorLevel(consecutiveCount, floorConfig, lastFloorLevel, maximumFloorLevel);

    const safeDistance = holesConfig?.OBJECT_TO_HOLE_SAFETY_DISTANCE || 0;
    if (shouldCreateHole(holesConfig) && newFloorWithoutLastElement.length > 0 && isHoleSafeDistance(newFloorWithoutLastElement, safeDistance)) {
        return newFloorWithoutLastElement.concat([0]);
    }

    return newFloorWithoutLastElement.concat([nextLevel]);
};

export const getFloorAtX = (floor, x) => (floor && typeof floor[x] !== 'undefined') ? floor[x] : 1;
