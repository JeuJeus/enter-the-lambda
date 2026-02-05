const TERMINAL_ID = 'terminal';
const CONTAINER_ID = 'game-container';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const outputTerminalLine = async (terminal, line, container) => {
    terminal.textContent += line + '\n';
    container.scrollTop = container.scrollHeight;
    await sleep(Math.random() * 200 + 50);
};

const clearTerminal = terminal => terminal.textContent = '';

export const runBootSequence = async (lines) => {
    const terminal = document.getElementById(TERMINAL_ID);
    const container = document.getElementById(CONTAINER_ID);

    if (!terminal || !container) return;
    clearTerminal(terminal);

    for (const line of lines) {
        await outputTerminalLine(terminal, line, container);
    }

    await sleep(1200);
    terminal.textContent = '';
};
