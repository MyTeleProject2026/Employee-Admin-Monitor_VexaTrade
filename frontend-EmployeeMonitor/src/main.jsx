// frontend-EmployeeMonitor/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';

// ✅ Temporary global error listener to catch and log trim errors
window.addEventListener('error', function(e) {
  // Only log errors that mention 'trim'
  if (e.message && e.message.includes('trim is not a function')) {
    console.error('❌ TRIM ERROR DETECTED:');
    console.error('  Message:', e.message);
    console.error('  Stack:', e.error?.stack);
    console.error('  File:', e.filename);
    console.error('  Line:', e.lineno);
    console.error('  Col:', e.colno);
    // Prevent the error from crashing the app
    e.preventDefault();
    return true;
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
