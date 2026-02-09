const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;

    return mobileRegex.test(userAgent.toLowerCase()) || (hasTouchScreen && isSmallScreen);
};

const createMobileWarningPopup = () => {
    const overlay = document.createElement('div');
    overlay.id = 'mobile-warning-overlay';
    overlay.className = 'mobile-warning-overlay';

    const popup = document.createElement('div');
    popup.className = 'mobile-warning-popup';

    popup.innerHTML = `
        <div class="mobile-warning-header">
            <span class="mobile-warning-icon">λ</span>
            <h2>DESKTOP ONLY</h2>
        </div>
        <div class="mobile-warning-content">
            <p>This game is currently only available on desktop devices.</p>
            <p>Please visit this website on a desktop computer for the full experience.</p>
            <div class="mobile-warning-actions">
                <a href="https://github.com/jeujeus/enter-the-lambda" 
                   target="_blank" 
                   class="mobile-warning-button mobile-warning-button-primary">
                    Visit Repository
                </a>
            </div>
        </div>
    `;

    overlay.appendChild(popup);
    return overlay;
};

const hideCrtMonitor = () => {
    const crtMonitor = document.querySelector('.crt-monitor');
    if (crtMonitor) {
        crtMonitor.style.display = 'none';
    }
};

const initializeMobileDetection = () => {
    if (isMobileDevice()) {
        hideCrtMonitor();
        const warningPopup = createMobileWarningPopup();
        document.body.appendChild(warningPopup);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileDetection);
} else {
    initializeMobileDetection();
}
