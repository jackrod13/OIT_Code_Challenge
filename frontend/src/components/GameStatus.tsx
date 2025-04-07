interface GameStatusProps {
    attemptsLeft: number;      
    gameOver: boolean;         
    word: string;             
    didWin: boolean;         
    onRestart: () => void;     // Function to reset the game
  }
  
  // Component that displays game status or win/loss message
  function GameStatus({ attemptsLeft, gameOver, word, didWin, onRestart }: GameStatusProps) {
    // If the game is still going, show attempts remaining
    if (!gameOver) return <p>Attempts remaining: {attemptsLeft}</p>;
  
    // If game is over, show win/loss message and the correct word
    return (
      <div>
        <h2>{didWin ? 'You Won!' : 'You Lost'}</h2>
        <p>The word was: <strong>{word || '(unknown)'}</strong></p>
  
        {/* Button to restart the game */}
        <button className="btn btn-success mt-2" onClick={onRestart}>
          Play Again
        </button>
      </div>
    );
  }
  
  export default GameStatus;
  