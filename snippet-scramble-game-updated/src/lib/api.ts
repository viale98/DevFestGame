
import type { LeaderboardEntry } from '@/components/Leaderboard';

// Replace with your actual API endpoint
const API_URL = 'https://api.example.com';

// Mock implementation until backend is available
const MOCK_SESSION_IDS: string[] = [];
const MOCK_PLAYED_TODAY: Record<string, boolean> = {};
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', firstName: 'Marco', lastName: 'Rossi', time: 45, rank: 1 },
  { id: '2', firstName: 'Laura', lastName: 'Bianchi', time: 67, rank: 2 },
  { id: '3', firstName: 'Giovanni', lastName: 'Verdi', time: 82, rank: 3 },
  { id: '4', firstName: 'Paolo', lastName: 'Ferrari', time: 98, rank: 4 },
  { id: '5', firstName: 'Elena', lastName: 'Romano', time: 112, rank: 5 }
];

export const createGame = async (firstName: string, lastName: string): Promise<string> => {
  // In production, this would make a POST request to the backend
  try {
    // Mock implementation - check if user already played today
    const userKey = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
    
    if (MOCK_PLAYED_TODAY[userKey]) {
      throw new Error('ALREADY_PLAYED_TODAY');
    }
    
    // Generate a random session ID
    const sessionId = Math.random().toString(36).substring(2, 15);
    
    // Mark user as played today
    MOCK_PLAYED_TODAY[userKey] = true;
    MOCK_SESSION_IDS.push(sessionId);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return sessionId;
  } catch (error) {
    console.error('Failed to create game:', error);
    throw error;
  }
};

export const submitAnswer = async (sessionId: string, time: number, firstName: string, lastName: string): Promise<void> => {
  // In production, this would make a POST request to the backend
  try {
    // Validate session ID
    if (!MOCK_SESSION_IDS.includes(sessionId)) {
      throw new Error('Invalid session ID');
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update the leaderboard with the new entry
    const newEntry: LeaderboardEntry = {
      id: sessionId,
      firstName,
      lastName,
      time,
      rank: 0 // Will be calculated when getting the leaderboard
    };
    
    // Add to leaderboard if not already there
    const existingEntryIndex = MOCK_LEADERBOARD.findIndex(entry => 
      entry.firstName.toLowerCase() === firstName.toLowerCase() && 
      entry.lastName.toLowerCase() === lastName.toLowerCase()
    );
    
    if (existingEntryIndex >= 0) {
      // Update existing entry if new time is better
      if (time < MOCK_LEADERBOARD[existingEntryIndex].time) {
        MOCK_LEADERBOARD[existingEntryIndex] = newEntry;
      }
    } else {
      // Add new entry
      MOCK_LEADERBOARD.push(newEntry);
    }
    
    console.log(`Submitted answer for session ${sessionId} with time ${time}s`);
  } catch (error) {
    console.error('Failed to submit answer:', error);
    throw error;
  }
};

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  // In production, this would make a GET request to the backend
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Sort leaderboard by time (ascending) and assign ranks
    const sortedLeaderboard = [...MOCK_LEADERBOARD]
      .sort((a, b) => a.time - b.time)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1
      }));
    
    return sortedLeaderboard;
  } catch (error) {
    console.error('Failed to get leaderboard:', error);
    throw error;
  }
};
