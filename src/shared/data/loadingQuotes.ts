export interface LoadingQuote {
  quote: string;
  author: string;
}

export const LOADING_QUOTES: LoadingQuote[] = [
  {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs'
  },
  {
    quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill'
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: 'Theodore Roosevelt'
  },
  {
    quote: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt'
  },
  {
    quote: 'It does not matter how slowly you go as long as you do not stop.',
    author: 'Confucius'
  }
];

export const getRandomQuote = (): LoadingQuote => {
  const randomIndex = Math.floor(Math.random() * LOADING_QUOTES.length);
  return LOADING_QUOTES[randomIndex];
};
