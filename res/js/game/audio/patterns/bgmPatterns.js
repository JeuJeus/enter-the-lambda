const THEME_NOTES = {
    C2: 65.41, Cs2: 69.30, D2: 73.42, Eb2: 77.78, E2: 82.41, F2: 87.31, Fs2: 92.50, G2: 98.00, Ab2: 103.83, A2: 110.00, Bb2: 116.54, B2: 123.47,
    C3: 130.81, Cs3: 138.59, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61, Fs3: 185.00, G3: 196.00, Ab3: 207.65, A3: 220.00, Bb3: 233.08, B3: 246.94,
    C4: 261.63, Cs4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, Gs4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
    C5: 523.25, Eb5: 622.25, E5: 659.25, Fs5: 739.99, G5: 783.99
};

export const PATTERNS = {
    START_SCREEN: {
        tempo: 0.15,
        notes: [
            THEME_NOTES.C3, THEME_NOTES.G3, THEME_NOTES.C4, THEME_NOTES.Eb4,
            THEME_NOTES.G4, THEME_NOTES.Eb4, THEME_NOTES.C4, THEME_NOTES.G3,
            THEME_NOTES.C3, THEME_NOTES.G3, THEME_NOTES.B3, THEME_NOTES.D4,
            THEME_NOTES.G4, THEME_NOTES.D4, THEME_NOTES.B3, THEME_NOTES.G3
        ],
        type: 'triangle',
        vol: 0.1
    },
    PLAYING: {
        tempo: 0.12,
        notes: [
            THEME_NOTES.C4, THEME_NOTES.G4, THEME_NOTES.C5, THEME_NOTES.Eb5,
            THEME_NOTES.G4, THEME_NOTES.Eb5, THEME_NOTES.D5, THEME_NOTES.B4,
            THEME_NOTES.C5, THEME_NOTES.G4, THEME_NOTES.Eb4, THEME_NOTES.C4,
            THEME_NOTES.G3, THEME_NOTES.Bb3, THEME_NOTES.D4, THEME_NOTES.F4
        ],
        type: 'triangle',
        vol: 0.12
    },
    GAME_OVER: {
        tempo: 0.2,
        notes: [
            THEME_NOTES.C2, THEME_NOTES.Fs2,
            THEME_NOTES.C3, THEME_NOTES.Fs3,
            THEME_NOTES.Cs3, THEME_NOTES.G3,
            THEME_NOTES.F2, THEME_NOTES.B2
        ],
        type: 'sawtooth',
        vol: 0.06
    }
};
