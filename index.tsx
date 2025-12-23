import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// We must wrap the app in a Router for GitHub Pages to work correctly
import { BrowserRouter } from 'react-router-dom'; 

// Check if you have an index.css file. If yes, uncomment the line below:
// import './index.css'; 

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* The basename tells React it is running in a sub-folder */}
    <BrowserRouter basename="/GemiCare-NGO-Platform">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
