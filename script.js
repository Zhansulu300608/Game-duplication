const images = [
    'image.png', 'image copy.png', 'image copy 3.png', 'image copy 10.png',
    'image copy 5.png', 'image copy 6.png', 'image copy 7.png', 'image copy 8.png'
];
let cards = [...images, ...images];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    cards = shuffle(cards);
    matchedPairs = 0;
    flippedCards = [];
    
    cards.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);

        const img = document.createElement('img');
        img.classList.add('card-image');
        img.style.width = '80%';
        img.style.height = '90%';
        img.style.margin = 'auto';
        img.style.display = 'block';
        img.style.visibility = 'hidden';

        card.appendChild(img);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        const img = this.querySelector('img');
        img.src = this.dataset.image;
        img.style.visibility = 'visible';
        this.classList.add('flipped');
        flippedCards.push(this);
    }
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        
        if (matchedPairs === images.length) {
            setTimeout(() => {
                alert('You are winner!');
                createBoard();
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.querySelector('img').src = 'back.png';
            card2.querySelector('img').src = 'back.png';
            card1.querySelector('img').style.visibility = 'hidden';
            card2.querySelector('img').style.visibility = 'hidden';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 500);
    }
    flippedCards = [];
}

createBoard();
