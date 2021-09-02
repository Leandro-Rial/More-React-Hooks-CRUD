import React from 'react';
import { ContextProvider } from './context/GlobalContext';
import AppRouter from './router/AppRouter';
import './tailwind.css';
import "animate.css"

function App() {
  return (
          <ContextProvider>
            <AppRouter />
          </ContextProvider>
  );
}

export default App;
