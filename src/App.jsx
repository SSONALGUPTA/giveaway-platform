import React from 'react';
import { AuthProvider } from './hooks/useAuth';
import { GiveawayProvider } from './hooks/useGiveaway';
import GiveawayPage from './pages/GiveawayPage';

function App() {
  return (
    <AuthProvider>
      <GiveawayProvider>
        <GiveawayPage />
      </GiveawayProvider>
    </AuthProvider>
  );
}

export default App;
