import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/ff14icon.png'

function Header() {
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
            <Link className="nav__link--anchor link__hover--effect" to="/">
              Find A Mount
            </Link>
          </li>
          <li className="nav__link">
            <Link className="nav__link--anchor link__hover--effect" to="/">
              Contact
            </Link>
          </li>
        </ul>

        <button className="btn__menu" onclick="openMenu()">
          <i className="fas fa-bars"></i>
        </button>
        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onclick="closeMenu()">
            <i className="fas fa-times"></i>
          </button>

          <ul className="menu__links">
            <li className="menu__list">
              <Link className="menu__link" onclick="closeMenu()">
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
