import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/home';
import Login from './routes/login';
import Root from './routes/root';
import RecipeBook from './routes/recipes';
import Recipe from './routes/recipes/recipe';
import Register from './routes/register';
import Profile from './routes/profile';
import Calculator from './routes/calculator'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="recipes" element={<RecipeBook />} />
            <Route path="recipes/:id" element={<Recipe />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="calculator" element={<Calculator />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;