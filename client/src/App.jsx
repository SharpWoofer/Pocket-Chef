import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/home';
import RegPage from './view/regPage';
import ForgetPasswordPage from './view/forgetPasswordPage';
import Login from './routes/login';
import Root from './routes/root';
import RecipeBook from './routes/recipes';
import Recipe from './routes/recipes/recipe';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="recipes" element={<RecipeBook />} />
            <Route path="recipes/:id" element={<Recipe />} />
            <Route path="forget" element={<ForgetPasswordPage />} />
            <Route path="login" element={<Login />} />
            <Route path="reg" element={<RegPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;