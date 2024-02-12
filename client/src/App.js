import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import HomePage from "./scenes/homePage";
import LoginPage  from "./scenes/loginPage";


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
