// Meow 😼

const cats = [
    './images/cat1.jpg', './images/cat1.jpg',
    './images/cat7.jpg', './images/cat7.jpg',
    './images/cat2.jpg', './images/cat2.jpg',
    './images/cat3.jpg', './images/cat3.jpg',
    './images/cat4.jpg', './images/cat4.jpg',
    './images/cat5.jpg', './images/cat5.jpg',
    './images/cat8.jpg', './images/cat8.jpg',
    './images/catshekh.jpg', './images/catshekh.jpg',
];

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function createCards(shuffledCats, gameContainer) {
    const cards = [];
    shuffledCats.forEach((catSrc, index) => {
        const box = document.createElement('div');
        box.className = 'item';

        const img = document.createElement('img');
        img.src = catSrc;
        img.alt = `صورة قطة ${Math.floor(index / 2) + 1}`;

        box.appendChild(img);
        gameContainer.appendChild(box);
        cards.push(box);
    });
    return cards;
}

function addCardClickHandlers(cards, correctSound, wrongSound, openedCards, isProcessing) {
    cards.forEach((box) => {
        box.addEventListener('click', function () {
            if (isProcessing.value || box.classList.contains('boxOpen') || box.classList.contains('boxMatch')) {
                return;
            }

            box.classList.add('boxOpen');
            openedCards.push(box);

            if (openedCards.length === 2) {
                isProcessing.value = true;
                const [firstCard, secondCard] = openedCards;
                const firstImg = firstCard.querySelector('img').src;
                const secondImg = secondCard.querySelector('img').src;

                if (firstImg === secondImg) {
                    firstCard.classList.add('boxMatch');
                    secondCard.classList.add('boxMatch');
                    correctSound.play();
                    openedCards.length = 0;
                    isProcessing.value = false;

                    if (document.querySelectorAll('.boxMatch').length === cats.length) {
                        setTimeout(() => {
                            const winMessage = document.querySelector('.win-message');
                            if (winMessage) {
                                winMessage.style.display = 'block';
                            } else {
                                console.error('عنصر .win-message غير موجود في الـ HTML');
                            }
                        }, 500);
                    }
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove('boxOpen');
                        secondCard.classList.remove('boxOpen');
                        wrongSound.play();
                        openedCards.length = 0;
                        isProcessing.value = false;
                    }, 1000);
                }
            }
        });
    });
}

function setupGame() {
    const shuffledCats = shuffleArray([...cats]);
    const gameContainer = document.querySelector('.game');
    const correctSound = new Audio('./images/correct-6033.mp3');
    const wrongSound = new Audio('./images/wronganswer-37702.mp3');
    const openedCards = [];
    const isProcessing = { value: false };

    if (!gameContainer) {
        console.error('عنصر .game غير موجود في الـ HTML');
        return;
    }

    gameContainer.innerHTML = '';

    const cards = createCards(shuffledCats, gameContainer);
    addCardClickHandlers(cards, correctSound, wrongSound, openedCards, isProcessing);
}

function setupResetButton() {
    const resetButton = document.querySelector('.reset');
    const playAgainButton = document.querySelector('.play-again');
    const gameContainer = document.querySelector('.game');
    const winMessage = document.querySelector('.win-message');

    if (resetButton) {
        resetButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (gameContainer && winMessage) {
                gameContainer.innerHTML = '';
                winMessage.classList.remove ('d-none');
                setupGame();
            }
        });
    }

    if (playAgainButton) {
        playAgainButton.addEventListener('click', function () {
            if (gameContainer && winMessage) {
                gameContainer.innerHTML = '';
                winMessage.style.display = 'none';
                setupGame();
            }
        });
    } else {
        console.error('عنصر .play-again غير موجود في الـ HTML');
    }
}

// Lets play 😼😒
window.addEventListener('load', function () {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        const title = document.querySelector('.title');
        const reset = document.querySelector('.reset');

        if (loader) loader.style.display = 'none';
        else console.error('عنصر .loader غير موجود في الـ HTML');
        if (title) title.classList.remove('d-none');
        else console.error('عنصر .title غير موجود في الـ HTML');
        if (reset) reset.classList.remove('d-none');
        else console.error('عنصر .reset غير موجود في الـ HTML');

        setupGame();
        setupResetButton();
    }, 2000);
});
