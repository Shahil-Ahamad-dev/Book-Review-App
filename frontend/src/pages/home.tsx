import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AppShell } from "../components/app-shell";
import { UserListBooks } from "../components/book/list-book";
const quotes = [
  "That's the thing about books. They let you travel without moving your feet. – Jhumpa Lahiri, The Namesake",
  "It is our choices, Harry, that show what we truly are, far more than our abilities. – J.K. Rowling, Harry Potter ",
  "There is some good in this world, and it's worth fighting for. – J.R.R. Tolkien, The Two Towers",
  "The only way to get rid of a temptation is to yield to it. – Oscar Wilde, The Picture of Dorian Gray",
  "It was the best of times, it was the worst of times. – Charles Dickens, A Tale of Two Cities",
  "All we have to decide is what to do with the time that is given us. – J.R.R. Tolkien, The Fellowship of the Ring",
  "And, when you want something, all the universe conspires in helping you to achieve it. – Paulo Coelho, The Alchemist",
  "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt, Looking Forward",
  "Not all those who wander are lost. – J.R.R. Tolkien, The Fellowship of the Ring",
  "It does not do to dwell on dreams and forget to live. – J.K. Rowling, Harry Potter and the Philosopher's Stone",
  "In the end, we only regret the chances we didn't take. – Lewis Carroll, Alice's Adventures in Wonderland",
  "We accept the love we think we deserve. – Stephen Chbosky, The Perks of Being a Wallflower",
  "So we beat on, boats against the current, borne back ceaselessly into the past. – F. Scott Fitzgerald, The Great Gatsby",
  "It is only with the heart that one can see rightly; what is essential is invisible to the eye. – Antoine de Saint-Exupéry, The Little Prince",
  "The world breaks everyone, and afterward, many are strong at the broken places. – Ernest Hemingway, A Farewell to Arms",
  "The only thing you can do is find a place to trust and take a leap. – Mitch Albom, Tuesdays with Morrie",
  "You never really understand a person until you consider things from his point of view. – Harper Lee, To Kill a Mockingbird",
  "There is no greater agony than bearing an untold story inside you. – Maya Angelou, I Know Why the Caged Bird Sings",
  "Who, being loved, is poor? – Oscar Wilde, A Woman of No Importance",
  "Whatever our souls are made of, his and mine are the same. – Emily Brontë, Wuthering Heights",
];

export function HomePage() {
  const [currentQuote, setCurrentQuote] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const quote = quotes[quoteIndex];
    let timeoutId: number | undefined;

    if (isTyping) {
      let charIndex = 0;
      setCurrentQuote("");

      const typeNextChar = () => {
        if (charIndex < quote.length) {
          setCurrentQuote(quote.substring(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(typeNextChar, 50);
        } else {
          setIsTyping(false);
        }
      };

      timeoutId = setTimeout(typeNextChar, 50);
    } else {
      // Wait for 5 seconds before starting to type the next quote
      timeoutId = setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setIsTyping(true);
      }, 60000);
    }
    //SA
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [quoteIndex, isTyping]);

  return (
    <AppShell>
      <div className="relative w-full max-w-2xl mx-auto mt-0 pt-0 px-6">
        <div className="min-h-[6rem] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-amber-900 mb-8">
              Welcome to Book Review App
            </h1>
            <p
              className="text-2xl font-medium text-amber-700 text-center relative"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <b>"</b>
              {currentQuote}
              <b>"</b>
              <span
                className={`inline-block w-0.5 h-6 ml-1 bg-amber-700 ${
                  isTyping ? "animate-pulse" : "opacity-0"
                }`}
              ></span>
            </p>
          </div>
        </div>
      </div>

      <UserListBooks />

      <Toaster />
    </AppShell>
  );
}

export default HomePage;
