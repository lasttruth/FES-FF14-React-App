import React from "react";
import Searchbar from "../UI/Searchbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleSearchFromHome = (query) => {
    if (query.trim() !== "") {
      // Redirect to the mounts page with the search query
      navigate(`/mounts?name_en_end=${query}`);
    } else {
      // Redirect to the mounts page without the search query
      navigate("/mounts");
    }
  }
  return (
    <>
      <header className="header_section">
        <div className="landing__background--img hs-text">
          <div className="container">
            <div className="hs-text">
              <h2 className="hs__title">Find Your Next</h2>
              <h2 className="hs__title">
                <span className="secondary">Mount</span> Here
              </h2>
              <p className="hs__para">
                Are you a newcomer to Final Fantasy 14, yearning for a dazzling
                new mount? Delve into our website for an extensive guide,
                unveiling the myriad ways to obtain mounts – from thrilling
                quests and events to hidden vendors – ensuring a swift and
                stylish ride across Eorzea.
              </p>
              <Searchbar onSearch={handleSearchFromHome} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Home;
