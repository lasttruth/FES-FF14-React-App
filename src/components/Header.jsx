import React from "react";
import logo from '../assets/ff14icon.png'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Header() {

    function openMenu(){
        document.body.classList += " menu--open"
    }
    
    function closeMenu(){
        document.body.classList.remove('menu--open')
    }

  return (
    <>
      <nav>
        <Link to="/">
          <img id="site-logo" src={logo} alt="" />
        </Link>
        <ul className="nav__link--list">
          <li className="nav__link">
            <Link className="nav__link--anchor link__hover--effect" to="/">
              Home
            </Link>
          </li>
          <li className="nav__link">
            <Link className="nav__link--anchor link__hover--effect" to="mounts">
              Find A Mount
            </Link>
          </li>
          <li className="nav__link">
            <Link className="nav__link--anchor link__hover--effect" to="/">
              Contact
            </Link>
          </li>
        </ul>

        <button className="btn__menu" onClick={() => openMenu()}>
          <FontAwesomeIcon icon={faBars} className="fas fa-bars"/>
        </button>
        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onClick={() => closeMenu()}>
            < FontAwesomeIcon icon={faTimes} className="fas fa-times"/>
          </button>

          <ul className="menu__links">
            <li className="menu__list">
              <Link to='/' className="menu__link" onclick="closeMenu()">
                Home
              </Link>
            </li>
            <li className="menu__list">
              <Link className="menu__link" onclick="closeMenu()">
                Find A Mount
              </Link>
            </li>
            <li className="menu__list">
              <Link className="menu__link no-cursor" to="">
                Contacts
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
