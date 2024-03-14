import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import HomePage from "./scenes/homePage";
import LoginPage  from "./scenes/loginPage";
import DietPage from './scenes/dietPage';
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "./theme";
import React from 'react';
import NavBar from './scenes/navBar';


function App() {

  return (
    <div className="app">
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/diet" element={<DietPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
