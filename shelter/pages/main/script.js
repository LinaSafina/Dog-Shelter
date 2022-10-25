let imgSrc = './assets/images';

const backBtn = document.querySelector('.button-arrow.left');
const forwardBtn = document.querySelector('.button-arrow.right');
const petContainer = document.querySelector('.pet-container.current');
let shownPetCards = petContainer.querySelectorAll('.pet-card');
const carouselContainer = document.querySelector('.carousel-container');
const petCards = Array.from(document.querySelectorAll('.pet-card'));

// carousel

let numOfShownPets = getNumOfShownPets();
let arrOfShownPets = getRandomCards(numOfShownPets, data);

drawRandomCards(shownPetCards);

backBtn.addEventListener('click', showPreviousSlides);
forwardBtn.addEventListener('click', showNextSlides);

window.addEventListener('resize', () => {
  numOfShownPets = getNumOfShownPets();
});

function getRandomCards(num, arr) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num + 2);
}

function drawRandomCards(cards) {
  cards.forEach((card, index) => {
    // if (window.getComputedStyle(card, null).display !== 'none') {
    const img = card.querySelector('img');
    const name = card.querySelector('p');

    const pet = arrOfShownPets[index];

    card.id = pet.id;
    img.src = `${imgSrc}/${pet.img}`;
    img.alt = pet.name;
    name.innerHTML = pet.name;
    // }
  });
}

function getNumOfShownPets() {
  let shownPetsArr = [
    ...Array.from(shownPetCards).filter((card) => {
      return window.getComputedStyle(card, null).display !== 'none';
    }),
  ];

  return shownPetsArr.length;
}

function showPreviousSlides() {
  const previousPetCards =
    document.querySelectorAll('.pet-container')[0].children;

  document
    .querySelector('.carousel-container')
    .prepend(document.querySelectorAll('.pet-container')[2]);

  let filteredData = [...data];
  for (let i = 0; i < numOfShownPets; i++) {
    filteredData = filteredData.filter(
      (card) => card.id !== arrOfShownPets[i].id
    );
  }

  arrOfShownPets = getRandomCards(numOfShownPets, filteredData);

  drawRandomCards(Array.from(previousPetCards));
}

function showNextSlides() {
  const nextPetCards = document.querySelectorAll('.pet-container')[2].children;

  document
    .querySelector('.carousel-container')
    .append(document.querySelectorAll('.pet-container')[0]);

  let filteredData = [...data];
  for (let i = 0; i < numOfShownPets; i++) {
    filteredData = filteredData.filter(
      (card) => card.id !== arrOfShownPets[i].id
    );
  }

  arrOfShownPets = getRandomCards(numOfShownPets, filteredData);
  drawRandomCards(Array.from(nextPetCards));
}
