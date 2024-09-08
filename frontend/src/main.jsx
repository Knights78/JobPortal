import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import store from './redux/store.js'
createRoot(document.getElementById('root')).render(

  <StrictMode>
      <Provider store={store}>
        <App />
        <Toaster toastOptions={{ className: 'p-8 text-2xl max-w-2xl' }} />
      </Provider>
       
  </StrictMode>,
)
