document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleBtn');
    const speedSlider = document.getElementById('speedSlider');
    let isScrolling = false;
  
    toggleBtn.addEventListener('click', function() {
      isScrolling = !isScrolling;
      toggleBtn.textContent = isScrolling ? 'Stop Autoscroll' : 'Start Autoscroll';
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'toggle'});
      });
    });
  
    speedSlider.addEventListener('input', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'setSpeed', speed: parseInt(speedSlider.value)});
      });
    });
  });