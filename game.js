var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickPattern = [];
var gameLevel = -1;

function playSound(name) {
    var buttonSound = new Audio("./sounds/" + name + ".mp3");
    buttonSound.play();
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    var buttonID = "#" + randomChosenColor;

    gamePattern.push(randomChosenColor);
    $(buttonID).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed");
    setTimeout(function() {
        $(currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function(event) {
    var userChosenColor = $(event.target).attr("id");

    userClickPattern.push(userChosenColor);
    animatePress(event.target);
    playSound(userChosenColor);
    checkAnswer(gameLevel);
});

function startOver() {
    gameLevel = -1;
    userClickPattern = [];
    gamePattern = [];
}

if (gameLevel == -1) {
    $(document).keydown(function() {
        gameLevel = 0;
        $("h1").text("Level 0");
        nextSequence();
    });
}

function checkAnswer(currentLevel) {
    var userLatestClick = userClickPattern.length - 1

    if (userClickPattern[userLatestClick] == gamePattern[userLatestClick]) {
        
        if (userClickPattern.length == gamePattern.length) {

            setTimeout(nextSequence(), 10000);
            gameLevel++;
            $("h1").text("Level " + gameLevel);
            $("h1").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            userClickPattern = [];
            
        } 

    } else {

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        
    }
}

