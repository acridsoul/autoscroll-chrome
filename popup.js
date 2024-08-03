document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleBtn');
  const speedSlider = document.getElementById('speedSlider');
  const speedValue = document.getElementById('speedValue');
  const clickIntervalInput = document.getElementById('clickInterval');
  let isScrolling = false;

  toggleBtn.addEventListener('click', function() {
      isScrolling = !isScrolling;
      toggleBtn.textContent = isScrolling ? 'Stop Autoscroll' : 'Start Autoscroll';
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
              action: 'toggle',
              clickInterval: parseInt(clickIntervalInput.value)
          });
      });
  });

  speedSlider.addEventListener('input', function() {
      const speed = parseInt(speedSlider.value);
      speedValue.textContent = speed;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: 'setSpeed', speed: speed});
      });
  });

  clickIntervalInput.addEventListener('change', function() {
      const interval = parseInt(clickIntervalInput.value);
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: 'setClickInterval', interval: interval});
      });
  });
});