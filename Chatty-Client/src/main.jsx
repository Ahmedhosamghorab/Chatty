import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './Hooks/useAuth.jsx'
import ChatProvider from './Hooks/useChat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
      <App />
      </ChatProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
