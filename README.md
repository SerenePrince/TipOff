# TipOff

## Overview

Welcome to TipOff! This is a fun personal project I built to challenge myself and explore working with React and APIs. The game lets you guess NBA players based on attributes like name, team, height, weight, and more. I built this as a way to combine my love for basketball and coding.

## Features

- **Player Cards:** Displays player details in a fun card layout.
- **Guess Feedback:** Get real-time hints on how close your guess is to the actual player.
- **Header Row:** A header card provides clear column titles.
- **Dark Mode Support:** Toggle between light and dark themes for the best experience.
- **Search Functionality:** Search for players by name to make your guesses.
- **Congrats Popup:** Celebrate when you guess the correct player!

## Technologies Used

- **React**: For building the UI.
- **PropTypes**: To validate props in components.
- **React Icons**: For visual feedback (like checkmarks and arrows).
- **BALLDONTLIE NBA API**: For fetching player data.
- **Tailwind CSS**: For styling and dark mode.

## Installation

This project is just for fun and not intended for distribution, but if you'd like to check it out:

1. Clone the repository:
   ```bash
   git clone https://github.com/SerenePrince/TipOff.git
   ```
2. Navigate to the project directory:
   ```bash
   cd TipOff
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## How to Play

1. Open the app in your browser or check out the [live demo](https://sereneprince.github.io/TipOff/).
2. Use the search bar to type a player's name and submit your guess.
3. Check the feedback to see how close your guess is.
4. Keep guessing until you find the right player!

## File Structure

- **`src/components`**: React components like `PlayerCard`, `Header`, `HelpCard`, and `SearchBar`.
- **`src/data`**: Contains JSON files with player data.
- **`src/App.js`**: The main application logic.
- **`public`**: Static assets and the HTML template.

## Why I Built This

I love basketball and coding, so I thought, why not combine the two? This project is my way of learning more about React while also working with data from the NBA. Using the BALLDONTLIE NBA API, I was able to pull in real player data to make the game more exciting and accurate.

## Future Ideas

This is just a fun side project, but if I were to add more features, here's what I'd consider:

- **Leaderboard**: Track your best guesses.
- **Hint System**: Give players optional hints.
- **Detailed Stats**: Show more in-depth player info.
- **Responsive Design**: Make the game even more mobile-friendly.

## Acknowledgments

- **BALLDONTLIE NBA API**: A huge shoutout for providing the player data that powers this game.
- **React Icons**: For making the UI more intuitive and fun.

---

Thanks for checking out my project! I had a blast building this, and I hope you enjoy playing it as much as I enjoyed making it. Cheers!

