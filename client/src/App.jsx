import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import HomePage from "./view/homePage";
import LoginPage from './view/loginPage';
import RegPage from './view/regPage';
import ForgetPasswordPage from './view/forgetPasswordPage';
import './App.css';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reg" element={<RegPage />} />
          <Route path="/forget" element={<ForgetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;