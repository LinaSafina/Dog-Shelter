//burger menu

const header = document.querySelector('header');
const body = document.body;
const burger = header.querySelector('.menu-icon');
const navMenu = header.querySelector('.nav-menu');
const logo = document.querySelector('.logo');
const overlay = body.querySelector('.overlay');
const menuListItems = navMenu.querySelectorAll('li');

burger.addEventListener('click', () => {
  if (burger.classList.contains('active-menu')) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener('click', () => {
  closeMenu();
});

Array.from(menuListItems).forEach((item) =>
  item.addEventListener('click', () => {
    if (burger.classList.contains('active-menu')) {
      closeMenu();
    }
  })
);

function openMenu() {
  burger.classList.add('animated');
  navMenu.classList.add('animated');

  body.classList.add('active-menu');
  header.classList.add('active-menu');
  logo.classList.add('active-menu');
  burger.classList.add('active-menu');
  navMenu.classList.add('active-menu');
}

function closeMenu() {
  body.classList.remove('active-menu');
  header.classList.remove('active-menu');
  logo.classList.remove('active-menu');
  burger.classList.remove('active-menu');
  navMenu.classList.remove('active-menu');

  setTimeout(() => {
    burger.classList.remove('animated');
    navMenu.classList.remove('animated');
  }, 1000);
}

//popup

const popup = document.querySelector('.popup');
const popupImg = popup.querySelector('img');
const popupTitle = popup.querySelector('.content__title');
const popupSubtitle = popup.querySelector('.content__subtitle');
const popupDescr = popup.querySelector('.content__descr');
const petDiseases = popup.querySelector('[data-id="diseases"]');
const petAge = popup.querySelector('[data-id="age"]');
const petInoculations = popup.querySelector('[data-id="inoculations"]');
const petParasites = popup.querySelector('[data-id="parasites"]');
const popupCloseBtn = popup.querySelector('.popup__closeBtn');

petContainer.addEventListener('click', openPopup);
overlay.addEventListener('click', (event) => {
  if (event.target === overlay || event.target === popupCloseBtn) {
    removePopupClasses();
  }
});
popupCloseBtn.addEventListener('click', removePopupClasses);

function openPopup(event) {
  const eventTarget = event.target;
  console.log(event.target);

  if (eventTarget.nodeName === 'BUTTON') {
    popup.classList.remove('animated');

    const id = eventTarget.parentNode.id;
    const currPet = data.find((pet) => pet.id === id);

    popupImg.src = `${imgSrc}/${currPet.img}`;
    popupImg.alt = currPet.name;
    popupTitle.innerHTML = currPet.name;
    popupSubtitle.innerHTML = `${currPet.type} - ${currPet.breed}`;
    popupDescr.innerHTML = currPet.description;
    petAge.innerHTML = currPet.age;
    petDiseases.innerHTML = currPet.diseases;
    petInoculations.innerHTML = currPet.inoculations;
    petParasites.innerHTML = currPet.parasites;

    popup.classList.add('opened-popup');
    body.classList.toggle('opened-popup');
  }
}

function removePopupClasses() {
  popup.classList.add('animated');
  setTimeout(() => {
    body.classList.remove('opened-popup');
    popup.classList.remove('opened-popup');
  }, 500);
}
