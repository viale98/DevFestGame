
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import PageTransition from '@/components/PageTransition';
import CodeSnippet from '@/components/CodeSnippet';
import { useGame } from '@/hooks/useGame';
import { snippets, exampleSnippets, codeReviewOptions, exampleOptions } from '@/lib/snippets';

const Question = () => {
  const { 
    isExampleMode, 
    selectedSnippetIndex, 
    timeElapsed, 
    selectOption,
    shuffledOptions
  } = useGame();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const navigate = useNavigate();
  
  // Ensure we have a valid snippet index, otherwise redirect back to game
  useEffect(() => {
    if (!isExampleMode && selectedSnippetIndex === null) {
      navigate('/game');
    }
  }, [isExampleMode, selectedSnippetIndex, navigate]);
  
  // Determine which snippet to show based on game mode
  const currentSnippets = isExampleMode ? exampleSnippets : snippets;
  const currentOptions = isExampleMode ? exampleOptions : codeReviewOptions;
  
  // Show example snippet in example mode or selected snippet in game mode
  const snippetToShow = isExampleMode 
    ? exampleSnippets[2] 
    : (selectedSnippetIndex !== null ? snippets[selectedSnippetIndex] : null);

  // Guard clause to ensure we have a valid snippet before rendering
  if (!snippetToShow) {
    return (
      <Layout 
        title={isExampleMode ? "ESEMPIO" : "GIOCO REALE"}
        subtitle="Caricamento in corso..."
        timer={isExampleMode ? undefined : timeElapsed}
      >
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption !== null) {
      selectOption(selectedOption);
    }
  };

  // Use the pre-shuffled options from the game context for the real game
  const displayOptions = isExampleMode
    ? [...currentOptions]
    : shuffledOptions;

  return (
    <Layout 
      title={isExampleMode ? "ESEMPIO" : "GIOCO REALE"}
      subtitle="Qual è esattamente il problema nello snippet selezionato?"
      timer={isExampleMode ? undefined : timeElapsed}
    >
      <PageTransition>
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-lg p-6 mb-6">
            <h3 className="font-medium text-lg mb-4">Analizza il codice</h3>
            
            <CodeSnippet
              code={snippetToShow.code}
              title={snippetToShow.title}
              selectable={false}
            />
          </div>
          
          <div className="glass-card rounded-lg p-6 mb-6">
            <h3 className="font-medium text-lg mb-4">Qual è il problema in questo codice?</h3>
            
            <div className="space-y-3">
              {displayOptions.map((option, index) => (
                <div 
                  key={option.id}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedOption === index 
                      ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                      : 'border-transparent hover:border-primary/30 bg-secondary/30 dark:bg-secondary/20'
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedOption === index
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <p>{option.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleConfirm} 
                className="w-full"
                disabled={selectedOption === null}
              >
                CONFERMA
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Question;
