import React from 'react';
import './AIPlayers.css';

const AIPlayers = ({ players }) => {
  return (
    <div className="ai-players">
      <h3>Jugadores IA</h3>
      <div className="players-list">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <div className="player-name">{player.name}</div>
            <div className="player-balance">S/ {player.balance.toLocaleString()}</div>
            {player.bets.length > 0 && (
              <div className="player-bet-info">
                <span className="bet-result">
                  {player.bets[0].matches} aciertos
                </span>
                {player.bets[0].prize > 0 && (
                  <span className="bet-win">+S/ {player.bets[0].prize}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIPlayers;
