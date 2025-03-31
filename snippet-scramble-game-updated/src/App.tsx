
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { GameProvider } from "@/hooks/useGame";
import Index from "@/pages/Index";
import Rules from "@/pages/Rules";
import Example from "@/pages/Example";
import Game from "@/pages/Game";
import Question from "@/pages/Question";
import Results from "@/pages/Results";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <GameProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/example" element={<Example />} />
              <Route path="/game" element={<Game />} />
              <Route path="/question" element={<Question />} />
              <Route path="/results" element={<Results />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </GameProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
