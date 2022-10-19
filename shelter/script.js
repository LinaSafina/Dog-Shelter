//burger menu

const header = document.querySelector('header');
const body = document.body;
const burger = header.querySelector('.menu-icon');
const navMenu = header.querySelector('.nav-menu');
const logo = document.querySelector('.logo');
const overlay = body.querySelector('.overlay');
const menuListItems = navMenu.querySelectorAll('li');

burger.addEventListener('click', addAnimatedClass);
burger.addEventListener('click', toggleClasses);
overlay.addEventListener('click', toggleClasses);

Array.from(menuListItems).forEach((item) =>
  item.addEventListener('click', toggleClasses)
);

function addAnimatedClass() {
  burger.classList.add('animated');
  navMenu.classList.add('animated');
}

function toggleClasses() {
  body.classList.toggle('active-menu');
  header.classList.toggle('active-menu');
  logo.classList.toggle('active-menu');
  burger.classList.toggle('active-menu');
  navMenu.classList.toggle('active-menu');
}
console.log(header, burger);
