import { useState } from "react";
import playerNames from "../data/active_players_names.json";
import PropTypes from "prop-types";

function SearchPlayer({ setPlayer, player, setGuess }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState(playerNames);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setPlayer(query); // Update player as the user types

    if (query) {
      const filtered = playerNames.filter((name) =>
        name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlayers(filtered);
    } else {
      setFilteredPlayers([]);
    }
  };

  const handleNameClick = (name) => {
    setSearchQuery(name);
    setFilteredPlayers([]);
    setPlayer(name); // Set player when a name is clicked
    setGuess(true);
  };

  return (
    <div className="flex justify-center p-6 text-center dark:text-gray-300">
      <div className="w-full md:w-1/3 shadow-lg rounded-lg bg-gray-100 dark:bg-gray-700 relative">
        <input
          type="text"
          placeholder="Search for a player"
          value={player}
          onChange={handleSearch}
          className="w-full p-3 focus:outline-none bg-gray-100 dark:bg-gray-700 text-center rounded-lg shadow-inner"
        />
        {searchQuery && (
          <ul className="mt-1 max-h-60 overflow-y-auto bg-gray-100 dark:bg-gray-700 absolute left-0 right-0 top-full z-10">
            {filteredPlayers.map((name, index) => (
              <li
                key={index}
                onClick={() => handleNameClick(name)}
                className="hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-300 cursor-pointer text-center"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

SearchPlayer.propTypes = {
  setPlayer: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired,
  setGuess: PropTypes.func.isRequired,
};

export default SearchPlayer;
