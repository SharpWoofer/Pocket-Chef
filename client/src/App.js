import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import HomePage from "./scenes/homePage";
import LoginPage  from "./scenes/loginPage";
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "./theme";

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
