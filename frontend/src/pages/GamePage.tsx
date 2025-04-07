import { useState } from 'react';
import GameBoard from '../components/GameBoard';

function GamePage() {
  // Track if the game has started
  const [started, setStarted] = useState(false);

  // Track selected difficulty (default to "easy")
  const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('easy');

  // If the game hasn't started yet, show the welcome screen
  if (!started) {
    return (
      <div className="text-center p-5">
        <h1>Word Guessing Game</h1>
        <p>
          Select a difficulty and start guessing letters to reveal the word!
        </p>

        {/* Dropdown to choose difficulty level */}
        <div className="mb-3">
          <label className="me-2">Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'easy' | 'hard')}
            className="form-select w-auto d-inline-block"
          >
            <option value="easy">Easy</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Button to start the game */}
        <button className="btn btn-primary" onClick={() => setStarted(true)}>
          Start Game
        </button>
      </div>
    );
  }

  // Once started, render the game board with the selected difficulty
  return <GameBoard difficulty={difficulty} />;
}

export default GamePage;
