# Astro-Arena Frontend

Welcome to the **Astro-Arena Frontend** repository! This is the React-based user interface for a card game inspired by the Pokémon Trading Card Game (TCG). The frontend interacts with a backend built using NestJS via webhooks and incorporates an AI model to power the PC player's decisions. Dive into the cosmos and enjoy a strategic card-battling experience!

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Running the Application](#running-the-application)
6. [Webhooks and Backend Interaction](#webhooks-and-backend-interaction)
7. [AI Model for PC Player](#ai-model-for-pc-player)
8. [Contributing](#contributing)
9. [License](#license)

---

## Overview

Astro-Arena is a card game where players collect and battle with cards inspired by celestial themes. The frontend is built with **React** and provides a seamless and interactive user experience. It communicates with a **NestJS backend** using webhooks and integrates an **AI model** to simulate a challenging PC opponent.

---

## Features

- **Card Collection**: View and manage your collection of celestial-themed cards.
- **Battling System**: Engage in strategic card battles against other players or the AI.
- **AI Opponent**: Play against a PC player powered by an AI model for a challenging experience.
- **Webhook Integration**: Real-time updates and interactions with the backend.
- **Responsive UI**: A sleek and responsive design for desktop and mobile devices.

---

## Technologies Used

- **Frontend**: React, React Router, Axios, TailwindCSS
- **State Management**: Zustand
- **Backend Communication**: Webhooks, REST API
- **AI Model**: TensorFlow.js
- **Build Tool**: Vite
- **Version Control**: Git

---

## Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/julio-pg/astro-arena-frontend.git
   cd astro-arena-frontend
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   VITE_API_URL=http://your-backend-url
   VITE_DEFAULT_PLAYER=your-default-player
   ```

4. **Run the Application**:
   ```bash
   pnpm run dev
   ```

---

## Running the Application

- Start the development server:
  ```bash
  pnpm run dev
  ```
- Open your browser and navigate to `http://localhost:1214`.

---

## Webhooks and Backend Interaction

The frontend communicates with the NestJS backend using **webhooks** for real-time updates. Key interactions include:

- Fetching card data and player stats.
- Sending battle moves and receiving results.
- Updating the game state dynamically.

Ensure the backend is running and the webhook URLs are correctly configured in the `.env` file.

---

## AI Model for PC Player

The PC player is powered by an AI model that simulates human-like decision-making during battles. The model is trained to:

- Analyze the game state.
- Predict optimal moves based on card attributes and game rules.
- Adapt to different player strategies.

The AI model is hosted in the backend and integrated into the frontend via webhook calls.

---

## Contributing

We welcome contributions to Astro-Arena! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and descriptive messages.
4. Submit a pull request.

Please ensure your code follows the project's coding standards and includes relevant tests.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Inspired by the Pokémon Trading Card Game.
- Built with React and NestJS.
- Special thanks to the open-source community for their invaluable tools and libraries.

---

Enjoy your journey through the Astro-Arena! 🌌🚀
