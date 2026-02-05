const container = document.getElementById('matrix-background');

const getFontSize = size => `${size}px`;
const getAnimation = (duration, delay) => `matrix-fall ${duration}s linear ${delay}s infinite`;
const getOpacity = () => Math.random() * 0.5 + 0.1;

const getLeftStyle = () => `${Math.random() * 100}vw`;
const getDuration = () => Math.random() * 10 + 10;
const getDelay = () => Math.random() * -20;
const getSize = () => Math.floor(Math.random() * 10) + 10;

const CLASS_NAME = 'matrix-stream';
const getHtmlContent = lambdaCharacter => `${lambdaCharacter}<br>`;

const createStream = (lambdaCharacter) => {
    const stream = document.createElement('div');
    stream.className = CLASS_NAME;
    stream.innerHTML = getHtmlContent(lambdaCharacter);

    const duration = getDuration();
    const delay = getDelay();
    const size = getSize();

    stream.style.left = getLeftStyle();
    stream.style.fontSize = getFontSize(size);
    stream.style.animation = getAnimation(duration, delay);
    stream.style.opacity = getOpacity();

    container.appendChild(stream);
};

export const initMatrixBackground = (config) => {
    if (!container) return;

    const lambdaCharacter = config.STYLE.UNICODE.PLAYER;

    Array.from({ length: window.innerWidth / 15 })
        .forEach(() => createStream(lambdaCharacter));
};
