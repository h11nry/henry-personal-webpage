document.addEventListener('DOMContentLoaded', function() {
  // Inject HTML if not present
  if (!document.getElementById('customCursor')) {
    const cursorContainer = document.createElement('div');
    cursorContainer.className = 'custom-cursor';
    cursorContainer.id = 'customCursor';
    
    const cursorPaw = document.createElement('div');
    cursorPaw.className = 'cursor-paw';
    
    cursorContainer.appendChild(cursorPaw);
    document.body.appendChild(cursorContainer);
  }

  const cursor = document.getElementById('customCursor');
  const body = document.body;
  
  // Track mouse position
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Clickable elements selector
  const clickableSelectors = [
    'a', 'button', 'input', '[onclick]', '[role="button"]', 
    '.navbar-link', '.sidebar-info button', '.form-btn', '.paper-plane-button',
    '.blog-post-item', '.featured-image', '.gallery-image', '.lightbox-nav', '.lightbox-close',
    '.go-top-btn', '.lang-switch', '.back-link', '.service-item', '.project-item',
    '.testimonials-item', '.clients-item', '.filter-item button', '.filter-select'
  ];
  
  const selectorString = clickableSelectors.join(', ');

  // Hover effect using event delegation
  document.addEventListener('mouseover', function(e) {
    if (e.target.closest(selectorString)) {
      cursor.classList.add('cursor-hover');
    }
  });
  
  document.addEventListener('mouseout', function(e) {
    // If we moved to an element that is NOT a clickable or child of clickable
    if (!e.relatedTarget || !e.relatedTarget.closest(selectorString)) {
       cursor.classList.remove('cursor-hover');
    }
  });
  
  // Click effect
  document.addEventListener('click', function(e) {
    createClickEffect(e.clientX, e.clientY);
  });
  
  function createClickEffect(x, y) {
    const clickEffect = document.createElement('div');
    clickEffect.className = 'cursor-click';
    clickEffect.style.left = x + 'px';
    clickEffect.style.top = y + 'px';
    
    // Create cat face SVG/Image element
    clickEffect.innerHTML = `
      <div class="cat-svg"></div>
    `;
    
    body.appendChild(clickEffect);
    
    // Remove element after animation
    setTimeout(() => {
      if (clickEffect.parentNode) {
        clickEffect.parentNode.removeChild(clickEffect);
      }
    }, 600);
  }
  
  // Hide cursor when leaving window
  document.addEventListener('mouseleave', function() {
    cursor.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', function() {
    cursor.style.opacity = '1';
  });
});
