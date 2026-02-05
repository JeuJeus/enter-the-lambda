let isSpacePressed = false;
let onSpaceDown = null;
let onSpaceUp = null;
let onAnyKeyDown = null;

export const setSpacePressed = (value) => isSpacePressed = value;
export const getSpacePressed = () => isSpacePressed;
export const setOnSpaceDown = (callback) => onSpaceDown = callback;
export const setOnAnyKeyDown = (callback) => onAnyKeyDown = callback;

export const initializeControls = () => {
    window.addEventListener('keydown', (e) => {
        if (onAnyKeyDown) onAnyKeyDown(e);

        if (e.code === 'Space') {
            setSpacePressed(true);
            if (onSpaceDown) onSpaceDown();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            setSpacePressed(false);
            if (onSpaceUp) onSpaceUp();
        }
    });
};
