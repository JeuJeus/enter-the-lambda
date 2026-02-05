import {toggleMute} from "../game/audio/audioContext.js";

const listenForPowerButton = () => {
    const powerButton = document.getElementById('power-button');

    if (powerButton) {
        powerButton.addEventListener('click', () => {
            window.location.reload();
        });
    }
};

const listenForMuteButton = () => {
    const muteButton = document.getElementById('mute-button');
    if (muteButton) {
        muteButton.addEventListener('click', () => {
            const isMuted = toggleMute();
            muteButton.classList.toggle('muted', isMuted);
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    listenForPowerButton();
    listenForMuteButton();
});
