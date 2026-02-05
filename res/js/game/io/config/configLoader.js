export const loadConfig = async () => {
    const response = await fetch('res/game-config.json');
    return await response.json();
};