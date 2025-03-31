
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import CodeSnippet from '@/components/CodeSnippet';
import PageTransition from '@/components/PageTransition';
import { useGame } from '@/hooks/useGame';
import { snippets } from '@/lib/snippets';

const Game = () => {
  const { selectSnippet, timeElapsed } = useGame();
  const [shuffledSnippets, setShuffledSnippets] = useState([...snippets]);
  const [countdown, setCountdown] = useState<number | null>(3);
  const navigate = useNavigate();
  
  // Shuffle snippets on component mount
  useEffect(() => {
    const shuffled = [...snippets].sort(() => Math.random() - 0.5);
    setShuffledSnippets(shuffled);
    
    // Countdown from 3 to start
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === null) return null;
        return prev > 0 ? prev - 1 : null;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleSelectSnippet = (snippetIndex: number) => {
    // If the snippet is correct (no bugs), go directly to the results page
    const originalIndex = shuffledSnippets.findIndex(s => s.id === snippets[snippetIndex].id);
    if (snippets[snippetIndex].isCorrect) {
      // Select the snippet first so the game state is updated
      selectSnippet(snippetIndex);
      // Then navigate to results (the Results page will show the failure screen)
      navigate('/results');
    } else {
      // Only incorrect snippets should proceed to the question page
      selectSnippet(snippetIndex);
    }
  };

  return (
    <Layout 
      title="GIOCO REALE"
      subtitle="Identifica lo snippet che contiene un bug"
      timer={timeElapsed}
    >
      {countdown !== null ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="text-6xl font-bold text-white animate-countdown">
            {countdown}
          </div>
        </div>
      ) : (
        <PageTransition>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {shuffledSnippets.map((snippet, index) => (
                <CodeSnippet
                  key={snippet.id}
                  code={snippet.code}
                  title={snippet.title}
                  onClick={() => handleSelectSnippet(shuffledSnippets.findIndex(s => s.id === snippet.id))}
                />
              ))}
            </div>
          </div>
        </PageTransition>
      )}
    </Layout>
  );
};

export default Game;
