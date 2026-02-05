import {GAME_STATES, resetGameScore, setGameState} from "../state.js";

let inputBuffer = "";
let history = [];
let initialMessages = [];

export const initializeTerminal = (initialHistory) => {
    initialMessages = [...initialHistory];
    history = [...initialHistory];
};

export const getTerminalLines = () => history;
export const getTerminalInput = () => inputBuffer;

const COMMANDS = {
    "lambda": () => {
        setGameState(GAME_STATES.START_SCREEN);
        resetGameScore();
        history.push(`$ ${inputBuffer}`);
        history.push("Initializing...");
        inputBuffer = "";
    },
    "help": () => {
        history.push(...initialMessages);
        inputBuffer = "";
    },
    "clear": () => {
        history = [];
        inputBuffer = "";
    }
};

const executeCommand = (command) => {
    history.push(`$ ${command}`);

    if (command.trim() === "") return;

    if (COMMANDS[command]) {
        COMMANDS[command]();
        return;
    }

    history.push(`Unrecognized binary: ${command}`);
};

export const handleTerminalInput = (e) => {
    if (e.key === "Enter") {
        executeCommand(inputBuffer);
        inputBuffer = "";
    } else if (e.key === "Backspace") {
        inputBuffer = inputBuffer.slice(0, -1);
    } else if (e.key.length === 1) {
        inputBuffer += e.key;

        if (e.key === " ") {
            e.preventDefault();
        }
    }

    if (e.key === "Backspace") {
        e.preventDefault();
    }
};
