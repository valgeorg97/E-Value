import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import { AuthProvider } from './Context/AuthContext.tsx';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>,
  </AuthProvider>
)
