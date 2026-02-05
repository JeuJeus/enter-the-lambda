import {loadConfig} from "./game/io/config/configLoader.js";
import {generateNextField, getInitialField} from "./game/component/field/field.js";
import {isRenderIntervalExceeded, setLastTimestamp} from "./game/render/time.js";
import {isPlayerCollided} from "./game/component/player/physics.js";
import {saveNewScore} from "./game/utils/score.js";
import {GAME_STATES, getGameState, incrementGameScore, isStartingAgain, setGameState} from "./game/state.js";
import {setOutputFilters, updateDisplay} from "./game/render/screens/gameScreens.js";
import {getSpacePressed} from "./game/io/input/controls.js";
import {configureControls} from "./game/io/input/controlsLogic.js";
import {MILLISECONDS_IN_SECOND} from "./game/utils/ticks.js";
import {processGameSounds} from "./game/audio/soundManager.js";
import {initializeTerminal} from "./game/io/terminal.js";
import {initMatrixBackground} from "./surroundingStyle/matrixBackground.js";
import {runBootSequence} from "./surroundingStyle/bootSequence.js";

const handlePlayerCollided = (config, field, timestamp) => {
    saveNewScore(config.STORAGE_KEY, field.score);
    setGameState(GAME_STATES.GAME_OVER);

    processGameSounds(field, GAME_STATES.GAME_OVER, getSpacePressed());

    updateDisplay(field, config, timestamp);
    renderGameFrame(config, field);
};

const runGameInPlayingState = (field, config, timestamp, interval) => {
    const spacePressed = getSpacePressed();

    processGameSounds(field, GAME_STATES.PLAYING, spacePressed);

    if (isPlayerCollided(field)) {
        handlePlayerCollided(config, field, timestamp);
        return;
    }

    if (!isRenderIntervalExceeded(timestamp, interval)) {
        renderGameFrame(config, field);
        return;
    }

    updateDisplay(field, config, timestamp);
    setLastTimestamp(timestamp);
    renderGameFrame(config, generateNextField(field, spacePressed, config));
};


const handleRenderIntervalExceeded = (field, config, timestamp) => {
    incrementGameScore();
    updateDisplay(field, config, timestamp);
    setLastTimestamp(timestamp);
};

const runGame = (field, timestamp, config) => {
    const interval = MILLISECONDS_IN_SECOND / config.FPS;
    const currentGameState = getGameState();

    if (currentGameState === GAME_STATES.PLAYING) {
        runGameInPlayingState(field, config, timestamp, interval);
        return;
    }

    processGameSounds(field, currentGameState, getSpacePressed());

    // rendering for START_SCREEN and GAME_OVER states
    if (isRenderIntervalExceeded(timestamp, interval)) handleRenderIntervalExceeded(field, config, timestamp);

    const nextField = isStartingAgain(field) ? getInitialField(config) : field;
    renderGameFrame(config, nextField);
};

const renderGameFrame = (config, field) => requestAnimationFrame((nextTimestamp) => runGame(field, nextTimestamp, config));

const executePreGameEnvironment = async config => {
    await runBootSequence(config.STYLE.BOOTUP_SEQUENCE.LINES);
    initializeTerminal(config.STYLE.MESSAGES.TERMINAL_HISTORY);
};

export const executeGame = async () => {
    const config = await loadConfig();

    initMatrixBackground(config);
    await executePreGameEnvironment(config);

    configureControls();
    setOutputFilters(config);

    renderGameFrame(config, getInitialField(config));
};