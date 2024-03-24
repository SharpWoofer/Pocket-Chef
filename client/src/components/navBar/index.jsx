import "./style.css";
import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <div className="nav-container">
      <div className="logo-container">
        <img src="./nav/burger.png" className="logo-icon"/>
        <p className='logo-title'>Pocket Chef</p>
      </div>
      <div className="nav-icon-container">
        <div className="home-nav-icon nav-icon">
          <p>Home</p>
        </div>
          <div className="recipe-nav-icon nav-icon">
            <p>Recipe</p>
          </div>
            <div className="community-nav-icon nav-icon">
                <p>Community</p>
            </div>
          <div className="aboutus-nav-icon nav-icon">
            <p>About Us</p>
          </div>
          <Link to="/calculator" className="calculator-nav-icon nav-icon no-underline">
  <p>Calculator</p>
</Link>

          
      </div>
      <div className="login-container">
            <div className="search-icon">
                <img src="./nav/search.png" className="search-icon"/>
            </div>
            <div className="login-icon">
                <img src="./nav/login.png" className="login-icon"/>
            </div>
      </div>
    </div>
  );
};

export default NavBar;