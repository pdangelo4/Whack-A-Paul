var finalScore = 0;
var time, interval;
var values = document.getElementsByClassName('image');
var disappearTime = [500, 1000, 1500, 2000, 2500, 3000]
// document.getElementsByClassName('image').ondragstart = function() { return false; };

//On Mouse-Click Down, change the cursor to a down hammer
$("#html").mousedown(function () {
  $("#html").css("cursor", "url('hammer-removebg-preview_45x45_rotate.png'), auto");
  // document.getElementById('jab').play();
});
//On Mouse-Click Up/Release, change the cursor to an up hammer
$("#html").mouseup(function () {
  $("#html").css("cursor", "url('hammer-removebg-preview_45x45.png'), auto");
});

//Event Listener that is triggered on page load
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('reset').addEventListener('click', start); //Once Start button is clicked...
});

function start() {
  //Set your initial gameplay time
  time = 30;
  //Start Play Music
  document.getElementById('battle').play();
  //Hide the Start Button on play
  document.getElementById('reset').style.display = "none";
  document.getElementById('rules').style.display = "none";

  //Stop old timer
  clearInterval(interval);


  //start our timer
  interval = setInterval(tick, 1000);

  // set our image pop up and disappear interval
  interval2 = setInterval(imagePeep, 1000);

  $("#html").mousedown(function () {
    document.getElementById('jab').play();
  });
}



//Function to handle clicked images
document.addEventListener("click", handleClick);

function handleClick(click) { //Function for what to do on click
  console.log("clicking") //Does the click even work?
  const whatGotClicked = click.target; //Put what got clicked into a variable
  console.log(click.target.id); //test print what got clicked
  if (whatGotClicked.classList.contains("image") && whatGotClicked.classList.contains("open")) { //Make sure what got clicked is an image
    console.log("Image Switching")
    console.log($("#" + click.target.id))
    finalScore += 1; //add 1 to the score of what got clicked
    $('#finalScore').text("Score: " + finalScore);
    $("#" + click.target.id).removeClass('open'); //remove the class Open of what got clicked
    $("#" + click.target.id).addClass('closing');
    $("#" + click.target.id).attr("src", "bopFace_130x200-removebg-preview.png"); //change the image of what got clicked
    // $(this).slideToggle("fast", function () { //slide the image what got clicked

    // });
    $("#" + click.target.id).animate({ bottom: '0px' }, 'slow', function () { //animate what got clicked to disappear
      $("#" + click.target.id).attr("profilepicResized-removebg-preview.png"); 
      $("#" + click.target.id).removeClass('closing');

    });
  }
  else {
    console.log("Not an Image click")
  }
  // setInterval(imagePeep, 1000);
  

}



//Function to make images appear and disappear
function imagePeep() {
  var disappearPeep = disappearTime[Math.floor(Math.random() * values.length)];
  //First choose a random image to pop up
  var valueToUse = values[Math.floor(Math.random() * values.length)];//Randomly choose one image from array

  if (!$(valueToUse).hasClass("open") && !$(valueToUse).hasClass("closing")) { //If the image we are using does NOT have open class

    $(valueToUse).attr("src", "profilepicResized-removebg-preview.png"); //Make sure default image is set

    // $(valueToUse).slideToggle("slow", function () { //slides called image

    //            });
    $(valueToUse).addClass('open'); //add class open
    $(valueToUse).animate({ height: '145px' }, 'slow', function () { //open the image

    });
    setTimeout(function () {
      let temp = valueToUse
      $(temp).animate({ height: '0px' }, 'slow', function () { //animate what got clicked to disappear
        $(temp).removeClass('open'); //remove the class Open of what got clicked

      });
    }, disappearPeep)
  }


}



function tick() {
  time -= 1;
  console.log(time);
  document.getElementById('timer').textContent = time;
  if (time === 19) {
    document.getElementById('timer').style.color = 'goldenrod';

  }
  else if (time === 9) {
    document.getElementById('timer').style.color = 'crimson';
  }
  else if (time === 3) {
    document.getElementById('timer').style.color = 'purple';
  }
  else if (time <= 0) {

    endGame();
  }
}

function endGame() {
  // Stop the timer
  clearInterval(interval);
  clearInterval(interval2);
  // Turn off battle
  document.getElementById('battle').pause();
  
  
  var button = document.createElement("button");
  button.innerHTML = "Play Again?";
  // ​
  // 2. Append somewhere
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(button);
  // ​
  // 3. Add event handler
  button.addEventListener ("click", function() {
      location.reload();
  });
  if (finalScore >= 15) {
    document.getElementById('timer').innerHTML = "You Win!!";
    // Play victory music
  document.getElementById('victory').play();
  }
  else {
    document.getElementById('timer').innerHTML = "You Lose!!";
    // Play victory music
  document.getElementById('defeat').play();
  }
}


