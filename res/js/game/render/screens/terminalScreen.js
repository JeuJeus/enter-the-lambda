import {getTerminalInput, getTerminalLines} from "../../io/terminal.js";
import {createBlankField} from "../../component/field/field.js";
import {getBlinkingCursor} from "../helper/blink.js";


const leftAlignAndPadTruncate = (content, config) => content.padEnd(config.DIMENSIONS.WIDTH, ' ').slice(0, config.DIMENSIONS.WIDTH);

const moreLinesThanVisible = (allLines, maxLines) => allLines.length > maxLines;

export const renderTerminalScreenContent = (config, timestamp) => {
    const history = getTerminalLines();
    const input = getTerminalInput();
    const cursor = getBlinkingCursor(timestamp);
    const currentLine = `$ ${input}${cursor}`;

    const allLines = [...history, currentLine];
    const maxLines = config.DIMENSIONS.HEIGHT;

    const visibleLines = moreLinesThanVisible(allLines, maxLines)
        ? allLines.slice(allLines.length - maxLines)
        : allLines;

    const blankField = createBlankField(config);

    return blankField.map((line, index) => {
        if (index >= visibleLines.length) return line;

        const content = visibleLines[index];
        return leftAlignAndPadTruncate(content, config);
    });
};
