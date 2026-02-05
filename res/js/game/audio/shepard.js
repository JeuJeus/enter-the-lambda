let shepardNodes = [];
let shepardRunning = false;

const createShepardOscillatorPair = (context, destination) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = 110;
    gainNode.gain.value = 0;

    oscillator.connect(gainNode);
    gainNode.connect(destination);
    oscillator.start();

    return { osc: oscillator, gain: gainNode };
};

const handleShepardNode = (i, numOscillators, now, cycleLength, isFalling, numOctaves, baseFreq, node) => {
    const offset = i / numOscillators;
    const t = (now / cycleLength + offset) % 1;

    const exponent = isFalling ? (1 - t) * numOctaves : t * numOctaves;
    const freq = baseFreq * Math.pow(2, exponent);

    const gain = 0.5 - 0.5 * Math.cos(2 * Math.PI * t);

    node.osc.frequency.setTargetAtTime(freq, now, 0.1);
    const volumeGain = 0.012;
    node.gain.gain.setTargetAtTime(gain * volumeGain, now, 0.1);
};

const updateShepardTone = (context, isFallingGetter) => {
    if (!shepardRunning) return;

    const now = context.currentTime;
    const cycleLength = 20;
    const numOscillators = 6;
    const baseFreq = 110;
    const numOctaves = 4;

    const isFalling = isFallingGetter();

    shepardNodes.forEach((node, i) => handleShepardNode(i, numOscillators, now, cycleLength, isFalling, numOctaves, baseFreq, node));

    requestAnimationFrame(() => updateShepardTone(context, isFallingGetter));
};

export const startShepardTone = (context, destination, isFallingGetter) => {
    if (shepardRunning) return;
    shepardRunning = true;

    shepardNodes = Array.from({ length: 6 }, () => createShepardOscillatorPair(context, destination));

    updateShepardTone(context, isFallingGetter);
};

export const stopShepardTone = (context) => {
    shepardRunning = false;
    shepardNodes.forEach(node => {
        node.gain.gain.setTargetAtTime(0, context.currentTime, 0.05);
        node.osc.stop(context.currentTime + 0.1);
        setTimeout(() => {
            node.osc.disconnect();
            node.gain.disconnect();
        }, 150);
    });
    shepardNodes = [];
};
