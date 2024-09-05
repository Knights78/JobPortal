import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <App />
        <Toaster toastOptions={{ className: 'p-8 text-2xl max-w-2xl' }} />
  </StrictMode>,
)
