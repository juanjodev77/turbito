import React from 'react';
import './GameStats.css';

const GameStats = ({ history }) => {
  return (
    <div className="game-stats">
      <h3>Histórico</h3>
      <div className="stats-list">
        {history.length === 0 ? (
          <div className="no-history">Sin histórico aún</div>
        ) : (
          history.map((stat, index) => (
            <div key={index} className={`stat-item ${stat.prize > 0 ? 'win' : ''}`}>
              <div className="stat-header">
                <span className="stat-matches">{stat.matches} aciertos</span>
                {stat.prize > 0 && <span className="stat-prize">+S/ {stat.prize}</span>}
              </div>
              <div className="stat-time">
                {new Date(stat.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameStats;
