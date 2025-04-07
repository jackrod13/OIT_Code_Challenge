import { useEffect, useState } from 'react';
import { fetchRandomWord } from '../api/WordApi';
import { WordResponse } from '../types/Word';
import GuessInput from './GuessInput';
import GameStatus from './GameStatus';

interface GameBoardProps {
  difficulty: 'easy' | 'hard';
}

function GameBoard({ difficulty }: GameBoardProps) {
  // The actual word to guess
  const [word, setWord] = useState('');
  // The masked version of the word (e.g., "_ _ _ _")
  const [maskedWord, setMaskedWord] = useState<string[]>([]);
  // Letters the player has already guessed
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  // Number of remaining incorrect attempts
  const [attemptsLeft, setAttemptsLeft] = useState(7);
  // Game status flags
  const [gameOver, setGameOver] = useState(false);
  const [didWin, setDidWin] = useState(false);
  // Loading flag for word fetching
  const [loading, setLoading] = useState(true);
  // Tracks if the player has used their hint
  const [hintUsed, setHintUsed] = useState(false);

  // Fetch a new word and reset game state
  const loadWord = async () => {
    setLoading(true);
    try {
      const data: WordResponse = await fetchRandomWord(difficulty);
      setWord(data.word.toLowerCase()); // store word in lowercase for easy matching
      setMaskedWord(Array(data.word.length).fill('_')); // create blanks
      setGuessedLetters([]);
      setAttemptsLeft(7);
      setGameOver(false);
      setDidWin(false);
      setHintUsed(false);
    } catch (err) {
      console.error('Error loading word:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load the word when the component first mounts
  useEffect(() => {
    loadWord();
  }, []);

  // Handle a player's letter guess
  const handleGuess = (letter: string) => {
    if (gameOver || guessedLetters.includes(letter)) return;

    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);

    // Correct guess
    if (word.includes(letter)) {
      const newMasked = maskedWord.map((char, i) =>
        word[i] === letter ? letter : char
      );
      setMaskedWord(newMasked);

      // Win condition: no more blanks
      if (!newMasked.includes('_')) {
        setGameOver(true);
        setDidWin(true);
      }
    }
    // Incorrect guess
    else {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);

      // Loss condition: out of attempts
      if (newAttempts <= 0) {
        setGameOver(true);
        setDidWin(false);
      }
    }
  };

  // Handle using a hint (reveals one letter)
  const handleHint = () => {
    if (hintUsed || gameOver) return;

    // Get indexes of all unrevealed characters
    const hiddenIndexes = maskedWord
      .map((char, i) => (char === '_' ? i : null))
      .filter((i) => i !== null) as number[];

    if (hiddenIndexes.length === 0) return;

    // Pick a random unrevealed character and reveal it
    const randomIndex =
      hiddenIndexes[Math.floor(Math.random() * hiddenIndexes.length)];
    const letterToReveal = word[randomIndex];

    handleGuess(letterToReveal);
    setHintUsed(true);
  };

  // Show loading message while fetching word
  if (loading) return <p>Loading word...</p>;

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="card-title">Guess the Word</h2>
      <div className="card-body">
        {/* Display current word state */}
        <p className="fs-3 mb-3">{maskedWord.join(' ')}</p>

        {/* Input field for guessing letters */}
        <GuessInput
          onGuess={handleGuess}
          guessedLetters={guessedLetters}
          disabled={gameOver}
        />

        {/* Hint button (only usable once) */}
        {!gameOver && !hintUsed && (
          <button className="btn btn-warning mt-2" onClick={handleHint}>
            Use Hint
          </button>
        )}
        {hintUsed && !gameOver && <p className="text-muted mt-2">Hint used!</p>}

        {/* Game status message + restart button */}
        <GameStatus
          attemptsLeft={attemptsLeft}
          gameOver={gameOver}
          word={word}
          didWin={didWin}
          onRestart={loadWord}
        />

        {/* Show guessed letters if game is still active */}
        {!gameOver && (
          <p className="mt-3">
            Guessed Letters:{' '}
            <strong>{guessedLetters.join(', ') || '(none)'}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default GameBoard;
