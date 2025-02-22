let currentDialogue = 0;
let currentChar = 0;
let typingSpeed = 20;
let gameActive = false;
let isTyping = false;
let isTransitioning = false;

const dialogues = [
    "Hello Emmy! We meet again!!",
    "Has it really been a year since I last saw you?",
    "Maybe even two..",
    "Wow, time flies!",
    "Anywayssssss!!!!!!!!",
    "I'm here once again to give you a gift from Kamen!",
    "For Valentine's Day, of course!",
    "First of all, Happy Valentine's Day!",
    "Kamen wanted me to tell you something before I hand over the gift.",
    "He told me to tell you...",
    "..",
    "That he loves you so much! And he's so grateful to have you in his life! ❤️",
    "But I bet you already knew that! 😊",
    "Alright, alright..",
    "Let's get to the gift now, shall we?",
    "I hope you enjoy it!",
    "Here you go!",
    "....",
    "..",
    "Haha, gotcha! 😹",
    "You didn't think I'd give it that easily, right?",
    "No way! You know there's always a little challenge first!",
    "So here's the challenge!",
    "You're pretty familiar with this one!",
    "Wow! You did it!",
    "Now for your real surprise...",
    "Ready?",
    "Here it comes..."
];

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !gameActive && !isTyping && !isTransitioning) {
        advanceDialogue();
    }
});

document.getElementById('dialogue-box').addEventListener('click', function () {
    if (!gameActive && !isTyping && !isTransitioning) {
        advanceDialogue();
    }
});

function advanceDialogue() {
    if (currentDialogue < dialogues.length) {
        if (currentChar < dialogues[currentDialogue].length) {
            isTyping = true;
            document.getElementById('dialogue-text').innerText =
                dialogues[currentDialogue].substring(0, currentChar + 1);
            currentChar++;
            setTimeout(() => {

                advanceDialogue();

            }, typingSpeed);
        } else {

            isTyping = false;



            if (currentDialogue === 23) {

                isTransitioning = true;

                setTimeout(() => {

                    currentDialogue++;

                    currentChar = 0;

                    transitionToGame();

                }, 1000);

            } else {
                currentDialogue++;
                currentChar = 0;
                if (currentDialogue === dialogues.length) {
                    document.getElementById('letter-popup').classList.remove('hidden');
                    handleGifPlayback();
                }

            }

        }

    }

}


function transitionToGame() {

    const dialogueBox = document.getElementById('dialogue-box');

    const connectionsContainer = document.getElementById('connections-container');


    dialogueBox.classList.add('slide-down');


    setTimeout(() => {

        dialogueBox.style.display = 'none';

        dialogueBox.classList.remove('slide-down');



        setTimeout(() => {

            connectionsContainer.style.display = 'block';

            connectionsContainer.classList.add('fade-in-scale');


            setTimeout(() => {

                gameActive = true;

                isTransitioning = false;

                renderConnectionsGame();

            }, 1000);

        }, 500);

    }, 1000);

}


window.continueDialogue = function () {

    gameActive = false;

    isTransitioning = false;


    const dialogueBox = document.getElementById('dialogue-box');

    dialogueBox.style.display = 'block';

    dialogueBox.style.transform = 'none';

    dialogueBox.style.opacity = '1';



    const connectionsContainer = document.getElementById('connections-container');

    connectionsContainer.style.display = 'none';

    connectionsContainer.classList.remove('fade-in-scale');



    advanceDialogue();

};

function handleGifPlayback() {
    const gifImage = document.getElementById('letter-image-gif');
    const letterPopup = document.getElementById('letter-popup');
    const popupContent = letterPopup.querySelector('.popup-content');

    // Reset and play the GIF
    const currentSrc = gifImage.src;
    gifImage.src = '';
    gifImage.src = currentSrc + '?t=' + new Date().getTime();

    const gifDuration = 54000;

    setTimeout(() => {
        // Remove GIF and add envelope HTML
        gifImage.style.display = 'none';

        popupContent.innerHTML = `
            <div class="letter-transition">
                <div class="envlope-wrapper">
                    <div id="envelope" class="close">
                        <div class="wax-seal"></div>
                        <div class="front flap"></div>
                        <div class="front pocket"></div>
                        <div class="letter">
                            <div class="letter-corner corner-tl"></div>
                            <div class="letter-corner corner-br"></div>
                            <div class="message">
                                <p>I love you,</p>
                                <p>poopie emmy</p>
                            </div>
                        </div>
                        <div class="hearts">
                            <div class="heart a1"></div>
                            <div class="heart a2"></div>
                            <div class="heart a3"></div>
                        </div>
                        <div class="sparkles">
                            <div class="sparkle s1"></div>
                            <div class="sparkle s2"></div>
                            <div class="sparkle s3"></div>
                        </div>
                    </div>
                </div>
                <img src="letter.png" class="final-letter" style="display: none;">
            </div>
            <div class="reset">
                <button id="open">Open Envelope</button>
                <button id="reset">Close Envelope</button>
            </div>
            <button id="show-gifts" class="hidden">View Gifts</button>
            <div id="gift-gallery" class="hidden">
    <div class="gallery-container">
        <button class="arrow left-arrow">←</button>
        <div class="gallery-wrapper">
            <div class="gallery-slide">
                <h2 class="gift-title">Flower Bouquet</h2>
                <img src="gift1.jpg" alt="First Gift">
                <p class="gift-description">I couldn't get u flowers this year because u were in Pakistan, so I made a bouquet fully drawn by code XD</p>
                <div class="page-number">1/3</div>
            </div>
            <div class="gallery-slide">
                <h2 class="gift-title">Ohuhu markers!</h2>
                <img src="gift2.jpg" alt="Second Gift">
                <p class="gift-description">I know you've wanted these markers for like super long time to indulge in some coloring muhehehe. and I finally decided to get them for u (we gon color togehter) </p>
                <div class="page-number">2/3</div>
            </div>
            <div class="gallery-slide">
                <h2 class="gift-title">Sonny Angels</h2>
                <img src="gift3.jpg" alt="Third Gift">
                <p class="gift-description">I got you these Sonny Angels bc ik u wanted some and i know u love them (and i love u) so i got u some!! I got the Love series one for Valentine's day and I got u 3 of them just incase u get a poop one. I would have gotten u more but these were kinda pricy bc they're special limited ediiton or something</p>
                <div class="page-number">3/3</div>
            </div>
        </div>
        <button class="arrow right-arrow">→</button>
    </div>
</div>
        `;

        // Add envelope event handlers
        const envelope = document.getElementById('envelope');
        const btnOpen = document.getElementById('open');
        const btnReset = document.getElementById('reset');
        const showGiftsBtn = document.getElementById('show-gifts');
        const envelopeWrapper = document.querySelector('.envlope-wrapper');
        const finalLetter = document.querySelector('.final-letter');

        function openEnvelope() {
            envelope.classList.remove("close");
            envelope.classList.add("open");

            setTimeout(() => {
                envelopeWrapper.classList.add('envelope-fade-out');
                finalLetter.style.display = 'block';

                setTimeout(() => {
                    envelopeWrapper.style.display = 'none';
                    finalLetter.classList.add('show');
                }, 500);
            }, 2000);
        }

        function closeEnvelope() {
            finalLetter.classList.remove('show');
            setTimeout(() => {
                finalLetter.style.display = 'none';
                envelopeWrapper.style.display = 'block';
                void envelopeWrapper.offsetWidth;
                envelopeWrapper.classList.remove('envelope-fade-out');
                // Show the gifts button after envelope is closed
                showGiftsBtn.classList.remove('hidden');
            }, 500);

            envelope.classList.remove("open");
            envelope.classList.add("close");
        }

        envelope.addEventListener('click', openEnvelope);
        btnOpen.addEventListener('click', openEnvelope);
        btnReset.addEventListener('click', closeEnvelope);

        // Initialize gallery functionality
        initGallery();
    }, gifDuration);
}

function initGallery() {
    const gallery = document.getElementById('gift-gallery');
    const slides = document.querySelectorAll('.gallery-slide');
    const showGiftsBtn = document.getElementById('show-gifts');
    let currentSlide = 0;

    // Show the "View Gifts" button after envelope is closed
    document.getElementById('reset').addEventListener('click', () => {
        // Remove any existing show-gifts button first
        if (showGiftsBtn) {
            showGiftsBtn.remove();
        }

        // Create and add the button to popup-content
        const popupContent = document.querySelector('.popup-content');
        const newShowGiftsBtn = document.createElement('button');
        newShowGiftsBtn.id = 'show-gifts';
        newShowGiftsBtn.textContent = 'View Gifts';
        newShowGiftsBtn.classList.add('hidden');
        popupContent.appendChild(newShowGiftsBtn);

        // Show the button after a delay
        setTimeout(() => {
            newShowGiftsBtn.classList.remove('hidden');
        }, 500);

        // Add click event listener to the new button
        // Add click event listener to the new button
        newShowGiftsBtn.addEventListener('click', () => {
            const letterTransition = document.querySelector('.letter-transition');
            letterTransition.style.display = 'none';
            newShowGiftsBtn.style.display = 'none'; // Add this line to hide the button
            gallery.classList.remove('hidden');
            setTimeout(() => {
                gallery.classList.add('visible');
            }, 50);
        });
    });

    // Initialize slides position
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * index}%)`;
    });

    // Handle arrow clicks
    document.querySelector('.right-arrow').addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlides();
        }
    });

    document.querySelector('.left-arrow').addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    });

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        });
    }
}




advanceDialogue();
