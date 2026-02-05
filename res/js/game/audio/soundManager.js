import {
    playBackgroundMusic,
    playCollisionSound,
    playGameOverSound,
    playGlideSound,
    playJumpSound,
    playStartSound
} from "./synth.js";
import {resumeAudio} from "./audioContext.js";
import {GAME_STATES} from "../state.js";

let previousSpacePressed = false;
let previousGameState = null;

const handleGameStateTransition = gameState => {
    if (gameState === GAME_STATES.PLAYING && previousGameState !== GAME_STATES.PLAYING) {
        playStartSound();
    } else if (gameState === GAME_STATES.GAME_OVER) {
        playGameOverSound();
    }
};

const handleInGameSound = (isSpacePressed, field) => {
    if (isSpacePressed) {
        if (previousSpacePressed) playGlideSound();
        else playJumpSound();
    }

    if (field.player.collided) {
        playCollisionSound();
    }
};

export const processGameSounds = (field, gameState, isSpacePressed) => {
    if (isSpacePressed || gameState === GAME_STATES.PLAYING) resumeAudio();

    playBackgroundMusic(gameState);

    if (previousGameState !== gameState) handleGameStateTransition(gameState);
    if (gameState === GAME_STATES.PLAYING) handleInGameSound(isSpacePressed, field);

    previousSpacePressed = isSpacePressed;
    previousGameState = gameState;
};
