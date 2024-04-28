import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <div class="container">
          <div class="row">
            <div class="footer__list">
              <Link to="/" class="footer__link">
                Home
              </Link>
              <Link to="#" class="footer__link">
                Mounts
              </Link>
              <Link to="#" class="footer__link">
                Contact
              </Link>
            </div>
            <div class="footer__copyright">
              Copyright &copy; 2023 FFXIV Collectors
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
