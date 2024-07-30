let isScrolling = false;
let scrollSpeed = 1; // pixels per interval

function autoScroll() {
  if (isScrolling) {
    window.scrollBy(0, scrollSpeed);
    requestAnimationFrame(autoScroll);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggle') {
    isScrolling = !isScrolling;
    if (isScrolling) {
      autoScroll();
    }
  } else if (request.action === 'setSpeed') {
    scrollSpeed = request.speed;
  }
});