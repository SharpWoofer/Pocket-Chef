import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { themeSettings } from './theme/theme'
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import DietPage from './scenes/dietPage';
import NavBar from './scenes/navBar';

function App() {
  const theme = themeSettings();

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/diet" element={<DietPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;