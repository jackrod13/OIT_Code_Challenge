import { WordResponse } from '../types/Word';

// API route that gets proxied to the backend by Vite during dev
const API_URL = '/api/word';

// Fetches a random word from the backend, based on difficulty level
export const fetchRandomWord = async (
  difficulty: 'easy' | 'hard' = 'easy' // default to easy if none is passed
): Promise<WordResponse> => {
  try {
    // Make GET request to backend API with difficulty as query param
    const response = await fetch(`${API_URL}/GetWord?difficulty=${difficulty}`);
    const contentType = response.headers.get('content-type');

    // If request was unsuccessful, log the response and throw an error
    if (!response.ok) {
      const text = await response.text();
      console.error('Non-OK response from backend:', text);
      throw new Error('Failed to fetch word');
    }

    // If response is not JSON, log and throw an error
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      console.error('Expected JSON, but got:', text);
      throw new Error('Response is not valid JSON');
    }

    // Parse and return the JSON response
    const data = await response.json();
    console.log('API JSON response:', data);
    return data;
  } catch (error) {
    // Catch any unexpected errors and log them
    console.error('Error fetching word:', error);
    throw error;
  }
};
