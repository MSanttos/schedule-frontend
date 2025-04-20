import {  Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { CreateUser } from "./pages/CreateUser"
import { ViewUserDetails } from "./pages/View"
import { EditUserAccount } from "./pages/Edit"

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/view-user/:id" element={<ViewUserDetails user={{ id: "", name: "", email: "", phoneNumber: "", birthDate: "", nationality: "", city: "", state: "", postalCode: "", gender: 0, maritalStatus: 0, streetAddress: "", country: "", cpf: "" }} />} />  
      <Route path="/edit-user/:id" element={<EditUserAccount />} />  
    </Routes>
  )
}