const imgSrc = '../../assets/images';

//get array of random pets for pagination

let arrayOfPets = [];
let helper = null;

for (let j = 0; j <= 10; j++) {
  let filteredData = [...data];

  if (j !== 0 && j % 2 === 0) {
    filteredData = data.filter(
      (pet) =>
        pet.id !== arrayOfPets[arrayOfPets.length - 1].id &&
        pet.id !== arrayOfPets[arrayOfPets.length - 2].id &&
        pet.id !== arrayOfPets[arrayOfPets.length - 3].id &&
        pet.id !== arrayOfPets[arrayOfPets.length - 4].id
    );
  } else if (j !== 0 && j % 2 === 1) {
    filteredData = data.filter(
      (pet) =>
        pet.id !== arrayOfPets[arrayOfPets.length - 1].id &&
        pet.id !== arrayOfPets[arrayOfPets.length - 2].id
    );
  }

  for (let i = 0; i < filteredData.length; i++) {
    const random = Math.floor(Math.random() * filteredData.length);

    helper = filteredData[i];
    filteredData[i] = filteredData[random];
    filteredData[random] = helper;
  }

  if (j !== 0) {
    filteredData = filteredData.slice(0, 4);
  }

  arrayOfPets = [...arrayOfPets, ...filteredData];
}

//add pets info to the page

const petContainer = document.querySelector('.pet-container');
const petCards = Array.from(document.querySelectorAll('.pet-card'));
const paginationBtns = Array.from(
  document.querySelectorAll('.button-pagination')
);
const firstPageBtn = paginationBtns[0];
const previousPageBtn = paginationBtns[1];
const currentPageBtn = paginationBtns[2];
const nextPageBtn = paginationBtns[3];
const lastPageBtn = paginationBtns[4];
let currentPage = 1;
let numOfPets = arrayOfPets.length;
let shownPetsArr = [];
let numOfShownPets = getNumOfShownPets();

window.addEventListener('resize', () => {
  const newNum = getNumOfShownPets();

  if (newNum === numOfShownPets) {
    return;
  }

  changeCurrentPage(
    newNum > numOfShownPets
      ? Math.ceil((currentPage * numOfShownPets) / newNum)
      : Math.ceil((currentPage * numOfShownPets) / newNum) - 1
  );

  numOfShownPets = newNum;

  isFirstPage() ? disableFirstBtns() : activateFirstBtns();
  isLastPage() ? disableLastBtns() : activateLastBtns();
});

firstPageBtn.addEventListener('click', () => {
  changeCurrentPage(1);
  slideFade();
  disableFirstBtns();
  activateLastBtns();
});
lastPageBtn.addEventListener('click', () => {
  changeCurrentPage(Math.ceil(numOfPets / numOfShownPets));
  slideFade();
  disableLastBtns();
  activateFirstBtns();
});
previousPageBtn.addEventListener('click', () => {
  changeCurrentPage(currentPage - 1);
  slideFade();

  if (currentPage === 1) {
    disableFirstBtns();
  }

  activateLastBtns();
});
nextPageBtn.addEventListener('click', () => {
  changeCurrentPage(currentPage + 1);
  slideFade();

  if (isLastPage()) {
    disableLastBtns();
  }

  activateFirstBtns();
});

getNumOfShownPets();
getPets();

function changeCurrentPage(page) {
  currentPage = page;
  currentPageBtn.innerHTML = page;
}

function getNumOfShownPets() {
  shownPetsArr = [
    ...petCards.filter((card) => {
      return window.getComputedStyle(card, null).display !== 'none';
    }),
  ];

  return shownPetsArr.length;
}

function getPets() {
  const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * numOfShownPets;

  petCards.forEach((card, index) => {
    const pet = arrayOfPets[index + startIndex];

    const img = card.querySelector('img');
    const name = card.querySelector('p');

    card.id = pet.id;
    img.src = `${imgSrc}/${pet.img}`;
    img.alt = pet.name;
    name.innerHTML = pet.name;
  });
}

function disableBtn(btn) {
  btn.classList.add('disabled');
}

function activateBtn(btn) {
  btn.classList.remove('disabled');
}

function disableLastBtns() {
  disableBtn(lastPageBtn);
  disableBtn(nextPageBtn);
}

function activateLastBtns() {
  activateBtn(lastPageBtn);
  activateBtn(nextPageBtn);
}

function disableFirstBtns() {
  disableBtn(firstPageBtn);
  disableBtn(previousPageBtn);
}

function activateFirstBtns() {
  activateBtn(firstPageBtn);
  activateBtn(previousPageBtn);
}

function isLastPage() {
  return currentPage === Math.ceil(numOfPets / numOfShownPets);
}

function isFirstPage() {
  return currentPage === 1;
}

function slideFade() {
  petContainer.classList.add('animated');
  setTimeout(() => {
    getPets();
    petContainer.classList.remove('animated');
  }, 1000);
}
