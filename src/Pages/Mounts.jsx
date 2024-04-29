import axios from "axios";
import React, { useEffect, useState } from "react";
import typeicon from '../assets/ff14icon.png'
//import { useParams } from "react-router-dom";

function Mounts() {
  //const { id } = useParams;
  const [mounts, setMounts] = useState([]);

  async function fetchMounts() {
    const { data } = await axios.get("https://ffxivcollect.com/api/mounts");
    console.log(data.results);
    setMounts(data.results);
  }

  useEffect(() => {
    fetchMounts();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="mounts__header">
            <div>
              <h2 className="mounts__header--title">
                All <span className="secondary"> Mounts </span>
              </h2>
            </div>
          </div>
          {/* {<div className="mounts__list"></div>} */}
          <div className="mounts__list">
            {mounts.map((mount) => (
              <div className="mounts__card">
                <figure className="mounts__img--wrapper">
                  <img className="mounts__img" src={mount.image} alt="" />
                </figure>
                <div className="mounts__content--wrapper">
                  <div className="mounts__content">
                    <h4 className="mounts__title">{mount.name}</h4>
                    <div className="mounts__source--wrapper">
                      <img
                        className="mounts__source--img"
                        src={typeicon}
                        alt=""
                      />
                      <p className="mounts__source">{mount.sources[0].type}</p>
                    </div>
                    <div className="mounts__tags">
                      <p className="mounts__patch">Patch:{mount.patch}</p>
                      <p className="mounts__owners">{mount.owned}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="button__wrapper">
              <button className="show-more button__arrow">Show More!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mounts;
