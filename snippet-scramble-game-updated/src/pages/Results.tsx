import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import PageTransition from '@/components/PageTransition';
import Leaderboard from '@/components/Leaderboard';
import { useGame } from '@/hooks/useGame';

const Results = () => {
  const {
    firstName,
    lastName,
    isExampleMode,
    gameResult,
    timeElapsed,
    leaderboard,
    isLoadingLeaderboard,
    startGame,
    resetGame,
    refreshLeaderboard,
    saveResultToLeaderboard
  } = useGame();

  // Aggiorna leaderboard se non è modalità esempio
  useEffect(() => {
    if (!isExampleMode) {
      saveResultToLeaderboard({
        name: `${firstName} ${lastName}`,
        time: timeElapsed,
      });
      refreshLeaderboard();
    }
  }, [isExampleMode, refreshLeaderboard, saveResultToLeaderboard, firstName, lastName, timeElapsed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const shareOnLinkedIn = () => {
    const text = encodeURIComponent("Oggi al DevFest abbiamo giocato al gioco di Link.it! 🚀 #DevFest #LinkIT");
    const url = "https://www.linkedin.com/sharing/share-offsite/?url=https://it.linkedin.com/company/link.italy&summary=" + text;
    window.open(url, '_blank');
  };

  
  const selectedSnippet = gameResult?.selectedSnippet;

  return (
    <>
      {selectedSnippet && !selectedSnippet.isCorrect && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-red-300">
          <h2 className="text-xl font-semibold mb-4">Qual è il problema nello Snippet e perché si verifica?</h2>
          <ul className="space-y-2">
            <li>A) Il compilatore non permette di assegnare null a un Integer, quindi il codice non si compila.</li>
            <li>B) Il problema è che Integer non supporta operazioni aritmetiche direttamente, quindi il codice genera un errore di tipo a tempo di compilazione.</li>
            <li className="bg-green-100 border-l-4 border-green-500 p-2">
              C) Il problema è che Integer value = null; causa una NullPointerException quando viene auto-unboxato in int per l'operazione value + 10.
            </li>
            <li>D) Il codice entra in un loop infinito perché value è null e il programma non sa come gestirlo.</li>
          </ul>
          <p className="mt-4 italic text-sm text-gray-700">
            ✅ Il problema è l'autoboxing/unboxing. Integer è un wrapper class e può essere null, ma quando un null viene convertito in int tramite unboxing (value + 10), il programma lancia una NullPointerException.
          </p>
        </div>
      )}

    <Layout
      title={isExampleMode ? "ESEMPIO COMPLETATO" : (
        gameResult === 'success' ? "CONGRATULAZIONI!" : "ERRORE"
      )}
    >
      <PageTransition>
        {!isExampleMode && (
          <div className="mb-6 text-xl">
            <p>Hai completato il gioco in: <strong>{formatTime(timeElapsed)}</strong></p>
          </div>
        )}

        {!isExampleMode && (
          <div className="my-4">
            <h2 className="text-lg font-bold mb-2">🏆 Classifica</h2>
            <Leaderboard leaderboard={leaderboard} loading={isLoadingLeaderboard} />
          </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-4">
          <p>🔗 Seguici su <a className="text-blue-600 underline" href="https://it.linkedin.com/company/link.italy" target="_blank">LinkedIn</a>!</p>
          <Button onClick={shareOnLinkedIn}>Condividi su LinkedIn</Button>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <Button onClick={resetGame}>Ricomincia</Button>
          <Button variant="secondary" onClick={startGame}>Nuovo Giocatore</Button>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Results;