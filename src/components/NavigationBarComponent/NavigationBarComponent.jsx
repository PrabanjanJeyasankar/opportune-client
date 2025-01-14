import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppLogo from "../../assets/images/opportune_logo_svg.svg";
import tempimage from "../../assets/images/ProjectTemplates/img11.png";
import navBarStyles from "./NavigationBarComponent.module.css";
import HomeFeedResetContext from "@/context/HomeFeedResetContext";
import useHomeFeedResetContext from "@/hooks/useHomeFeedResetContext";

const NavigationBarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const { setSearchTerm } = useHomeFeedResetContext();
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleKeyDown = (event, toggleMenu) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }
  };

  return (
    <header ref={navbarRef} className={navBarStyles.header}>
      <Link to="/" className={navBarStyles.logo} onClick={handleClearSearch}>
        <img src={AppLogo} alt="AppLogo" className={navBarStyles.logo_image} />
        <div className={navBarStyles.app_name}>Opportune</div>
      </Link>

      <nav
        className={`${navBarStyles.navigation_bar} ${
          isMenuOpen ? navBarStyles.show : ""
        }`}
      >
        <Link
          to="/"
          className={`${navBarStyles.link} ${navBarStyles.activeLink}`}
          onClick={{ handleCloseMenu, handleClearSearch }}
        >
          Home
        </Link>
        <Link
          to="/aboutus"
          className={navBarStyles.link}
          onClick={handleCloseMenu}
        >
          About us
        </Link>
        <Link
          to="/feedback"
          className={navBarStyles.link}
          onClick={handleCloseMenu}
        >
          Feedback
        </Link>
        <div className={navBarStyles.authentication_links}>
          <Link
            to="/login"
            className={navBarStyles.link}
            onClick={handleCloseMenu}
          >
            Login
          </Link>
          <Link
            to="/project-input-form"
            className={navBarStyles.signup_button}
            onClick={handleCloseMenu}
          >
            Post your projects!
          </Link>
          <Link to="/" className={navBarStyles.logo}>
            <img
              src={tempimage}
              alt="AppLogo"
              className={navBarStyles.logo_image}
            />
          </Link>
        </div>
      </nav>
      <button
        className={`${navBarStyles.hamburger} ${
          isMenuOpen ? navBarStyles.active : ""
        }`}
        onClick={toggleMenu}
        onKeyDown={(event) => handleKeyDown(event, toggleMenu)}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation menu"
      >
        <span className={navBarStyles.line} />
        <span className={navBarStyles.line} />
      </button>
    </header>
  );
};

export default NavigationBarComponent;
