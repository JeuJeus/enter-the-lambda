import {compositeBackgroundWithForeground} from "./layers/composition.js";
import {getBlinkingText} from "./text/text.js";
import {getLogicalY} from "../component/field/physics.js";
import {getCellCharacter} from "./characters.js";

const createScreenOverlays = (overlayConfig) => {
    const overlays = {};
    overlayConfig.forEach(({offset, text}) => {
        overlays[offset] = text;
    });
    return overlays;
};

const insertContentIntoLine = (line, text) => {
    const startX = Math.floor((line.length - text.length) / 2);
    return line.slice(0, startX) + text + line.slice(startX + text.length);
};

const currentLineMatchesCenterOffsetPosition = (y, centerY, offset) => y === centerY + parseInt(offset, 10);

const getTextIncludingBlinking = (overlayData, timestamp, airCharacter) => overlayData.shouldBlink ? getBlinkingText(overlayData.text, timestamp, airCharacter) : overlayData.text;

const renderLine = (overlayData, timestamp, y, centerY, offset, currentLine, airCharacter) => {
    if (!currentLineMatchesCenterOffsetPosition(y, centerY, offset)) return currentLine;

    const textIncludingBlinking = getTextIncludingBlinking(overlayData, timestamp, airCharacter);
    return insertContentIntoLine(currentLine, textIncludingBlinking);
};

const renderWithOverlays = (overlays, centerY, timestamp, airCharacter) => (line, y) =>
    Object
        .entries(overlays)
        .reduce((currentLine, [offset, overlayData]) =>
                renderLine(overlayData, timestamp, y, centerY, offset, currentLine, airCharacter)
            , line);

export const renderScreenWithOverlays = (baseLines, score, dimensions, config, overlayConfig, timestamp) => {
    const composited = compositeBackgroundWithForeground(baseLines, score, dimensions, config);
    const centerY = Math.floor(dimensions.HEIGHT / 2);
    const overlays = createScreenOverlays(overlayConfig);
    return composited.map(renderWithOverlays(overlays, centerY, timestamp, config.STYLE.UNICODE.AIR));
};

export const renderField = (field, unicode, timestamp) => {
    const {WIDTH, HEIGHT} = field.dimensions;
    const worldOffset = field.worldOffset || 0;
    return Array.from({length: HEIGHT}, (_, y) => {
        return Array.from({length: WIDTH}, (_, x) =>
            getCellCharacter(x, getLogicalY(HEIGHT, y), WIDTH, HEIGHT, field.player, field.objects, unicode, field.floor, worldOffset, timestamp)
        ).join('');
    });
};

