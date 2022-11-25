import React from 'react';
import Navbar from "./components/Navbar";
import './App.css';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
