import { context } from './audioContext.js';
import { startShepardTone, stopShepardTone } from './shepard.js';
import { PATTERNS } from './patterns/bgmPatterns.js';
import { SFX_PATTERNS } from './patterns/sfxPatterns.js';


const createOscillator = (type, frequency, startTime, duration, volume = 0.1) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(volume, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
    return oscillator;
};

let currentBackgroundMusicState = null;
let nextNoteTime = 0;
let noteIndex = 0;
let timeoutId = null;

const scheduler = () => {
    const pattern = PATTERNS[currentBackgroundMusicState];
    if (!pattern) return;

    while (nextNoteTime < context.currentTime + 0.1) {
        const freq = pattern.notes[noteIndex % pattern.notes.length];

        if (Number.isFinite(freq)) {
            createOscillator(pattern.type, freq, nextNoteTime, pattern.tempo * 0.8, pattern.vol);
        }

        nextNoteTime += pattern.tempo;
        noteIndex++;
    }
    timeoutId = setTimeout(scheduler, 25);
};

const isFalling = () => currentBackgroundMusicState === 'GAME_OVER';

export const playBackgroundMusic = (state) => {
    if (currentBackgroundMusicState === state) return;

    stopBackgroundMusic();

    currentBackgroundMusicState = state;

    if (state === 'PLAYING' || state === 'GAME_OVER') {
        startShepardTone(context, context.destination, isFalling);
    }

    noteIndex = 0;

    if (nextNoteTime < context.currentTime) {
        nextNoteTime = context.currentTime + 0.1;
    }

    if (!timeoutId) {
        scheduler();
    }
};

export const stopBackgroundMusic = () => {
    currentBackgroundMusicState = null;
    clearTimeout(timeoutId);
    timeoutId = null;
    stopShepardTone(context);
};

const playSfxPattern = (pattern) => {
    const now = context.currentTime;
    pattern.forEach(note => createOscillator(note.type, note.freq, now + note.delay, note.duration, note.vol));
};

export const playJumpSound = () => playSfxPattern(SFX_PATTERNS.JUMP);

export const playGlideSound = () => {
    const config = SFX_PATTERNS.GLIDE;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = config.type;
    oscillator.frequency.setValueAtTime(config.startFreq, now);
    oscillator.frequency.linearRampToValueAtTime(config.endFreq, now + config.duration);

    gainNode.gain.setValueAtTime(config.startVol, now);
    gainNode.gain.linearRampToValueAtTime(config.endVol, now + config.duration);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(now);
    oscillator.stop(now + config.duration);
};

export const playCollisionSound = () => playSfxPattern(SFX_PATTERNS.COLLISION);

export const playGameOverSound = () => playSfxPattern(SFX_PATTERNS.GAME_OVER);

export const playStartSound = () => playSfxPattern(SFX_PATTERNS.START);
