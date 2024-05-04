import React from "react";
import typeicon from "../assets/ff14icon.png";

function Mount({ mount }) {
    
  return (
    <>
      <div className="mounts__card">
        <figure className="mounts__img--wrapper">
          <img className="mounts__img" src={mount.image} alt="" />
        </figure>
        <div className="mounts__content--wrapper">
          <div className="mounts__content">
            <h4 className="mounts__title">{mount.name}</h4>
            <div className="mounts__source--wrapper">
              <img className="mounts__source--img" src={typeicon} alt="" />
              <p className="mounts__source">{mount.sources[0].type}</p>
            </div>
            <div className="mounts__tags">
              <p className="mounts__patch">Patch:{mount.patch}</p>
              <p className="mounts__owners">{mount.owned}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mount;
