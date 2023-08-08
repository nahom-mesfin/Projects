
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import AboutPage from "./FreePage";
import Contact from './contact';
import {Login} from './component/Login/Login';
import Register from './component/Login/Register';
import PaidPage from './paid';
import DeletePage from './component/AdminPage/Delete';
import AdminAdd from './component/AdminPage/AdminAdd';
import Admin from './component/AdminPage/Admin';
import LandingPage from './LandingPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/free" element={<AboutPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/paidpage" element={<PaidPage />} />
        <Route path="/AdminAdd" element={<AdminAdd />} />
        <Route path="/Deletepage" element={<DeletePage />} />
        <Route path="/LandingPage/:id" element={<LandingPage />} />
        <Route path="/Admin" element={<Admin/>}/>
      </Routes>
    </Router>
  );
}

export default App;