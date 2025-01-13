import { BalldontlieAPI } from "@balldontlie/sdk";
import fs from "fs";

// Initialize the API client
const api = new BalldontlieAPI({
  apiKey: import.meta.env.VITE_API_KEY,
});

// Function to validate if a player has the necessary information
const isValidPlayer = (player) => {
  return (
    player &&
    player.first_name &&
    player.last_name &&
    player.height &&
    player.weight &&
    player.jersey_number &&
    player.country &&
    player.draft_year &&
    player.draft_number &&
    player.team
  );
};

// Function to classify players as active or retired
function classifyPlayer(player) {
  // A retired player will have an empty position field
  if (player.position === "") {
    return "retired";
  }
  return "active";
}

// Function to fetch players with pagination and rate limiting
async function fetchPlayers() {
  const allPlayers = []; // Array to store all valid players (active + retired)
  const activePlayers = []; // Array to store valid active players
  const retiredPlayers = []; // Array to store valid retired players
  const activeNamesList = []; // Array to store active player names
  const retiredNamesList = []; // Array to store retired player names
  let nextCursor = null; // Start with no cursor for the first page
  const callsPerMinute = 20; // Limit calls to 20 per minute (to be more cautious)
  let totalCalls = 0;

  while (true) {
    try {
      // Fetch players with pagination
      let params = { per_page: 100 }; // Fetch 100 players per page
      if (nextCursor) {
        params.cursor = nextCursor; // Add the next_cursor for the next page
      }

      const response = await api.nba.getPlayers(params);
      const playerData = response.data; // Assuming the response has a 'data' key with player info
      nextCursor = response.meta.next_cursor; // Get the next_cursor from the response

      // Filter valid players
      const validPlayers = playerData.filter(isValidPlayer);
      allPlayers.push(...validPlayers);

      // Classify players as active or retired and populate respective lists
      validPlayers.forEach((player) => {
        const classification = classifyPlayer(player);
        if (classification === "active") {
          activePlayers.push(player);
          activeNamesList.push(`${player.first_name} ${player.last_name}`);
        } else {
          retiredPlayers.push(player);
          retiredNamesList.push(`${player.first_name} ${player.last_name}`);
        }
      });

      // Break the loop if there is no next page
      if (!nextCursor) {
        break;
      }

      totalCalls++;

      // Implement rate limiting: pause if we've hit the 20 calls per minute limit
      if (totalCalls % callsPerMinute === 0) {
        console.log("Rate limit reached. Sleeping for 70 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 70000)); // Sleep for 70 seconds
      }
    } catch (error) {
      console.error("Error occurred while fetching players:", error);
      break;
    }
  }

  // Save the all valid players to a JSON file
  fs.writeFileSync("valid_players.json", JSON.stringify(allPlayers, null, 2));
  console.log(
    `Saved ${allPlayers.length} valid players to valid_players.json.`
  );

  // Save the active players to a JSON file
  fs.writeFileSync(
    "active_players.json",
    JSON.stringify(activePlayers, null, 2)
  );
  console.log(
    `Saved ${activePlayers.length} active players to active_players.json.`
  );

  // Save the retired players to a JSON file
  fs.writeFileSync(
    "retired_players.json",
    JSON.stringify(retiredPlayers, null, 2)
  );
  console.log(
    `Saved ${retiredPlayers.length} retired players to retired_players.json.`
  );

  // Save the active player names to a JSON file
  fs.writeFileSync(
    "active_players_names.json",
    JSON.stringify(activeNamesList, null, 2)
  );
  console.log(
    `Saved ${activeNamesList.length} active player names to active_players_names.json.`
  );

  // Save the retired player names to a JSON file
  fs.writeFileSync(
    "retired_players_names.json",
    JSON.stringify(retiredNamesList, null, 2)
  );
  console.log(
    `Saved ${retiredNamesList.length} retired player names to retired_players_names.json.`
  );
}

// Call the fetchPlayers function to start scraping
fetchPlayers();
