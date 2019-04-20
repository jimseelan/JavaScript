
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
level = 0;

$(document).on("keypress", function () {
    $("body").removeClass("game-over");
    if (level === 0) {
        nextSequence();
    }

});

$("[type|='button']").on("click", function (e) {
    userChosenColour = e.target.id;
    //console.log("userChosenColour = "+userChosenColour);
    userClickedPattern.push(userChosenColour);
    //console.log("userClickedPattern = "+userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //console.log(userClickedPattern.length + "<user   game>" + gamePattern.length);
    checkAnswer(userClickedPattern.length - 1);
});



function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor((Math.random()) * (3 - 0 + 1)) + 0;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //console.log("gamePattern is "+gamePattern);

    //$("#" + randomChosenColour).fadeOut(300).fadeIn(300);
    setTimeout(function () {
        animatePress(randomChosenColour)
        playSound(randomChosenColour);
        console.log("system pressed " + randomChosenColour);
    }, 1000);

    userClickedPattern = [];
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("*").removeClass("pressed")
    }, 200);
}

function checkAnswer(currentLevel) {
    console.log("User[" + userClickedPattern + "]\nGame[" + gamePattern + "]")

    if (userChosenColour !== gamePattern[currentLevel]) {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () { $("body").removeClass("game-over") }, 300)
        $("h1").html("Game Over!<br>Press any key to restart");
        startOver();

    } else {
        console.log("Right");
        console.log(userClickedPattern.length + "<user   game>" + gamePattern.length);
        if (userClickedPattern.length === gamePattern.length) {
            nextSequence();
        }
    }

}

function startOver() {
    level=0;
gamePattern=[];
}