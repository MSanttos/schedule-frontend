import { useNavigate } from 'react-router-dom'

export const useMaskedNavigation = () => {
  const navigate = useNavigate()

  const maskedNavigate = (to: string) => {
    // Armazena a rota pretendida
    sessionStorage.setItem('intendedRoute', to)
    // Navega para a rota
    navigate(to)
    // Imediatamente substitui a URL pela raiz
    window.history.replaceState(null, '', '/')
  }

  return maskedNavigate
}