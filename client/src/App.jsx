import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./view/homePage";
// import LoginPage from "./scenes/loginPage";
import NavBar from './components/navBar';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;