const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;

    return mobileRegex.test(userAgent.toLowerCase()) || (hasTouchScreen && isSmallScreen);
};

const initializeMobileDetection = () => {
    if (!isMobileDevice()) return;
    document.body.classList.add('is-mobile');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileDetection);
} else {
    initializeMobileDetection();
}
