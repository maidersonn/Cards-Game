const partners = [
  "florMorada.jpeg",
  "florMorada.jpeg",
  "florRosa.jpeg",
  "florRosa.jpeg",
  "girasol.jpg",
  "girasol.jpg",
  "amapola.jpg",
  "amapola.jpg",
  "florBrillo.jpeg",
  "florBrillo.jpeg",
  "florTropical.jpeg",
  "florTropical.jpeg",
];

const numberOfCardsToMatch = 2;
const content = document.getElementById("content");

let matchToCheck = [];
let matches = [];

const shuffle = (cards) => {
  const shuffled = [];
  const cardsLength = cards.length;
  for (let i = 0; i < cardsLength; i++) {
    const random = Math.floor(Math.random() * cards.length);
    shuffled.push(cards[random]);
    cards.splice(random, 1);
  }
  return shuffled;
};

const createCards = (array) => {
  for (let element of array) {
    createOneCard(element);
  }
};

const createOneCard = (element) => {
  const card = document.createElement("button");
  card.setAttribute("class", "card");
  card.setAttribute("value", element);
  content.appendChild(card);

  card.addEventListener("click", (event) => {
    card.style.backgroundImage = 'url("./images/' + element;

    card.disabled = true;

    matchToCheck.push(card);
    console.log(matchToCheck);

    if (matchToCheck.length === numberOfCardsToMatch) {
      if (isMatch(matchToCheck)) {
        success(matchToCheck);
        matchToCheck = [];
      } else {
        document.addEventListener("click", avoidClick, true);
        setTimeout(function () {
          document.removeEventListener("click", avoidClick, true);
          fail(matchToCheck);
          matchToCheck = [];
        }, 1000);
      }
    }
    if (isFinished(matches, lengthPartners)) {
      const playAgain = document.createElement("div");
      playAgain.innerHTML =
        '<a href="./partners.html"><button class="playAgain">Volver a jugar</button></a>';
      const modal = document.getElementById("myModal");
      modal.setAttribute("class", "modal");
      modal.appendChild(playAgain);
    }
  });
};

const isMatch = (cards) => {
  const card1 = cards[0].getAttribute("value");
  const card2 = cards[1].getAttribute("value");
  if (card1 === card2) {
    return true;
  } else {
    return false;
  }
};

const success = (cards) => {
  cards.forEach((card) => {
    card.classList.add("matched");
    matches.push(card);
  });
};

const fail = (cards) => {
  cards.forEach((card) => {
    card.style.backgroundImage = 'url("./images/reversoCarta.jpg")';
    card.removeAttribute("disabled");
  });
};

const avoidClick = (event) => {
  event.stopPropagation();
  event.preventDefault();
};

const isFinished = (matchedCards, partnersCardsLength) => {
  return matchedCards.length === partnersCardsLength;
};

const beginner = document.getElementById("beginner");
const medium = document.getElementById("medium");
const expert = document.getElementById("expert");
let lengthPartners = 0;

beginner.addEventListener("click", () => {
  const partnersBeginner = partners.slice(0, 6);
  const partnersShuffled = shuffle(partnersBeginner);
  createCards(partnersShuffled);
  lengthPartners = 6;
  const form = document.querySelector("#form");
  form.style.display = "none";
});

medium.addEventListener("click", () => {
  const partnersMedium = partners.slice(0, 8);
  const partnersShuffled = shuffle(partnersMedium);
  createCards(partnersShuffled);
  lengthPartners = 8;
  const form = document.querySelector("#form");
  form.style.display = "none";
});

expert.addEventListener("click", () => {
  const partnersShuffled = shuffle(partners);
  createCards(partnersShuffled);
  lengthPartners = 12;
  const form = document.querySelector("#form");
  form.style.display = "none";
});
