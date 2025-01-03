import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
// import './assets/css/registration.css';
// import './assets/css/header.css';
import App from './App';
import { SidebarProvider } from './context/sidebarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </React.StrictMode>
);
