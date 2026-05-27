// 1. Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { 
    if (e.isIntersecting) { 
      e.target.classList.add('visible'); 
    } 
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// 2. Smooth scroll for "Plan My Trip" button
document.addEventListener('DOMContentLoaded', () => {
  const planBtn = document.querySelector('.btn-hero');
  if (planBtn) {
    planBtn.addEventListener('click', () => {
      document.getElementById('how').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 3. Slideshow
  const slides = document.querySelectorAll('#slideshow .slide');
  const dotsContainer = document.getElementById('slide-dots');
  let current = 0;
  let timer;

  if (slides.length && dotsContainer) {
    // Build dots
    slides.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(d);
    });

    function goTo(n) {
      slides[current].classList.remove('active');
      dotsContainer.children[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dotsContainer.children[current].classList.add('active');
    }

    function next() { goTo(current + 1); }

    timer = setInterval(next, 3500);

    // Pause on hover
    document.getElementById('slideshow').addEventListener('mouseenter', () => clearInterval(timer));
    document.getElementById('slideshow').addEventListener('mouseleave', () => { timer = setInterval(next, 3500); });
  }
});
// INTRO SCREEN
(function() {
  var intro = document.getElementById('intro-screen');
  if (!intro) return;
  setTimeout(function() {
    intro.classList.add('hide');
    setTimeout(function() {
      intro.style.display = 'none';
    }, 700);
  }, 3600);
})();



/* ai travel wizard logic */

// 1. Open the wizard when your existing button is clicked
document.getElementById('start-wizard-btn')?.addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('ai-wizard-overlay').classList.remove('wiz-hidden');
  nextStep(1); // Reset to step 1
});

// 2. Close Wizard
function closeWizard() {
  document.getElementById('ai-wizard-overlay').classList.add('wiz-hidden');
}

// 3. Step Navigation Logic
function nextStep(stepNumber) {
  // Hide all steps
  document.querySelectorAll('.wiz-step-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.wiz-step-indicator').forEach(el => el.classList.remove('active'));
  
  // Show target step
  document.getElementById(`wiz-step-${stepNumber}`).classList.add('active');
  
  // Update progress header
  for(let i = 1; i <= stepNumber; i++) {
    const indicator = document.querySelector(`.wiz-step-indicator[data-step="${i}"]`);
    if(indicator) indicator.classList.add('active');
  }
}

// 4. Style Box Selection (Cultural, Adventure, etc.)
document.querySelectorAll('.wiz-style-box').forEach(box => {
  box.addEventListener('click', function() {
    document.querySelectorAll('.wiz-style-box').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// 5. Budget Slider Real-time Update
const budgetInput = document.getElementById('wiz-budget');
const budgetDisplay = document.getElementById('wiz-budget-display');
if(budgetInput) {
  budgetInput.addEventListener('input', function() {
    budgetDisplay.innerText = "₹" + Number(this.value).toLocaleString('en-IN');
  });
}

// 6. Simulate AI Generation Process
function generateItinerary() {
  // Get User inputs for the UI
  const from = document.getElementById('wiz-from').value || "Home";
  const destination = document.getElementById('wiz-to').value || "Your Destination";
  const travelers = document.getElementById('wiz-travelers').value || 2;
  const totalBudget = document.getElementById('wiz-budget').value * travelers;
  
  // Hide steps, show loading
  document.querySelectorAll('.wiz-step-content').forEach(el => el.classList.remove('active'));
  document.getElementById('wiz-step-loading').classList.add('active');
  document.getElementById('wiz-load-dest').innerText = destination;
  
  // Simulate API delay (3 seconds)
  setTimeout(() => {
    // Hide loading, show dashboard
    document.getElementById('wiz-step-loading').classList.remove('active');
    document.getElementById('wiz-step-dashboard').classList.add('active');
    
    // Populate dynamic data into dashboard
    document.getElementById('wiz-final-title').innerText = `${from} → ${destination}`;
    document.getElementById('wiz-final-budget').innerText = "₹" + totalBudget.toLocaleString('en-IN');
    
    // Highlight step 4 in progress bar
    document.querySelector('.wiz-step-indicator[data-step="4"]').classList.add('active');
  }, 3000);
}


/* our team page */


document.addEventListener('DOMContentLoaded', function() {
  var teamBtn = document.getElementById('our-team-nav-btn');
  if (teamBtn) {
    teamBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openTeamPage();
    });
  }
});

function openTeamPage() {
  var overlay = document.getElementById('team-overlay');
  overlay.classList.remove('team-overlay-hidden');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeTeamPage() {
  var overlay = document.getElementById('team-overlay');
  overlay.classList.add('team-overlay-hidden');
  document.body.style.overflow = '';
}

/* saved itineraries overlay */

function openSavedOverlay() {
  var overlay = document.getElementById('saved-overlay');
  overlay.classList.remove('saved-overlay-hidden');
  document.body.style.overflow = 'hidden';
}

function closeSavedOverlay() {
  var overlay = document.getElementById('saved-overlay');
  overlay.classList.add('saved-overlay-hidden');
  document.body.style.overflow = '';
}

// Close on backdrop click
document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.getElementById('saved-overlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeSavedOverlay();
    });
  }
});

/* nav scroll effect */
(function() {
  var nav = document.querySelector('nav');
  if (!nav) return;
  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();