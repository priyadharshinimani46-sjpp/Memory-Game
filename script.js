const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restart");

const emojis = ["🍎","🍌","🍇","🍓","🍒","🍍","🥝","🍉"];
let cards = [...emojis, ...emojis]; // duplicate for pairs
let flippedCards = [];
let matchedCount = 0;

// Shuffle cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create board
function createBoard() {
  gameBoard.innerHTML = "";
  matchedCount = 0;
  flippedCards = [];
  shuffle(cards).forEach(emoji => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = emoji;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${emoji}</div>
        <div class="card-back">?</div>
      </div>
    `;

    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

// Flip card logic
function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check match
function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    matchedCount += 2;
    flippedCards = [];
    if (matchedCount === cards.length) {
      setTimeout(() => alert("🎉 You Win!"), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

// Restart game
restartBtn.addEventListener("click", createBoard);

// Initialize
createBoard();
