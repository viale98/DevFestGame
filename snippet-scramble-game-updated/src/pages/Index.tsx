
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import PageTransition from '@/components/PageTransition';
import { useGame } from '@/hooks/useGame';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useGame();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim()) {
      toast.error('Inserisci nome e cognome per continuare');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await setUserInfo(firstName.trim(), lastName.trim());
      if (success) {
        navigate('/rules');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout 
      title="Debug Game Challenge"
      subtitle="Metti alla prova le tue abilità di debug"
    >
      <PageTransition>
        <div className="max-w-md mx-auto">
          <div className="glass-card rounded-lg p-6 mb-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    Nome
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input-field w-full"
                    placeholder="Inserisci il tuo nome"
                    disabled={isSubmitting}
                    autoComplete="given-name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Cognome
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input-field w-full"
                    placeholder="Inserisci il tuo cognome"
                    disabled={isSubmitting}
                    autoComplete="family-name"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-2" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registrazione...' : 'INIZIA'}
                </Button>
              </div>
            </form>
          </div>
          
          <p className="text-sm text-center text-muted-foreground">
            Partecipando accetti che il tuo nome e cognome appariranno nella classifica giornaliera.
          </p>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Index;
