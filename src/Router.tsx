import {  Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { CreateUser } from "./pages/CreateUser"
import { ViewUserDetails } from "./pages/View"
import { EditUserAccount } from "./pages/Edit"
import { Login } from "./pages/Login"

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/view-user/:id" element={<ViewUserDetails  />} />  
      <Route path="/edit-user/:id" element={<EditUserAccount />} />  
    </Routes>
  )
}