import {  Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { CreateUser } from "./pages/CreateUser"

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-user" element={<CreateUser />} />
    </Routes>
  )
}