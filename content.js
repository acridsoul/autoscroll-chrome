let isScrolling = false;
let scrollSpeed = 1;
let clickInterval = 0;
let clickTimer = null;

function autoScroll() {
    if (isScrolling) {
        window.scrollBy(0, scrollSpeed);
        requestAnimationFrame(autoScroll);
    }
}

function performClick() {
    // This will click at the center of the viewport
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const element = document.elementFromPoint(centerX, centerY);
    if (element) {
        element.click();
    }
}



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggle') {
        isScrolling = !isScrolling;
        clickInterval = request.clickInterval;
        if (isScrolling) {
            autoScroll();
            if (clickInterval > 0) {
                clickTimer = setInterval(performClick, clickInterval * 1000);
            }
        } else {
            if (clickTimer) {
                clearInterval(clickTimer);
            }
        }
    } else if (request.action === 'setSpeed') {
        scrollSpeed = request.speed;
    } else if (request.action === 'setClickInterval') {
        clickInterval = request.interval;
        if (clickTimer) {
            clearInterval(clickTimer);
        }
        if (isScrolling && clickInterval > 0) {
            clickTimer = setInterval(performClick, clickInterval * 1000);
        }
    }
});

