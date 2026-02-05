import {getBackgroundLine} from "./background.js";
import {isForegroundObjectPresent} from "./foreground.js";

const getForegroundCharacter = (foregroundLine, i, config) => foregroundLine[i] || config.STYLE.UNICODE.AIR;

const getBackgroundCharacter = (backgroundLine, i, config) => backgroundLine[i] || config.STYLE.UNICODE.AIR;

const overlayForegroundAndBackground = (foregroundCharacter, config, backgroundCharacter) => {
    if (isForegroundObjectPresent(foregroundCharacter, config.STYLE.UNICODE.AIR)) return backgroundCharacter;
    return foregroundCharacter;
};

const compositeLines = (backgroundLine, foregroundLine, config) =>
    Array.from({length: Math.max(backgroundLine.length, foregroundLine.length)})
        .map((_, i) => {
            const foregroundCharacter = getForegroundCharacter(foregroundLine, i, config);
            const backgroundCharacter = getBackgroundCharacter(backgroundLine, i, config);
            return overlayForegroundAndBackground(foregroundCharacter, config, backgroundCharacter);
        })
        .join('');

export const compositeBackgroundWithForeground = (foregroundLines, score, dimensions, config) => {
    return foregroundLines.map((foregroundLine, y) => {
        const backgroundLine = getBackgroundLine(y, score, dimensions.WIDTH, config);
        return compositeLines(backgroundLine, foregroundLine, config);
    });
};
