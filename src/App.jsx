import { useState, useEffect } from "react";
import activePlayers from "./data/active_players.json";
import playerNames from "./data/active_players_names.json";
import Header from "./components/Header.jsx";
import HelpCard from "./components/HelpCard.jsx";
import PlayerCard from "./components/PlayerCard.jsx";
import SearchBar from "./components/SearchBar.jsx";

function App() {
  const [showHelp, setShowHelp] = useState(false);
  const [darkMode, setDarkMode] = useState();
  const [guesses, setGuesses] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [player, setPlayer] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [loading, setLoading] = useState(true);
  const [guess, setGuess] = useState(false);

  const toggleShowHelp = () => setShowHelp((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const randomPlayerName =
      playerNames[Math.floor(Math.random() * playerNames.length)];
    const randomPlayer = activePlayers.find(
      (player) =>
        `${player.first_name} ${player.last_name}` === randomPlayerName
    );
    setAnswer(randomPlayer || null);
    console.log(randomPlayer);
    setLoading(false);
  }, []);

  const guessPlayer = () => {
    if (!player.trim()) return alert("Please enter a player's name");

    const guessedPlayer = activePlayers.find(
      (p) =>
        `${p.first_name} ${p.last_name}`.toLowerCase() === player.toLowerCase()
    );

    if (guessedPlayer) {
      const isCorrect =
        guessedPlayer.first_name === answer.first_name &&
        guessedPlayer.last_name === answer.last_name;

      setGuesses((prevGuesses) => [
        ...prevGuesses,
        <PlayerCard
          key={guesses.length}
          guess={guessedPlayer}
          answer={answer}
        />,
      ]);
      setPlayer("");
      setGuess(false);

      if (isCorrect) {
        setShowCongrats(true);
      }
    } else {
      alert("Player not found!");
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-xl text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-300 dark:bg-gray-800 flex-col justify-center items-center text-center">
      <HelpCard toggleShowHelp={toggleShowHelp} showHelp={showHelp} />
      <Header
        toggleShowHelp={toggleShowHelp}
        showHelp={showHelp}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
      <SearchBar
        setPlayer={setPlayer}
        player={player}
        setGuess={setGuess}
        guess={guess}
      />
      <button
        className="bg-gray-100 dark:text-gray-100 dark:bg-gray-600 dark:hover:bg-gray-700 py-3 px-6 shadow-lg rounded-lg hover:bg-gray-200  disabled:opacity-50 disabled:hover:bg-gray-100 disabled:dark:hover:bg-gray-600 disabled:dark:opacity-50"
        onClick={guessPlayer}
        disabled={!player || !guess}
      >
        Guess
      </button>

      {/* Display guesses */}
      <div className="mt-6 flex flex-col space-y-2 w-full items-center transition">
        {guesses}
      </div>

      {/* Congrats Popup */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
              🎉 Congratulations! 🎉
            </h2>
            <p className="mt-4 text-gray-800 dark:text-gray-200">You win!</p>
            <button
              className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600"
              onClick={() => window.location.reload(false)}
            >
              Play Again?
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
