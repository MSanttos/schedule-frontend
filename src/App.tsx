 
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'

import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [, setPath] = useState(window.location.pathname)

  useEffect(() => {
    // Esta função intercepta as mudanças de rota
    const handleRouteChange = () => {
      setPath(window.location.pathname)
      // Força a URL a sempre aparecer como a raiz
      if (window.location.pathname !== '/') {
        window.history.replaceState(null, '', '/')
      }
    }

    // Ouvinte para mudanças de rota
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}

export default App
