const AudioContext = window.AudioContext || window.webkitAudioContext;
export const context = new AudioContext();

let isMuted = false;

export const resumeAudio = () => {
    if (isMuted) return;
    if (context.state !== 'suspended') return;
    context.resume();
};

export const toggleMute = () => {
    isMuted = !isMuted;
    if (isMuted) {
        context.suspend();
    } else {
        context.resume();
    }
    return isMuted;
};
