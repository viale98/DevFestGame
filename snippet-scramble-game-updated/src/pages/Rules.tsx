
import React from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import PageTransition from '@/components/PageTransition';
import { useGame } from '@/hooks/useGame';

const Rules = () => {
  const { startExampleMode } = useGame();

  return (
    <Layout 
      title="Regole del Gioco"
      subtitle="Leggi attentamente prima di iniziare"
    >
      <PageTransition>
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-lg p-6 mb-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary h-6 w-6 text-sm font-medium mr-2 mt-0.5">1</span>
                <span>Ti verranno mostrati <strong>tre snippet di codice Java</strong>. Solo uno contiene un bug.</span>
              </li>
              
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary h-6 w-6 text-sm font-medium mr-2 mt-0.5">2</span>
                <span>Il tuo compito è <strong>identificare lo snippet con l'errore</strong>.</span>
              </li>
              
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary h-6 w-6 text-sm font-medium mr-2 mt-0.5">3</span>
                <span>Dopo aver individuato lo snippet errato, dovrai <strong>indicare quale sia esattamente il problema</strong> tra diverse opzioni.</span>
              </li>
              
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary h-6 w-6 text-sm font-medium mr-2 mt-0.5">4</span>
                <span>Hai <strong>3 minuti (180 secondi)</strong> per completare entrambi i passaggi.</span>
              </li>
              
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary h-6 w-6 text-sm font-medium mr-2 mt-0.5">5</span>
                <span>Se scegli uno snippet corretto o sbagli la risposta sulla natura del bug, la partita termina.</span>
              </li>
              
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary h-6 w-6 text-sm font-medium mr-2 mt-0.5">6</span>
                <span>I partecipanti con i <strong>tempi migliori</strong> vinceranno premi speciali.</span>
              </li>
              
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary h-6 w-6 text-sm font-medium mr-2 mt-0.5">7</span>
                <span>Ogni utente può partecipare <strong>una sola volta al giorno</strong>.</span>
              </li>
            </ul>
            
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 rounded-md p-4 mb-6">
              <h3 className="font-medium mb-2">Prima di iniziare:</h3>
              <p className="text-sm text-muted-foreground">
                Ti mostreremo un esempio per farti capire come funziona il gioco. L'esempio non è cronometrato e non influirà sul tuo punteggio.
              </p>
            </div>
            
            <Button 
              onClick={startExampleMode} 
              className="w-full" 
              size="lg"
            >
              PROSEGUI ALL'ESEMPIO
            </Button>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Rules;
