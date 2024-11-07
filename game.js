//Variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];

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
    //make a random number between 0 and 3, choosing said color, and adding it to the gamePattern array
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
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

//check if the button is clicked 
$(".btn").click(function(){
    //find the id of the button that was clicked and add it to the userClickPattern array
    var userChosenColor = this.id;
    userClickPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
});




 
