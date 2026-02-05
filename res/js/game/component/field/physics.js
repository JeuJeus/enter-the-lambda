export const getConstrainedYValue = (height, nextY) => Math.max(1, Math.min(height - 2, nextY));

export const isYAtFloorOrCeiling = (constrainedY, height) => constrainedY === 1 || constrainedY === height - 2;

export const getLogicalY = (HEIGHT, y) => (HEIGHT - 1) - y;