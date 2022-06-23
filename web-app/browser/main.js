// import R from "./common/ramda.js";
// import Json_rpc from "./Json_rpc.js";
import createSet from "../common/createcards.js";

//allows for editing html document
const section = document.querySelector("section");
let p1LivesCount = document.querySelector("span");
let p2LivesCount = document.querySelector("selector");
let p1ScoreCount = document.querySelector("scoreCount1");
let p2ScoreCount = document.querySelector("scoreCount2");

//initialises players lifes and scores
let p1Lives = 6;
let p2Lives = 6;
let p1Score = 0;
let p2Score = 0;

//shows remaining lives and current score
p1LivesCount.textContent = p1Lives;
p2LivesCount.textContent = p2Lives;
p1ScoreCount.textContent = p1Score;
p2ScoreCount.textContent = p2Score;

//allows us to get our images of cards
function getImage(card) {
  const imgSrc = "./pictures/" + card.num + "_of_" + card.suit + ".png";
  return imgSrc;
}

function restart(text) {//restarts game when game over
  let cardData = createSet();//get all the cards that will be displayed
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  cardData.forEach(function (item, index) {// resets all attributes of cards
    cards[index].classList.remove("toggleCard");
    cards[index].style.pointerEvents = "all";
    faces[index].src = getImage(item);
    cards[index].setAttribute("num", item.num);
    cards[index].setAttribute("suit", item.suit);
  });
  setTimeout(() => window.alert(text), 100);//waits so proccesing can occur
  p1Lives = 6;
  p2Lives = 6;
  p1LivesCount.textContent = p1Lives;
  p2LivesCount.textContent = p2Lives;
  p1Score = 0;
  p2Score = 0;
  p1ScoreCount.textContent = p1Score;
  p2ScoreCount.textContent = p2Score;
}



function cardGenerator(){
  let noOfTurns = 0;
  const cardArray = createSet();
  cardArray.forEach(function (item, index) {//creates html documentation
    const card = document.createElement("div");// for each card
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    face.src = getImage(item);//gets image source for each image
    card.setAttribute("num", item.num);//assigns cards number attribute
    card.setAttribute("suit", item.suit);

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", function(e){
      noOfTurns= noOfTurns+1;//keeps track of which players turn it is
      card.classList.toggle("toggleCard");
      checkCards(e, noOfTurns);
    });
  });
}

function checkCards(e, noOfTurns) {//check for various conditions
  const clickedCard = e.target;//if card is clicked
  clickedCard.classList.add("flipped");//adds flipped to card so can keep track
  const flippedCards = document.querySelectorAll(".flipped");//of flipped cards

  if (flippedCards.length === 2) {//once 2 cads have been flipped
    if (
      flippedCards[0].getAttribute("num") ===//if cards match
        flippedCards[1].getAttribute("num") &&
      flippedCards[0].getAttribute("suit") ===
        flippedCards[1].getAttribute("suit")
    ) {
      flippedCards.forEach(function (card) {
        card.classList.remove("flipped");//stop them from flipping back
        card.getElementsByClassName.pointerEvents = "none";
      });
      if (noOfTurns % 4 >= 2) {//if it was player 1s turn
        if (p1Lives !== 0) {//if player one still has lives remaining
          p1Score = p1Score + 5;//increase player1s score
          p1ScoreCount.textContent = p1Score;//display the score
        } else {
          p2Score = p2Score + 5;//otherwise increase p2s score
          p2ScoreCount.textContent = p2Score;
        }
      } else {//do the same for player 2s turn
        if (p2Lives !== 0) {
          p2Score = p2Score + 5;
          p2ScoreCount.textContent = p2Score;
        } else {
          p1Score = p1Score + 5;
          p1ScoreCount.textContent = p1Score;
        }
      }
    } else {//if the cards dont match
      flippedCards.forEach(function (card) {
        card.classList.remove("flipped");//flip them back
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });//take time to flip back
      if (noOfTurns % 4 >= 2) {//if it is player1s turn
        if (p1Lives !== 0) {//and p1 has lives
          p1Lives = p1Lives - 1;//decrement p1s lives
          p1LivesCount.textContent = p1Lives;//update lives on screen
        } else {//if p1 has no more lives
          p2Lives = p2Lives - 1;//decrease p2s lives
          p2LivesCount.textContent = p2Lives;//update screen
        }
      } else {//repeat for p2s turn
        if (p2Lives !== 0) {
          p2Lives = p2Lives - 1;
          p2LivesCount.textContent = p2Lives;
        } else {
          p1Lives = p2Lives - 1;
          p1LivesCount.textContent = p1Lives;
        }
      }
      if (p1Lives === 0) {
        if (p2Lives === 0) {//once both players have no more lives
          if (p1Score > p2Score) {//whoever has a higher score wins
            restart("Game Over,Player 1 Won!!!");
          } else {
            if (p2Score > p1Score) {
              restart("Game Over,Player 2 Won!!!");
            } else {//if both players get same score
              restart("Game Over, Both Players Earned Same Points!!!");
            }
          }
        }
      }
    }
  }
}



cardGenerator();
