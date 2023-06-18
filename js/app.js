import { marvel_characters } from "./data.js";
import { randomCards } from "./helper.js";
let chanse = 10;
let helper = 2;
const chanses = document.querySelector(".lives");
const light = document.querySelector(".HELP");
const game = document.querySelector(".game");
let isAnimating = false;
const refreshBtn = document.querySelector(".fa-rotate-right");
const helpBtn = document.querySelector(".fa-lightbulb");

light.innerHTML = helper;

const generateCards = () => {
  const characters = randomCards();

  characters.forEach((el) => {
    const card = document.createElement("div");
    const front = document.createElement("img");
    const back = document.createElement("img");

    front.src = el.img;
    back.src =
      "https://w0.peakpx.com/wallpaper/172/910/HD-wallpaper-avengers-endgame-avengers-endgame-logo-logo-movies.jpg";
    card.dataset.name = el.name;

    card.addEventListener("click", function (e) {
      match(e);
    });

    card.classList.add("card");
    front.classList.add("front");
    back.classList.add("back");

    card.append(front);
    card.append(back);
    game.append(card);
  });
};

function match(e) {
  if (isAnimating) return;
  const clickedElement = e.target.parentElement;
  clickedElement.classList.add("rotate");
  clickedElement.classList.add("clicked");
  let allClickCards = document.querySelectorAll(".clicked");

  if (allClickCards.length !== 2) return;
  if (allClickCards[0].dataset.name === allClickCards[1].dataset.name) {
    allClickCards[0].classList.remove("clicked");
    allClickCards[1].classList.remove("clicked");
    const allRotatedCards = document.querySelectorAll(".rotate");
    if (allRotatedCards.length === 16) {
      setTimeout(() => {
        reset(alert("You Won!"));
      }, 1000);
    }
  } else {
    isAnimating = true;
    setTimeout(() => {
      allClickCards[0].classList.remove("rotate");
      allClickCards[1].classList.remove("rotate");
      allClickCards[0].classList.remove("clicked");
      allClickCards[1].classList.remove("clicked");
      isAnimating = false;
    }, 1000);
    chanse--;
    chanses.innerHTML = chanse;

    if (chanse === 0) {
      setTimeout(() => {
        reset(alert("You Lose!"));
      }, 1000);
    }
  }
}

function reset() {
  chanse = 10;
  helper = 2;
  chanses.innerHTML = chanse;
  light.innerHTML = helper;

  const newRandomCards = randomCards();
  const cards = document.querySelectorAll(".card");

  cards.forEach((el, index) => {
    el.classList.remove("rotate");
    el.dataset.name = newRandomCards[index].name;
    el.classList.remove("clicked");
    setTimeout(() => {
      const front = el.querySelector(".front");
      front.src = newRandomCards[index].img;
    }, 500);
  });
}

refreshBtn.addEventListener("click", function () {
  reset();
});

helpBtn.addEventListener("click", function () {
  if (helper === 0) return;
  helper--;
  light.innerHTML = helper;
  isAnimating = true;
  const filteredCharacters = marvel_characters.filter(
    (character) => !character.name.includes("rotate")
  );
  const random =
    filteredCharacters[(Math.random() * filteredCharacters.length) | 0];
  const cards = document.querySelectorAll(".card");
  cards.forEach((el) => {
    if (random.name === el.dataset.name) {
      el.classList.add("help");
      setTimeout(() => {
        el.classList.remove("help");
      }, 3000);
    }
  });
  isAnimating = false;
});

generateCards();
chanses.innerHTML = chanse;
