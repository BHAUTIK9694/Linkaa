import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      {/*
        future flags silence the React Router v6 → v7 migration warnings.
        v7_startTransition  — wraps state updates in React.startTransition
        v7_relativeSplatPath — changes relative route resolution inside splat routes
      */}
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
