//Variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var gameStarted = false;

function playSound(color){
    var audio = new Audio("sounds/"+ color +".mp3");
    audio.play();
}

function animatePress(currentColour){
    //anim the button that was clicked
    $("#" + currentColour).fadeOut(100);
    setTimeout(function(){
        $("#" + currentColour).fadeIn(100);
    }, 100);    
}

function nextSequence(){
    //reset the userClickPattern array
    userClickPattern = [];

    //add a level
    level++;
    $("#level-title").text("Level " + level);

    //make a random number between 0 and 3, choosing said color, and adding it to the gamePattern array
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel){
    //checking if the most recent user answer is the same as the game pattern
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
        //check that player has finished their sequence
        if(userClickPattern.length === gamePattern.length){
            //call nextSequence() after a 1000 millisecond delay.
            setTimeout(function(){
                nextSequence();
            }, 1000);

            
        }
    } 
    else {
        playSound("wrong");

        //make the body flash red
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);

        //prompting user to restart
        $("#level-title").text("Game Over, Press Any Key to Restart");

        //reset the game
        startOver();
    }
}

//restart the game when any key is pressed
function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

//light up the button when mouse is hovered over it
for(var i = 0; i < buttonColours.length; i++){
    $("#" + buttonColours[i]).hover(
        function(){
        $(this).addClass("hovered");
    }, 
    function(){
        $(this).removeClass("hovered");
    }
);
}

//start the game when 'a' is pressed
$(document).keypress(function(){
    if(!gameStarted){
        gameStarted = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

//check if the button is clicked 
$(".btn").click(function(){
    //find the id of the button that was clicked and add it to the userClickPattern array
    var userChosenColor = this.id;
    userClickPattern.push(userChosenColor);
 
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickPattern.length - 1);
});




 
