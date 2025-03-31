
import React from 'react';
import { cn } from '@/lib/utils';

export interface LeaderboardEntry {
  id: string;
  firstName: string;
  lastName: string;
  time: number;
  rank: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  className?: string;
  isLoading?: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  entries, 
  className,
  isLoading = false
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn('glass-card rounded-lg overflow-hidden', className)}>
      <div className="px-4 py-3 border-b border-border/30 bg-secondary/40 dark:bg-secondary/30">
        <h3 className="font-medium">Classifica Giornaliera</h3>
        <p className="text-xs text-muted-foreground mt-1">
          La classifica si azzera a mezzanotte
        </p>
      </div>
      
      {isLoading ? (
        <div className="p-6 text-center text-muted-foreground">
          Caricamento classifica...
        </div>
      ) : entries.length === 0 ? (
        <div className="p-6 text-center text-muted-foreground">
          Nessun partecipante in classifica
        </div>
      ) : (
        <div className="divide-y divide-border/30">
          {entries.map((entry) => (
            <div 
              key={entry.id}
              className={cn(
                'flex items-center p-3 transition-colors',
                entry.rank <= 3 ? 'bg-primary/5 dark:bg-primary/10' : ''
              )}
            >
              <div className={cn(
                'w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium mr-3',
                entry.rank === 1 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' :
                entry.rank === 2 ? 'bg-gray-100 text-gray-800 dark:bg-gray-800/40 dark:text-gray-300' :
                entry.rank === 3 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' :
                'bg-secondary/70 text-foreground/70'
              )}>
                {entry.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{entry.firstName} {entry.lastName}</div>
              </div>
              <div className="font-mono text-sm">
                {formatTime(entry.time)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
