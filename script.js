// Global variables
let startTime = 0; // Start time
let elapsedTime = 0; // Elapsed time
let timerInterval; // Timer variable
let cacanim = 3000;
let btanim = 9000;
let currentAnimation = "r";
let dopnumt = 2;
let dopnumb = 2;
let score = 0; // Initialize the score
let fi = 0;
let animation_cac = false
updatehighscore();
// localStorage.clear();
let timeIntervalObstacle = 5000;
let speedInterval, intervalObstacle, intervalB2, intervalB3, intervalT2, intervalT3;
// Function to update the timer on the screen
function updateTimer() {
    const currentTime = new Date().getTime();
    elapsedTime = (currentTime - startTime) / 1000; // in seconds
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = Math.floor(elapsedTime % 60);
    const milliseconds = Math.floor((elapsedTime % 1) * 100);
    if (seconds < 10) {
        var formattedTime = minutes + ':0' + seconds + '.' + milliseconds.toString();
    } else {
        var formattedTime = minutes + ':' + seconds + '.' + milliseconds.toString();
    }
    document.getElementById('score').textContent = 'score: ' + formattedTime;
    let scoredisplay = document.getElementById("scoredisplay").textContent = "your score:" + formattedTime;
    if (elapsedTime > 0) {
        // Check and update highscore
        if (!localStorage.getItem('highscore') || elapsedTime > parseFloat(localStorage.getItem('highscore'))) {
            localStorage.setItem('highscore', elapsedTime.toFixed(2));
        }
    }
    // Display the highscore
    updatehighscore();
    
}
function updatehighscore() {
const highscore = localStorage.getItem('highscore');
if (highscore) {
    const highscoreMinutes = Math.floor(highscore / 60);
    const highscoreSeconds = Math.floor(highscore % 60);
    const highscoreMilliseconds = Math.floor((highscore % 1) * 100);
    const highscoreFormattedTime = highscoreMinutes + ':' + (highscoreSeconds < 10 ? '0' : '') + highscoreSeconds + '.' + highscoreMilliseconds.toString();
    document.getElementById('highscore').textContent = 'highscore: ' + highscoreFormattedTime;
    document.getElementById("highscoredisplay").textContent = "your corrent highscore:" + highscoreFormattedTime;
}
}
// Function to start the timer
function startTimer() {
    if (!timerInterval) {
        startTime = new Date().getTime() - (elapsedTime * 1000);
        timerInterval = setInterval(updateTimer, 10);
    } else {
        // clearInterval(timerInterval);
        // timerInterval = null;
        elapsedTime = parseFloat(elapsedTime.toFixed(2)); // Update elapsed time
    }
}

// Function to create obstacles
function createObstacle() {
    const num = Math.floor(Math.random() * 9) + 1;
    console.log(num)
    if (num >= 5) {
        if (dopnumt === 2) {
            dopnumt = 3;
            t2.classList.add("t2");
            t2.classList.add("animation2-t2");
            t2.addEventListener("animationend", function () {
                t2.classList.remove("animation2-t2");
            });
        } else if (dopnumt === 3) {
            dopnumt = 2;
            t3.classList.add("t3");
            t3.classList.add("animation2-t3");
            t3.addEventListener("animationend", function () {
                t3.classList.remove("animation2-t3");
            });
        }
    } else if (num < 5) {
        if (dopnumb === 2) {
            dopnumb = 3;
            b2.classList.add("b2");
            b2.classList.add("animation2-b2");
            b2.addEventListener("animationend", function () {
                b2.classList.remove("animation2-b2");
            });
        } else if (dopnumb === 3) {
            dopnumb = 2;
            b3.classList.add("b3");
            b3.classList.add("animation2-b3");
            b3.addEventListener("animationend", function () {
                b3.classList.remove("animation2-b3");
            });
        }
    }
    increaseSpeed();
}

// Function to check collision with t2
function checkCollisionT2() {
    const rect1 = cac.getBoundingClientRect();
    const rect2 = t2.getBoundingClientRect();

    if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    ) {
        handleCollision();
    }
}

// Function to check collision with b2
function checkCollisionB2() {
    const rect1 = cac.getBoundingClientRect();
    const rect2 = b2.getBoundingClientRect();

    if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    ) {
        handleCollision();
    }
}

// Function to check collision with b3
function checkCollisionB3() {
    const rect1 = cac.getBoundingClientRect();
    const rect2 = b3.getBoundingClientRect();

    if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    ) {
        handleCollision();
    }
}

// Function to check collision with t3
function checkCollisionT3() {
    const rect1 = cac.getBoundingClientRect();
    const rect2 = t3.getBoundingClientRect();

    if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    ) {
        handleCollision();
    }
}

// Function to increase speed
function increaseSpeed() {
    if (timeIntervalObstacle > 700) {
        clearInterval(intervalObstacle);
        btanim -= 90;
        cacanim -= 30;
        timeIntervalObstacle -= 49;
        b2.style.animationDuration = btanim + "ms";
        b3.style.animationDuration = btanim + "ms";
        t2.style.animationDuration = btanim + "ms";
        t3.style.animationDuration = btanim + "ms";
        document.documentElement.style.setProperty("--animation-cac-speed", cacanim + "ms");
        intervalObstacle = setInterval(createObstacle, timeIntervalObstacle);
    }
}

// Function to handle collision
function handleCollision() {
    // Reset game state
    elapsedTime = 0;
    clearInterval(intervalObstacle);
    clearInterval(timerInterval);9
    clearInterval(speedInterval);
    clearInterval(intervalT2);
    clearInterval(intervalT3);
    clearInterval(intervalB2);
    clearInterval(intervalB3);
    timerInterval = null;
    currentAnimation = "r";
    animation_cac = false;
    cacanim = 30;
    btanim = 90;
    timeIntervalObstacle = 5000;
    setTimeout(function() {
        clearInterval(intervalObstacle);
        cac.classList.remove("animation-r", "animation-t", "animation-c")
    } , 1000)
    
    
    // Reset obstacles' positions and animations
    t2.style.marginLeft = "1600px";
    t3.style.marginLeft = "1600px";
    b2.style.marginLeft = "1600px";
    b3.style.marginLeft = "1600px";
    t2.classList.remove("t2", "animation2-t2");
    t3.classList.remove("t3", "animation2-t3");
    b2.classList.remove("b2", "animation2-b2");
    b3.classList.remove("b3", "animation2-b3");
    cac.classList.remove("animation-r", "animation-t", "animation-c")
    document.body.classList.remove("started");
    document.body.classList.add("replay");
    document.getElementById("playb").textContent = "play again";
    document.documentElement.style.setProperty("--animation-cac-speed", cacanim + "ms");
}
    

// Event listener for keyboard input
document.addEventListener("keydown", function (event) {
    if (animation_cac === true) {
        if (event.key === "w") {
            currentAnimation = "j";
            cac.classList.remove("animation-r", "animation-j", "animation-c");
            cac.classList.add("animation-" + currentAnimation);
        } else if (event.key === "s") {
            currentAnimation = "c";
            cac.classList.remove("animation-r", "animation-j", "animation-c");
            cac.classList.add("animation-" + currentAnimation);
        }
    }
});

// Reset animation when it ends
cac.addEventListener("animationend", function () {
    currentAnimation = "r";
    cac.classList.remove("animation-r", "animation-j", "animation-c");
    cac.classList.add("animation-" + currentAnimation);
});

// Function to start the game
function play() {
    cac.classList.add("animation-r");
    document.body.classList.add("started");
    setTimeout(function() {
        createObstacle();
    } , 5000)

    intervalB2 = setInterval(checkCollisionB2, 1);
    intervalB3 = setInterval(checkCollisionB3, 1);
    intervalT2 = setInterval(checkCollisionT2, 1);
    intervalT3 = setInterval(checkCollisionT3, 1);
    startTimer();
    updateTimer();
    animation_cac = true;
    document.documentElement.style.setProperty("--animation-cac-speed", cacanim + "ms");
}


// Event listener for the play button
document.getElementById("playb").addEventListener("click", play);
document.getElementById("playb").addEventListener("click", startTimer);
