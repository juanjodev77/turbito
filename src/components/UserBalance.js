import React, { useState, useEffect } from 'react';
import './UserBalance.css';

const UserBalance = ({ balance, winnings }) => {
  const [displayBalance, setDisplayBalance] = useState(balance);
  const [showWinning, setShowWinning] = useState(false);

  useEffect(() => {
    if (winnings > 0) {
      setShowWinning(true);
      const timer = setTimeout(() => setShowWinning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [winnings]);

  return (
    <div className="user-balance">
      <div className="balance-card">
        <h3>Saldo Disponible</h3>
        <div className="balance-amount">S/ {balance.toLocaleString()}</div>
      </div>
      {showWinning && (
        <div className="winning-notification">
          <span>¡GANASTE S/ {winnings.toLocaleString()}!</span>
        </div>
      )}
    </div>
  );
};

export default UserBalance;
