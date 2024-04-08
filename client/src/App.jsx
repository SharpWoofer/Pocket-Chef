import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/home';
import Login from './routes/profile/login.jsx';
import Root from './routes/root';
import RecipeBook from './routes/recipes';
import Recipe from './routes/recipes/recipe';
import Register from './routes/profile/register.jsx';
import Profile from './routes/calculator/profile.jsx';
import Calculator from './routes/calculator/calculator.jsx'
import Workout from "./routes/workout/workout.jsx";
import Gyms from "./routes/gyms/gyms.jsx";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './App.css';
import {useState} from "react";
import CalorieTracker from "./routes/calorietracker/calorieTracker.jsx";

function App() {
  const [results, setResults] = useState([])
  return (
    <div className="app">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              <Route path="fitness" element={<h1><Workout/></h1>} />
              <Route path="gyms" element={<Gyms />} />
              <Route path="calorietracker" element={<CalorieTracker setResults={setResults} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;