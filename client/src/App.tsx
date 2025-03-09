import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, MainNav } from '@/components/common';
import { Toaster } from '@/components/ui/sonner';
import { Dashboard } from '@/components/dashboard';
import { SessionManagement } from '@/components/sessions';
import { SessionHistory } from '@/components/session-history';
import { Settings } from '@/components/settings';
import { Artists } from '@/components/artists';
import { SettingsProvider } from '@/contexts/settings.context';
import { ArtistsProvider } from '@/contexts/artists.context';
import { SessionsProvider } from '@/contexts/sessions.context';

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="recording-theme">
        <SettingsProvider>
          <ArtistsProvider>
            <SessionsProvider>
              <div className="min-h-screen bg-background">
                <MainNav />
                <main className="container mx-auto p-6 max-w-7xl">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/session" element={<SessionManagement />} />
                    <Route path="/history" element={<SessionHistory />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/artists" element={<Artists />} />
                  </Routes>
                </main>
              </div>
              <Toaster />
            </SessionsProvider>
          </ArtistsProvider>
        </SettingsProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;