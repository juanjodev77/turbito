import React from 'react';
import './GameBoard.css';

const GameBoard = ({
  selectedNumbers,
  toggleNumber,
  placeBet,
  clearSelection,
  autoSelect,
  betAmount,
  setBetAmount,
  selectedCount,
}) => {
  return (
    <div className="game-board">
      <div className="numbers-grid">
        {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={`number-btn ${selectedNumbers.includes(num) ? 'selected' : ''}`}
            onClick={() => toggleNumber(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="bet-controls">
        <div className="selection-info">
          <span className="counter">{selectedCount}/12 seleccionados</span>
        </div>

        <div className="bet-amount-control">
          <label htmlFor="bet-amount">Monto de Apuesta:</label>
          <div className="bet-input-group">
            <button className="bet-quick-btn" onClick={() => setBetAmount(Math.max(10, betAmount - 50))}>-</button>
            <input
              id="bet-amount"
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Math.max(10, parseInt(e.target.value) || 0))}
              min="10"
              max="10000"
            />
            <button className="bet-quick-btn" onClick={() => setBetAmount(betAmount + 50)}>+</button>
          </div>
          <span className="bet-label">S/ {betAmount}</span>
        </div>

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={placeBet} disabled={selectedCount !== 12}>
            APOSTAR
          </button>
          <button className="btn btn-secondary" onClick={autoSelect}>
            AUTO
          </button>
          <button className="btn btn-danger" onClick={clearSelection}>
            LIMPIAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
