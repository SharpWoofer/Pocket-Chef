import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./view/homePage";
import LoginPage from './view/loginPage';
import RegPage from './view/regPage';
import ForgetPasswordPage from './view/forgetPasswordPage';
import Root from './routes/root';
import Recipes from './routes/recipes';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<HomePage />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="forget" element={<ForgetPasswordPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="reg" element={<RegPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;