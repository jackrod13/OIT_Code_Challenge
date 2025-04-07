# Word Guessing Game

This is a full-stack single-player word guessing game built for the Code Challenge. The player attempts to guess a hidden word one letter at a time. Words are dynamically retrieved from the Datamuse API through a C# backend. The frontend is built in React with TypeScript and Vite.

---

## Features

- Interactive word guessing game
- Dynamic word selection from an external API
- Difficulty selector (Easy = 6-letter words, Hard = 10-letter words)
- Hint system (reveals one letter per game)
- Win/loss detection with replay option
- 7 incorrect guesses allowed per round
- Organized frontend/backend architecture

---

## Tech Stack

### Frontend
- React (with Vite and TypeScript)
- Bootstrap (for UI styling)
- Vite proxy to connect with backend

### Backend
- ASP.NET Core Web API (C#)
- Datamuse API integration
- JSON serialization and API response modeling

---

## Getting Started

### Prerequisites

- [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- Node.js (v16 or later)

---

### Backend Setup

1. Navigate to the backend directory: (In order for this step to work, you need to make sure you're in the folder with the .csproj file)
   ```bash
   cd backend/Code_Challenge
   dotnet run

## Frontend Setup

1. Navigate to the frontend directory:

# Frontend Setup (in a new terminal)
cd frontend
npm install
npm run dev

This starts the React + TypeScript frontend on http://localhost:5173. The frontend uses Vite's dev server and proxies all /api requests to the backend.

If your backend is running on a different port, update vite.config.ts:

ts
Copy
Edit
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000', // Update if needed
      changeOrigin: true,
    },
  },
}
