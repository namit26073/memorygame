import { Deck } from "../common/createcards.js";
import createSet from "../common/createcards.js";
import R from "../common/ramda.js";

const findDuplicates = (array) =>
  array.filter(function (card, index) {
    return array.indexOf(card) !== index;
  });

describe("Ensuring deck is setup correctly", function () {
  it(`Given that a fresh deck is called;
   When the game starts;
   52 unique cards are created`, function () {
    const fulldeck = new Deck();
    const tempDeck = fulldeck;
    fulldeck.cards.forEach(function (card, index) {
      let count = 0;
      tempDeck.cards.forEach(function (cardCheck) {
        if (card === cardCheck) {
          count=count+1;
        }
      });
      if (count > 1) {
        throw new Error("there is a duplicate" + card);
      }
    });
  });

  it(`Given that a fresh deck is shuffled;
  When the deck is sorted;
  all the cards match the fresh deck`,
  function() {
    const fulldeck = new Deck();
    const tempDeck = [
      { suit: "spades", num: "ace" },
      { suit: "spades", num: "2" },
      { suit: "spades", num: "3" },
      { suit: "spades", num: "4" },
      { suit: "spades", num: "5" },
      { suit: "spades", num: "6" },
      { suit: "spades", num: "7" },
      { suit: "spades", num: "8" },
      { suit: "spades", num: "9" },
      { suit: "spades", num: "10" },
      { suit: "spades", num: "jack" },
      { suit: "spades", num: "queen" },
      { suit: "spades", num: "king" },
      { suit: "clubs", num: "ace" },
      { suit: "clubs", num: "2" },
      { suit: "clubs", num: "3" },
      { suit: "clubs", num: "4" },
      { suit: "clubs", num: "5" },
      { suit: "clubs", num: "6" },
      { suit: "clubs", num: "7" },
      { suit: "clubs", num: "8" },
      { suit: "clubs", num: "9" },
      { suit: "clubs", num: "10" },
      { suit: "clubs", num: "jack" },
      { suit: "clubs", num: "queen" },
      { suit: "clubs", num: "king" },
      { suit: "hearts", num: "ace" },
      { suit: "hearts", num: "2" },
      { suit: "hearts", num: "3" },
      { suit: "hearts", num: "4" },
      { suit: "hearts", num: "5" },
      { suit: "hearts", num: "6" },
      { suit: "hearts", num: "7" },
      { suit: "hearts", num: "8" },
      { suit: "hearts", num: "9" },
      { suit: "hearts", num: "10" },
      { suit: "hearts", num: "jack" },
      { suit: "hearts", num: "queen" },
      { suit: "hearts", num: "king" },
      { suit: "diamonds", num: "ace" },
      { suit: "diamonds", num: "2" },
      { suit: "diamonds", num: "3" },
      { suit: "diamonds", num: "4" },
      { suit: "diamonds", num: "5" },
      { suit: "diamonds", num: "6" },
      { suit: "diamonds", num: "7" },
      { suit: "diamonds", num: "8" },
      { suit: "diamonds", num: "9" },
      { suit: "diamonds", num: "10" },
      { suit: "diamonds", num: "jack" },
      { suit: "diamonds", num: "queen" },
      { suit: "diamonds", num: "king" }
    ];
    fulldeck.shuffle();
    fulldeck.cards.forEach(function(card){
      console.log(card);
      let count = 0;
      tempDeck.forEach(function(cardCheck){
        if ((card.suit === cardCheck.suit) && (card.num === cardCheck.num) ) {
          count = count+1;
        }
      });
      if(count !== 1){
        throw new Error("shuffled deck doesnt match initial deck");
      }
    });

  });

  it(`Given that a fresh deck is being shuffled;
   When the game is being setup;
   atleast half the cards get reassigned to a different`,
   function () {
    const fulldeck = new Deck();
    const tempDeck = [
      { suit: "spades", num: "ace" },
      { suit: "spades", num: "2" },
      { suit: "spades", num: "3" },
      { suit: "spades", num: "4" },
      { suit: "spades", num: "5" },
      { suit: "spades", num: "6" },
      { suit: "spades", num: "7" },
      { suit: "spades", num: "8" },
      { suit: "spades", num: "9" },
      { suit: "spades", num: "10" },
      { suit: "spades", num: "jack" },
      { suit: "spades", num: "queen" },
      { suit: "spades", num: "king" },
      { suit: "clubs", num: "ace" },
      { suit: "clubs", num: "2" },
      { suit: "clubs", num: "3" },
      { suit: "clubs", num: "4" },
      { suit: "clubs", num: "5" },
      { suit: "clubs", num: "6" },
      { suit: "clubs", num: "7" },
      { suit: "clubs", num: "8" },
      { suit: "clubs", num: "9" },
      { suit: "clubs", num: "10" },
      { suit: "clubs", num: "jack" },
      { suit: "clubs", num: "queen" },
      { suit: "clubs", num: "king" },
      { suit: "hearts", num: "ace" },
      { suit: "hearts", num: "2" },
      { suit: "hearts", num: "3" },
      { suit: "hearts", num: "4" },
      { suit: "hearts", num: "5" },
      { suit: "hearts", num: "6" },
      { suit: "hearts", num: "7" },
      { suit: "hearts", num: "8" },
      { suit: "hearts", num: "9" },
      { suit: "hearts", num: "10" },
      { suit: "hearts", num: "jack" },
      { suit: "hearts", num: "queen" },
      { suit: "hearts", num: "king" },
      { suit: "diamonds", num: "ace" },
      { suit: "diamonds", num: "2" },
      { suit: "diamonds", num: "3" },
      { suit: "diamonds", num: "4" },
      { suit: "diamonds", num: "5" },
      { suit: "diamonds", num: "6" },
      { suit: "diamonds", num: "7" },
      { suit: "diamonds", num: "8" },
      { suit: "diamonds", num: "9" },
      { suit: "diamonds", num: "10" },
      { suit: "diamonds", num: "jack" },
      { suit: "diamonds", num: "queen" },
      { suit: "diamonds", num: "king" }
    ];
    fulldeck.shuffle();
    let count = 0;
    fulldeck.cards.forEach(function(card, index){
      tempDeck.forEach(function(cardCheck, pointer){
        if (card === cardCheck) {
          if (index === pointer) {
            count=count+1;
          }
        }
      });
    });
    if (count > 26) {
      throw new Error("the cards have not been shuffled properly");
    }
  });
});

describe("Ensure cards being displayed are setup correctly", function () {
  it(`Given that a set of cards are made;
  When they are about to be displayed on the screen;
  ensure each card has a duplicate in the set;
  so pairs can be found`, 
  function () {
    const cardsOnDisplay = createSet();
    const duplicateCards = findDuplicates(cardsOnDisplay);
    if (duplicateCards.length !== 8) {
      throw new Error("there are not 4 duplicated cards");
    }
  });
  it(`Given that the class card is used;
   When the game is being setup;
   each card has both attributes: suit and num`, function () {
    const fulldeck = new Deck();
    fulldeck.cards.forEach(function(card){
      if (card.suit === null || card.num === null) {
        throw new Error("there are not 4 duplicated cards");
      }
    });
  });
});
