import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./view/homePage";
import LoginPage from './view/loginPage';
import RegPage from './view/regPage';
import ForgetPasswordPage from './view/forgetPasswordPage';
import Layout from './layout';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />}></Route>
          </Route>
          <Route path="/forget" element={<ForgetPasswordPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reg" element={<RegPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;