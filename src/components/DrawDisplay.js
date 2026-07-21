import React from 'react';
import './DrawDisplay.css';

const DrawDisplay = ({ drawnNumbers, nextDrawTime, formatTime }) => {
  return (
    <div className="draw-display">
      <div className="draw-header">
        <h2>Último Sorteo</h2>
        <div className="timer">
          <span className="timer-label">Próximo en:</span>
          <span className="timer-value">{formatTime(nextDrawTime)}</span>
        </div>
      </div>

      {drawnNumbers.length > 0 ? (
        <div className="drawn-numbers">
          {drawnNumbers.map((num) => (
            <div key={num} className="drawn-number">
              {num}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-draw">
          <p>Esperando primer sorteo...</p>
        </div>
      )}
    </div>
  );
};

export default DrawDisplay;
