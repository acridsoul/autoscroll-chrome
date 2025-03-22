// Create container
const container = document.createElement('div');
container.className = 'arrows-container';
container.innerHTML = `
  <div class="scroll-arrow" data-direction="up">↑</div>
  <div class="scroll-arrow" data-direction="down">↓</div>
`;

// Add to body
document.body.appendChild(container);

// Drag functionality (same as before)
let isDragging = false;
let startX, startY, initialX, initialY;

container.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

function startDrag(e) {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  initialX = container.offsetLeft;
  initialY = container.offsetTop;
  container.style.transition = 'none';
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();
  
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  
  container.style.left = `${initialX + dx}px`;
  container.style.top = `${initialY + dy}px`;
}

function endDrag() {
  isDragging = false;
  container.style.transition = 'all 0.3s';
}

// Updated scroll functionality (only up/down)
container.querySelectorAll('.scroll-arrow').forEach(arrow => {
  arrow.addEventListener('click', (e) => {
    const direction = e.target.dataset.direction;
    const scrollAmount = 100;
    
    if (direction === 'up') {
      window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'down') {
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  });
});