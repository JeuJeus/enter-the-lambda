import {initializeControls, setOnAnyKeyDown, setOnSpaceDown} from "./controls.js";
import {GAME_STATES, getGameState, resetGameScore, setGameState} from "../../state.js";
import {handleTerminalInput} from "../terminal.js";

export const configureControls = () => {
    initializeControls();

    setOnAnyKeyDown((e) => {
        if (getGameState() === GAME_STATES.TERMINAL) handleTerminalInput(e);
    });

    setOnSpaceDown(() => {
        if (getGameState() === GAME_STATES.START_SCREEN) {
            setGameState(GAME_STATES.PLAYING);
            resetGameScore();
        } else if (getGameState() === GAME_STATES.GAME_OVER) {
            setGameState(GAME_STATES.START_SCREEN);
            resetGameScore();
        }
    });
};