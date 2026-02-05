import {HALF_SECOND_IN_MILLISECONDS} from "../../utils/ticks.js";

export const getBlinkingText = (text, timestamp, airCharacter) => {
    const isVisible = Math.floor((timestamp % (HALF_SECOND_IN_MILLISECONDS * 2)) / HALF_SECOND_IN_MILLISECONDS) === 0;
    if (!isVisible) return airCharacter.repeat(text.length);
    return text;
};