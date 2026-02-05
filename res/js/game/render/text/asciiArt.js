const lineIsNotRelevantForAsciiArt = (lineIndex, asciiArt) => !(lineIndex >= 0 && lineIndex < asciiArt.length);

export const renderAsciiArt = (asciiArt, lines, centerY, startOffset) => {
    return lines.map((line, y) => {
        const lineIndex = y - (centerY + startOffset);

        if (lineIsNotRelevantForAsciiArt(lineIndex, asciiArt)) return line;

        const artLine = asciiArt[lineIndex];
        const startX = Math.max(0, Math.floor((line.length - artLine.length) / 2));
        return line.slice(0, startX) + artLine + line.slice(startX + artLine.length);
    });
};