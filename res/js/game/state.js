import {renderGameOverScreenContent, renderPlayingScreenContent, renderStartScreenContent} from "./render/screens/gameScreens.js";
import {renderTerminalScreenContent} from "./render/screens/terminalScreen.js";

export const GAME_STATES = {
    TERMINAL: 'TERMINAL',
    START_SCREEN: 'START_SCREEN',
    PLAYING: 'PLAYING',
    GAME_OVER: 'GAME_OVER'
};

let gameState = GAME_STATES.TERMINAL;
let currentGameScore = 0;

export const getGameState = () => gameState;
export const setGameState = (newState) => gameState = newState;

export const getCurrentGameScore = () => currentGameScore;
export const incrementGameScore = () => currentGameScore += 1;
export const resetGameScore = () => currentGameScore = 0;

export const stateRenderMap = {
    [GAME_STATES.TERMINAL]: (field, config, timestamp) => renderTerminalScreenContent(config, timestamp),
    [GAME_STATES.START_SCREEN]: (field, config, timestamp, score) => renderStartScreenContent(config, score, field.highScore, timestamp),
    [GAME_STATES.PLAYING]: (field, config, timestamp) => renderPlayingScreenContent(field, config, timestamp),
    [GAME_STATES.GAME_OVER]: (field, config, timestamp) => renderGameOverScreenContent(field, config, timestamp)
};

export const isStartingAgain = field => getGameState() === GAME_STATES.START_SCREEN && field.player.collided;