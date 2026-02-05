export const SFX_PATTERNS = {
    JUMP: [
        { type: 'triangle', freq: 200, delay: 0, duration: 0.05, vol: 0.05 },
        { type: 'triangle', freq: 300, delay: 0.05, duration: 0.05, vol: 0.05 }
    ],
    GLIDE: {
        type: 'sawtooth',
        startFreq: 100,
        endFreq: 80,
        startVol: 0.02,
        endVol: 0,
        duration: 0.1
    },
    COLLISION: [
        { type: 'sawtooth', freq: 100, delay: 0, duration: 0.3, vol: 0.3 },
        { type: 'square', freq: 50, delay: 0, duration: 0.3, vol: 0.3 }
    ],
    GAME_OVER: [
        { type: 'sawtooth', freq: 300, delay: 0, duration: 0.2, vol: 0.1 },
        { type: 'sawtooth', freq: 250, delay: 0.2, duration: 0.2, vol: 0.1 },
        { type: 'sawtooth', freq: 200, delay: 0.4, duration: 0.2, vol: 0.1 },
        { type: 'sawtooth', freq: 150, delay: 0.6, duration: 0.4, vol: 0.1 }
    ],
    START: [
        { type: 'triangle', freq: 440, delay: 0, duration: 0.08, vol: 0.1 },
        { type: 'triangle', freq: 554, delay: 0.08, duration: 0.08, vol: 0.1 },
        { type: 'triangle', freq: 659, delay: 0.16, duration: 0.08, vol: 0.1 },
        { type: 'square', freq: 880, delay: 0.24, duration: 0.3, vol: 0.05 }
    ]
};
