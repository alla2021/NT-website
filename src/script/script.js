//burger
const btnMenu = document.querySelector('.js-burger-btn');
const menu = document.querySelector('.js-header');

btnMenu.addEventListener('click', function() {
  menu.classList.toggle('active');
});

const headerLinks = document.querySelectorAll('.js-header a');
headerLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    menu.classList.remove('active');
  });
});

document.addEventListener('mouseup', function(e) {
  if (!menu.contains(e.target)) {
    menu.classList.remove('active');
  }
});

