import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import Booking from './Pages/Booking'
import AdminLogin from './Pages/AdminLogin';
// import Form from './Pages/Form'
import Dashboard from './Pages/Dashboard';
import Order from './Pages/Order';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Booking />}/>
          <Route path="/admin-login" element={<AdminLogin />}/>
          <Route path="/orders" element={<Dashboard/>}/>
          <Route path="/order/:id" element={<Order/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
