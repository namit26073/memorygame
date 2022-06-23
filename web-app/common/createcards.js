/**
 * createcards is a library created which allows for me to create a deck of cards and then manipulate them in the ways shows below
 * @namespace createcards
 * @author Namit Garg
 * @version 2021/22
 */

/**
 *array of all suits in a deck
 *@memberof createcards
 * @param {Array} suits
 */
const suits = ["spades", "clubs", "hearts", "diamonds"];

/**
 *array of all values in a deck
 *@memberof createcards
 * @param {Array} nums
 */
const nums = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king"
];

/**
 *initialises empty array which is later used to fill with
 *set of cards that will be displayed
 *@memberof createcards
 * @param {Array} displayedCards
 */

let displayedCards = new Array(8).fill();

/** Class representing a deck. */
export class Deck {
  /**
   * make all the cards and assign them to class.
   * @param {object} cards assigns all cards to attribute of deck
   */
  constructor(cards = allCards()) {
    this.cards = cards;
  }

  /**
   * Tells us how many cards are currently in the deck
   * @return {number} returns number of cards in deck
   */
  get numberofcards() {
    return this.cards.length;
  }

  /**
   * shuffles deck
   */
  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }
}

/** Class representing each card. */
class card {
  /**
   * make a card, each with a suit and number
   * @param {string} suit gives each card a suit
   * @param {string} num gives each card a number
   */
  constructor(suit, number) {
    this.suit = suit; //the attributes needed for cards
    this.num = number;
  }
}

/**
 *assigns each number a suit so each card in a deck is returned
 *@memberof createcards
 *@function
 * @returns {Object} Returns every card as an object of class card
 */
function allCards() {
  return suits.flatMap((suit) => {
    //for each suit
    return nums.map((num) => {
      //it assigns a number
      return new card(suit, num); //so we get all the cards
    });
  });
}

/**
 *takes input array and uses random function to
 *swap card with another random card in the deck
 *@memberof createcards
 *@function
 * @param {Array} orderedArray array of all the cards
 * @returns {Array} the randomized array
 */
export function randomize(orderedArray) {
  orderedArray.sort(() => Math.random() - 0.5);
  return orderedArray;
}

/**
 *creates a set of 8 which are then duplicated and then shuffled once more
 * so each card has a pair
 *@memberof createcards
 *@function createSet
 * @returns {Array} the randomized set of cards
 */

export default function createSet() {
  let tempDeck = new Deck();
  tempDeck.shuffle();
  displayedCards.forEach((currentcard, pointer) => {
    displayedCards[pointer] = tempDeck.cards[pointer];
  });
  let doubledCards = displayedCards.concat(displayedCards);
  const randomArray = randomize(doubledCards);
  return randomArray;
}
