
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import PageTransition from '@/components/PageTransition';
import CodeSnippet from '@/components/CodeSnippet';
import { useGame } from '@/hooks/useGame';
import { exampleSnippets } from '@/lib/snippets';

const Example = () => {
  const { selectSnippet } = useGame();
  const [isExplained, setIsExplained] = useState(false);

  const handleSelectSnippet = () => {
    // In example mode, only snippet index 2 is selectable
    selectSnippet(2);
  };

  return (
    <Layout 
      title="ESEMPIO"
      subtitle="Questa è una dimostrazione di come funziona il gioco"
    >
      <PageTransition>
        <div className="max-w-3xl mx-auto">
          {!isExplained ? (
            <div className="glass-card rounded-lg p-6 mb-6 animate-fade-in">
              <h3 className="font-medium text-lg mb-4">Passo 1: Identifica lo Snippet con l'Errore</h3>
              
              <p className="mb-6 text-muted-foreground">
                Ti verranno mostrati tre snippet di codice. Il tuo compito è identificare quello che contiene un bug. Negli snippet sotto, il codice errato è il terzo.
              </p>
              
              <div className="space-y-4">
                {exampleSnippets.map((snippet, index) => (
                  <CodeSnippet
                    key={snippet.id}
                    code={snippet.code}
                    title={snippet.title}
                    isCorrect={snippet.isCorrect}
                    showCorrectStatus={true}
                    selectable={false}
                  />
                ))}
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={() => setIsExplained(true)} 
                  className="w-full"
                >
                  CONTINUA
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="glass-card rounded-lg p-6">
                <h3 className="font-medium text-lg mb-4">Ora prova tu!</h3>
                
                <p className="mb-6 text-muted-foreground">
                  Di seguito trovi gli stessi tre snippet. Seleziona quello che contiene l'errore (il terzo).
                </p>
                
                <div className="space-y-4">
                  {exampleSnippets.map((snippet, index) => (
                    <CodeSnippet
                      key={snippet.id}
                      code={snippet.code}
                      title={snippet.title}
                      selectable={index === 2}
                      onClick={index === 2 ? handleSelectSnippet : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Example;
