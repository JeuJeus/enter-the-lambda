import {compositeBackgroundWithForeground} from "../layers/composition.js";
import {renderField, renderScreenWithOverlays} from "../render.js";
import {createBlankField} from "../../component/field/field.js";
import {addHudToBaseView} from "../text/hud.js";
import {getCurrentGameScore, getGameState, stateRenderMap} from "../../state.js";
import {renderAsciiArt} from "../text/asciiArt.js";
import {setDisplayContent} from "../../io/output/outputText.js";
import {addOutputFilter} from "../../io/output/filter/filter.js";
import {
    createBoxesHighlightFilter,
    createFloorHighlightFilter,
    createPlayerHighlightFilter
} from "../../io/output/filter/characterHighlighting.js";

export const renderStartScreenContent = (config, currentGameScore, highScore, timestamp) => {
    const blankField = createBlankField(config);
    const withLambdaArt = renderAsciiArt(config.STYLE.MESSAGES.ASCII_LAMBDA, blankField, Math.floor(config.DIMENSIONS.HEIGHT / 2), -8);
    const overlayConfig = [
        {offset: '0', text: {text: config.STYLE.MESSAGES.GAME_START, shouldBlink: false}},
        {offset: '4', text: {text: config.STYLE.MESSAGES.GAME_START_SUBSCRIPT, shouldBlink: true}},
        {offset: '6', text: {text: `HIGH SCORE: ${highScore}`, shouldBlink: false}}
    ];
    return renderScreenWithOverlays(withLambdaArt, currentGameScore, config.DIMENSIONS, config, overlayConfig, timestamp);
};

export const renderPlayingScreenContent = (field, config, timestamp) => {
    const baseView = renderField(field, config.STYLE.UNICODE, timestamp);
    const hudView = addHudToBaseView(baseView, field.score, field.highScore);
    return compositeBackgroundWithForeground(hudView, field.score, field.dimensions, config);
};

export const renderGameOverScreenContent = (field, config, timestamp) => {
    const baseView = renderField(field, config.STYLE.UNICODE, timestamp);
    const hudView = addHudToBaseView(baseView, field.score, field.highScore);
    const withArt = renderAsciiArt(config.STYLE.MESSAGES.GAME_OVER, hudView, Math.floor(config.DIMENSIONS.HEIGHT / 2), -4);
    const overlayConfig = [
        {offset: '4', text: {text: config.STYLE.MESSAGES.GAME_RESTART_SUBSCRIPT, shouldBlink: true}},
        {offset: '6', text: {text: `${config.STYLE.MESSAGES.SCORE_SUMMARY}${field.score}`, shouldBlink: false}}
    ];
    return renderScreenWithOverlays(withArt, field.score, field.dimensions, config, overlayConfig, timestamp);
};

export const setOutputFilters = (config) => {
    addOutputFilter(createPlayerHighlightFilter(config.STYLE.UNICODE.PLAYER));
    addOutputFilter(createBoxesHighlightFilter(config.STYLE.UNICODE.BOXES));
    addOutputFilter(createFloorHighlightFilter(config.STYLE.UNICODE.FLOOR_PATTERN));
};

export const updateDisplay = (field, config, timestamp) => {
    const screenRenderer = stateRenderMap[getGameState()];
    const screenContent = screenRenderer(field, config, timestamp, getCurrentGameScore());
    setDisplayContent(screenContent);
};
