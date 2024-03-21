import "./style.css";
import RecipeDetails from "../../view/homePage/RecipeDetails.jsx";
import RecipeDeck from "../../components/recipeDeck/index.jsx";

const HomePage = () => {
  return (
    <div>
      <div className="landing-page-container">
        <div className="landing-page-text">
          <div className="landing-page-text-header">
            <h1>Cooking Made Fun and Easy: Unleash Your Inner Chef</h1>
          </div>
            <div className="landing-page-text-body">
                <p>Discover new recipes, learn new cooking techniques, and explore the world of cooking. Join our community of food lovers and start cooking today!</p>
            </div>
          <div className="button-container">
            <a href="#" className="button type--A">
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text">ENTRY</span>
              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </a>
          </div>
        </div>
        <div className="landing-page-image">
          <img src="/homePage/cooking.png" alt="landing page" />
        </div>
      </div>
      <div className="recipe-container">
        <div className="header-container">
          <div className="header-container-title">
            <p className="header-title">Discover, Create Share</p>
            <p className="header-content">Check our most popular recipes of the week</p>
          </div>
          <div className="see-all-container">
            <a href="#" className=" button type--A">
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text">See All</span>
              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </a>
          </div>
        </div>
        <div className="deck-container">
            <RecipeDeck/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;