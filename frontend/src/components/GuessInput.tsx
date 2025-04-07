import { useState } from 'react';

// Props passed down from GameBoard
interface GuessInputProps {
  onGuess: (letter: string) => void;     // Function to call when a valid guess is made
  guessedLetters: string[];              // List of already guessed letters
  disabled: boolean;                     // Whether input should be disabled (e.g., after game ends)
}

function GuessInput({ onGuess, guessedLetters, disabled }: GuessInputProps) {
  // Local state to track current input value
  const [input, setInput] = useState('');

  // Handle form submission when user presses Enter or clicks "Guess"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const letter = input.toLowerCase();

    // Validate that the input is a single alphabetical character
    if (letter.length !== 1 || !/^[a-z]$/.test(letter)) return;

    // Prevent duplicate guesses
    if (guessedLetters.includes(letter)) return;

    // Call the onGuess function passed from the parent
    onGuess(letter);
    setInput(''); // Clear the input after guess
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input for entering a single letter */}
      <input
        type="text"
        maxLength={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        placeholder="Enter a letter"
        className="form-control mb-2"
      />

      {/* Submit button for guessing */}
      <button type="submit" className="btn btn-primary" disabled={disabled}>
        Guess
      </button>
    </form>
  );
}

export default GuessInput;
