import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from "react";
import AuthComponent from './components/Auth/AuthComponent';
import MainPage from './pages/MainPage/MainPage';

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="/register" element={<AuthComponent user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
