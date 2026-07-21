import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import DrawDisplay from './components/DrawDisplay';
import AIPlayers from './components/AIPlayers';
import UserBalance from './components/UserBalance';
import GameStats from './components/GameStats';

const App = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [userBalance, setUserBalance] = useState(10000);
  const [betAmount, setBetAmount] = useState(100);
  const [gameStarted, setGameStarted] = useState(false);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [nextDrawTime, setNextDrawTime] = useState(0);
  const [aiPlayers, setAIPlayers] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [userBets, setUserBets] = useState([]);
  const [winnings, setWinnings] = useState(0);

  // Inicializar jugadores IA
  useEffect(() => {
    const players = [
      { id: 1, name: 'IA - Player 1', balance: 50000, bets: [] },
      { id: 2, name: 'IA - Player 2', balance: 50000, bets: [] },
      { id: 3, name: 'IA - Player 3', balance: 50000, bets: [] },
      { id: 4, name: 'IA - Player 4', balance: 50000, bets: [] },
    ];
    setAIPlayers(players);
    setGameStarted(true);
    setNextDrawTime(300); // 5 minutos
  }, []);

  // Timer para el sorteo
  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setNextDrawTime((prev) => {
        if (prev <= 1) {
          performDraw();
          return 300; // Reiniciar a 5 minutos
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, userBets, aiPlayers]);

  const performDraw = () => {
    // Sortear 12 números de 24
    const drawn = [];
    while (drawn.length < 12) {
      const num = Math.floor(Math.random() * 24) + 1;
      if (!drawn.includes(num)) drawn.push(num);
    }
    drawn.sort((a, b) => a - b);
    setDrawnNumbers(drawn);

    // Calcular resultados para el usuario
    if (userBets.length > 0) {
      const lastBet = userBets[userBets.length - 1];
      const matches = lastBet.numbers.filter((n) => drawn.includes(n)).length;
      const unmatches = 12 - matches;

      let prize = 0;
      let message = '';

      if (matches === 12 || unmatches === 0) {
        prize = 100000;
        message = '¡12 aciertos! ¡GANASTE S/ 100,000!';
      } else if (matches === 11 || unmatches === 1) {
        prize = 1000;
        message = '¡11 aciertos! ¡GANASTE S/ 1,000!';
      } else if (matches === 10 || unmatches === 2) {
        prize = 40;
        message = '¡10 aciertos! ¡GANASTE S/ 40!';
      } else if (matches === 9 || unmatches === 3) {
        prize = 4;
        message = '¡9 aciertos! ¡GANASTE S/ 4!';
      } else if (matches === 8 || unmatches === 4 || matches === 6) {
        prize = 0;
        message = '¡Jugada Gratis Turbito!';
      }

      if (prize > 0) {
        setUserBalance((prev) => prev + prize);
        setWinnings(prize);
      }

      const result = {
        draw: drawn,
        userBet: lastBet.numbers,
        matches,
        prize,
        message,
        timestamp: new Date(),
      };
      setGameHistory((prev) => [result, ...prev.slice(0, 9)]);
    }

    // IA hace apuestas después del sorteo
    generateAIBets(drawn);
  };

  const generateAIBets = (lastDraw) => {
    const updatedPlayers = aiPlayers.map((player) => {
      const bet = {
        amount: Math.floor(Math.random() * 500) + 50,
        numbers: generateRandomNumbers(),
      };

      let prize = 0;
      const matches = bet.numbers.filter((n) => lastDraw.includes(n)).length;
      const unmatches = 12 - matches;

      if (matches === 12 || unmatches === 0) {
        prize = 100000;
      } else if (matches === 11 || unmatches === 1) {
        prize = 1000;
      } else if (matches === 10 || unmatches === 2) {
        prize = 40;
      } else if (matches === 9 || unmatches === 3) {
        prize = 4;
      }

      return {
        ...player,
        balance: player.balance - bet.amount + prize,
        bets: [{ ...bet, matches, prize }],
      };
    });
    setAIPlayers(updatedPlayers);
  };

  const generateRandomNumbers = () => {
    const numbers = [];
    while (numbers.length < 12) {
      const num = Math.floor(Math.random() * 24) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }
    return numbers.sort((a, b) => a - b);
  };

  const toggleNumber = (num) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else if (selectedNumbers.length < 12) {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const placeBet = () => {
    if (selectedNumbers.length !== 12) {
      alert('Debes seleccionar exactamente 12 números');
      return;
    }
    if (betAmount > userBalance) {
      alert('No tienes suficiente saldo');
      return;
    }

    setUserBalance((prev) => prev - betAmount);
    const bet = {
      numbers: [...selectedNumbers],
      amount: betAmount,
      timestamp: new Date(),
    };
    setUserBets((prev) => [bet, ...prev]);
    setSelectedNumbers([]);
    setWinnings(0);
  };

  const clearSelection = () => {
    setSelectedNumbers([]);
  };

  const autoSelect = () => {
    setSelectedNumbers(generateRandomNumbers());
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎰 TURBITO</h1>
        <p>Juega, Gana, Disfruta</p>
      </header>

      <div className="container">
        <div className="main-content">
          <UserBalance balance={userBalance} winnings={winnings} />
          <DrawDisplay drawnNumbers={drawnNumbers} nextDrawTime={nextDrawTime} formatTime={formatTime} />
          <GameBoard
            selectedNumbers={selectedNumbers}
            toggleNumber={toggleNumber}
            placeBet={placeBet}
            clearSelection={clearSelection}
            autoSelect={autoSelect}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            selectedCount={selectedNumbers.length}
          />
        </div>

        <aside className="sidebar">
          <AIPlayers players={aiPlayers} />
          <GameStats history={gameHistory} />
        </aside>
      </div>
    </div>
  );
};

export default App;
