const partners = ["A", "B", "C", "A", "B", "C"];
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

const partnersShuffled = shuffle(partners);

const createCards = (array) => {
  for (let element of array) {
    createOneCard(element);
  }
};

const createOneCard = (element) => {
  const card = document.createElement("button");
  card.setAttribute("class", "card");
  card.innerHTML = "*";
  content.appendChild(card);
  card.addEventListener("click", (event) => {
    card.innerHTML = element;
    card.disabled = true;

    matchToCheck.push(card);

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
    if (isFinished(matches, partnersShuffled)) {
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
  const card1 = cards[0].innerHTML;
  const card2 = cards[1].innerHTML;
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
    card.innerHTML = "*";
    card.removeAttribute("disabled");
  });
};

const avoidClick = (event) => {
  event.stopPropagation();
  event.preventDefault();
};

const isFinished = (matchedCards, partnersCards) => {
  return matchedCards.length === partnersCards.length;
};

createCards(partnersShuffled);
