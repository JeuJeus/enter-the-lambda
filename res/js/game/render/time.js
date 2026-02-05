let lastTimestamp = 0;

export const isRenderIntervalExceeded = (timestamp, interval) => timestamp - lastTimestamp > interval;

export const setLastTimestamp = (timestamp) => lastTimestamp = timestamp