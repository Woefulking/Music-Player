# Music Player

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-brown)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)

[Description](#description) • [Features](#features) • [Installation](#installation) • [Screenshots](#screenshots)

## Description

This project is a modern, responsive music streaming web application integrated with the decentralized **Audius Web3 API**. 
It features a fully custom audio core that allows continuous playback across different pages, complete history queue management, and offline-ready user data syncing.

The project demonstrates solid UI architecture, complex state isolation via custom hooks, and safe data handling patterns in front-end development.

## Features

**Data & API**

- Live track and playlist data from Audius nodes
- Search with debounced autocomplete and AbortController-based
  request discarding

**Playback**

- Global audio element kept alive across routes
- Queue system with absolute indexing and auto-advance

**UX**

- Persistent favorites synced with localStorage
- URL-driven routing for tracks, artists, and app states

## Installation

Clone the repository

```bash
git clone https://github.com/Woefulking/Music-Player.git
cd Music-Player
```

Install dependencies

```bash
npm install
```

Run the project

```bash
npm run dev
```

## Screenshots

![home](./screenshots/home.png)

![player](./screenshots/player.png)

![favorites](./screenshots/favorites.png)
