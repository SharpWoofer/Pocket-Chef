import React from 'react';
import { FcGoogle } from 'react-icons/fc'; 
import { FaFacebook } from 'react-icons/fa'; 
import { AiFillApple } from 'react-icons/ai'; 
import './LoginPage.css'; 
import NavBar from "../navBar";
function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleSocialSignIn = (provider) => {
    console.log(`Sign in with ${provider}`);
  };

  return (
    <>
    <NavBar/>
    <div className="login-page-container">
      <div className="login-container">
        <h2 className="welcome-back-text">Welcome Back</h2>
        <p className="login-description-rounded">
          Sign in to track your progress, or register to personalize your fitness journey with custom workout plans, calorie tracking, and more.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" placeholder="User name, Email & Phone number" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <div className="signin-button">
            <button type="submit">Sign in</button>
          </div>
          
          <div className="divider-container">
            <div className="divider-line"></div>
            <span className="divider-text">Or sign up with</span>
            <div className="divider-line"></div>
          </div>
          
          {/* Social buttons section */}
          <div className="social-icons-container">
            <FcGoogle className="social-icon google-icon" onClick={() => handleSocialSignIn('Google')} /> 
            <FaFacebook className="social-icon facebook-icon" onClick={() => handleSocialSignIn('Facebook')} />
            <AiFillApple className="social-icon apple-icon" onClick={() => handleSocialSignIn('Apple')} />
          </div>
          
        </form>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
