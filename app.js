const partners = ["a", "b", "c"];
const numberOfCardsToMatch = 2;
let matchToCheck = [];
let matches = [];

const content = document.getElementById("content");

const createCards = (array, n) => {
  for (let i = 0; i < n; i++) {
    for (let element of array) {
      createOneCard(element);
    }
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
        }, 2000);
      }
    }
    if (isFinished(matches, partners)) {
      const playAgain = document.createElement("div");
      playAgain.innerHTML =
        '<a href="./parejas.html"><button id="button">Volver a jugar</button></a>';
      document.body.appendChild(playAgain);
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
    card.style.backgroundColor = "green";
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
  return matchedCards.length === partnersCards.length * 2;
};

createCards(partners, numberOfCardsToMatch);
