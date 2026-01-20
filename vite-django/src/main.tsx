import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router"
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = "254199286435-mkup6jugli815ando87b24ip75amekio.apps.googleusercontent.com";

createRoot(document.getElementById('root')!).render(
   <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </StrictMode>
   </GoogleOAuthProvider>
);