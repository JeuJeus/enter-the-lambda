const renderHudLine = (scoreStr, highStr) => (line, y) => {
    if (y !== 0) return line;

    const leftPadded = scoreStr + line.slice(scoreStr.length);

    return leftPadded.slice(0, line.length - highStr.length) + highStr;
};

export const addHudToBaseView = (lines, score, highScore) => {
    const scoreStr = ` Score: ${score} `;
    const highStr = ` Highscore: ${highScore} `;

    return lines.map(renderHudLine(scoreStr, highStr));
};