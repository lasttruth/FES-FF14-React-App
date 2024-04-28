import React from "react";

function Header() {
  return (
    <>
      <nav>
        <a href="#">
          <img id="site-logo" src="./assests/ff14icon.png" alt="" />
        </a>
        <ul class="nav__link--list">
          <li class="nav__link">
            <a class="nav__link--anchor link__hover--effect" href="#">
              Home
            </a>
          </li>
          <li class="nav__link">
            <a class="nav__link--anchor link__hover--effect" href="mounts.html">
              Find A Mount
            </a>
          </li>
          <li class="nav__link">
            <a class="nav__link--anchor link__hover--effect" href="#">
              Contact
            </a>
          </li>
        </ul>

        <button class="btn__menu" onclick="openMenu()">
          <i class="fas fa-bars"></i>
        </button>
        <div class="menu__backdrop">
          <button class="btn__menu btn__menu--close" onclick="closeMenu()">
            <i class="fas fa-times"></i>
          </button>

          <ul class="menu__links">
            <li class="menu__list">
              <a href="" class="menu__link" onclick="closeMenu()">
                Home
              </a>
            </li>
            <li class="menu__list">
              <a href="mounts.html" class="menu__link" onclick="closeMenu()">
                Find A Mount
              </a>
            </li>
            <li class="menu__list">
              <a href="" class="menu__link no-cursor">
                Contacts
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
