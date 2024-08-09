import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Converter';
import Converter from './pages/Converter';

function App() {
    return (
        <BrowserRouter>
             <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/converter" element={<Converter />} />
             </Routes>
        </BrowserRouter>
    );
}

export default App;