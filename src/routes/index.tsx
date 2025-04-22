import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Layout } from "../components/Layout"
import { Login } from "../components/Login/Login"
import { NotFound } from "../components/NotFound"
import { Register } from "../components/Register"
import { Agendamentos } from "../pages/Agendamento"
import { Clientes } from "../pages/Clientes"
import { CreateUser } from "../pages/CreateUser"
import { EditUserAccount } from "../pages/Edit"
import { Home } from "../pages/Home"
import { MainArea } from "../pages/MainArea"
import { NovoAgendamento } from "../pages/NovoAgendamento"
import { ViewUserDetails } from "../pages/View"

export const Router = () => {
  const location = useLocation()

  useEffect(() => {
    // Armazena a rota atual no sessionStorage
    sessionStorage.setItem('currentRoute', location.pathname)
  }, [location])

  return (
    <Routes>
      {/* Rota de login sem o Layout (sem Header/Footer) */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rota de erro 404 */}
      <Route path="*" element={<NotFound />} />

      {/* Rotas com Layout (Header + Footer) */}
      <Route element={<Layout />}>
        <Route path="/view" element={<MainArea />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/novo-agendamento" element={<NovoAgendamento />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/view-user/:id" element={<ViewUserDetails />} />
        <Route path="/edit-user/:id" element={<EditUserAccount />} />
      </Route>
    </Routes>
  )
}