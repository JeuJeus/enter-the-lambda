export const getSecureRandomValue = () => {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    return randomBuffer[0] / (0xffffffff + 1);
};
