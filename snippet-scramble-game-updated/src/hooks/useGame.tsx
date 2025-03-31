import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export interface LeaderboardEntry {
  id: string;
  firstName: string;
  lastName: string;
  time: number;
  rank: number;
}

interface GameContextType {
  firstName: string;
  lastName: string;
  timeElapsed: number;
  leaderboard: LeaderboardEntry[];
  isLoadingLeaderboard: boolean;
  setUserInfo: (firstName: string, lastName: string) => void;
  saveResultToLeaderboard: (data: { name: string; time: number }) => void;
  refreshLeaderboard: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);

  const setUserInfo = (first: string, last: string) => {
    setFirstName(first);
    setLastName(last);
  };

  const saveResultToLeaderboard = ({ name, time }: { name: string; time: number }) => {
    const [first, ...rest] = name.split(" ");
    const last = rest.join(" ");
    const newEntry = {
      id: uuidv4(),
      firstName: first,
      lastName: last,
      time,
    };

    const existing = localStorage.getItem("linkit-leaderboard");
    let data = existing ? JSON.parse(existing) : [];

    data.push(newEntry);
    data.sort((a: any, b: any) => a.time - b.time);
    data = data.slice(0, 10);
    data = data.map((entry: any, index: number) => ({
      ...entry,
      rank: index + 1,
    }));

    localStorage.setItem("linkit-leaderboard", JSON.stringify(data));
  };

  const refreshLeaderboard = () => {
    setIsLoadingLeaderboard(true);
    const stored = localStorage.getItem("linkit-leaderboard");
    const parsed = stored ? JSON.parse(stored) : [];
    setLeaderboard(parsed);
    setIsLoadingLeaderboard(false);
  };

  return (
    <GameContext.Provider
      value={{
        firstName,
        lastName,
        timeElapsed,
        leaderboard,
        isLoadingLeaderboard,
        setUserInfo,
        saveResultToLeaderboard,
        refreshLeaderboard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};