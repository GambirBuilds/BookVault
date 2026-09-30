export const literaryQuotes = [
  {
    id: 1,
    quote: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    author: "George R.R. Martin",
    work: "A Dance with Dragons"
  },
  {
    id: 2,
    quote: "There is no friend as loyal as a book.",
    author: "Ernest Hemingway",
    work: "Selected Letters"
  },
  {
    id: 3,
    quote: "Books are a uniquely portable magic.",
    author: "Stephen King",
    work: "On Writing: A Memoir of the Craft"
  },
  {
    id: 4,
    quote: "I cannot live without books.",
    author: "Thomas Jefferson",
    work: "Letter to John Adams (1815)"
  },
  {
    id: 5,
    quote: "The reading of all good books is like conversation with the finest minds of past centuries.",
    author: "René Descartes",
    work: "Discourse on the Method"
  },
  {
    id: 6,
    quote: "So many books, so little time.",
    author: "Frank Zappa",
    work: "Personal Motto"
  },
  {
    id: 7,
    quote: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss",
    work: "I Can Read With My Eyes Shut!"
  },
  {
    id: 8,
    quote: "It is what you read when you don't have to that determines what you will be when you can't help it.",
    author: "Oscar Wilde",
    work: "The Picture of Dorian Gray"
  }
];

export function getQuoteOfTheDay() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return literaryQuotes[dayOfYear % literaryQuotes.length];
}
