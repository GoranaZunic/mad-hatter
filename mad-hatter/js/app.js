// Event Listeners
eventListeners();
function eventListeners() {
  // Sroll or move mouse to show buttons (nav, top, switch)
  window.addEventListener('mousemove', function() {
    showBtns()
  });
  window.addEventListener('scroll', function() {
    showBtns()
  });
  // Click to show navigation bar
  document.querySelector('.navBtn').addEventListener('click', function () {
    showNav();
  })
  // Click the switch to control the video
  document.querySelector('.video-switch').addEventListener('click', function () {
    videoControls();
  })
  // Click to view larger image
  const links = document.querySelectorAll('.galery-item-icon');
    links.forEach(function (item) {
    item.addEventListener('click', function (event) {
      showModal(event)
    })
  })
  // Click to close large image
  document.querySelector('.galery-modal-close').addEventListener('click', function () {
    closeModal()
  })
}

// Functions

// Show buttons
function showBtns() {
  document.querySelector('.navBtn').style.display="block";
  document.querySelector('.video-switch-container').style.display="block";
  document.querySelector('.topBtn').style.display = "block";
}
// Show navigation
function showNav() {
    document.querySelector('.nav').classList.toggle('nav-show')
}
// Play/pause the video
function videoControls()  {
    let btn = document.querySelector('.video-switch-btn');
    if (!btn.classList.contains('btnSlide')) {
      btn.classList.add('btnSlide')
      document.querySelector('.video-item').pause();
    }
    else {
      btn.classList.remove('btnSlide')
      document.querySelector('.video-item').play();
    }
}
// Show modal
function showModal() {
  event.preventDefault();
    if (event.target.parentElement.classList.contains('galery-item-icon')) {
        let id = event.target.parentElement.dataset.id
        const modal = document.querySelector('.galery-modal');
        const modalItem = document.querySelector('.galery-modal-item');
        modal.classList.add('galery-modal-show');
        modalItem.style.backgroundImage = `url(img/party-${id}.jpg)`
    }
}
// Hide modal
function closeModal() {
  document.querySelector('.galery-modal').classList.remove('galery-modal-show')
}