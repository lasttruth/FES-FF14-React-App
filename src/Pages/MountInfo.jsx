import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import typeicon from "../assets/ff14icon.png";
import axios from "axios";

function Mountsmount() {
  const [mount, setMounts] = useState([]);
  const [isPlaying] = useState(false);
  const { id } = useParams();

  async function renderMounts() {
    try {
      const { data } = await axios.get(
        `https://ffxivcollect.com/api/mounts/${id}`
      );
      setMounts(data);
    } catch (error) {
      console.error("Error fetching mountss:", error);
    }
  }

  function tradeable(trade) {
    if (trade) {
      return "Yes";
    } else {
      return "No";
    }
  }

  useEffect(() => {
    renderMounts();
  }, [id]);
  return (
    <>
      <main id="mount">
        <div className="container">
          <div className="row">
            <div className="mount__card">
              <div className="mount__wrapper">
                <div className="mount__img--wrapper">
                  <figure className="mount__img">
                    <img src={mount.image} alt="" />
                  </figure>
                </div>
                <div className="mount__content--wrapper">
                  <div className="mount__name">
                    <div>
                      <img
                        className="mount__name--img"
                        src={mount.icon}
                        alt=""
                      />
                      <span className="mount__name--txt">{mount.name}</span>
                    </div>
                    <div></div>
                  </div>
                  <div className="mount__stats--wrapper">
                    <div>
                      <dt>Movement</dt>
                      <dd>{mount.movement}</dd>
                    </div>
                    <div>
                      <dt>Tradeable</dt>
                      <dd>{tradeable(mount.tradeable)}</dd>
                    </div>
                    <div>
                      <dt>Seats</dt>
                      <dd>{mount.seats}</dd>
                    </div>
                    <div>
                      <dt>% Owned</dt>
                      <dd>{mount.owned}</dd>
                    </div>
                    <div>
                      <dt>Patch</dt>
                      <dd>{mount.patch}</dd>
                    </div>
                  </div>
                  <h3 className="mount__source">Where to get:</h3>
                  <dd>
                    <div className="sources">
                      <img className="sources__img" src={typeicon} alt="" />
                      <Link
                        to={
                          mount.sources && mount.sources.length > 0
                            ? `https://www.google.com/search?q=${mount.sources[0].text}`
                            : ""
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mount__link"
                      >
                        {mount.sources && mount.sources.length > 0
                          ? mount.sources[0].text
                          : "Source not available"}
                      </Link>
                    </div>
                  </dd>

                  <h3 className="mount__source">Description:</h3>
                  <dd>{mount.description}</dd>
                  <h3 className="mount__source">Journal:</h3>
                  <dd>{mount.enhanced_description}</dd>
                  <div className="mount__music">
                    {!mount.bgm ? (
                      <h3 className="mount__source">No Music Preview.</h3>
                    ) : (
                      <>
                        <h3 className="mount__source">Music Preview:</h3>
                        <audio
                          src={mount.bgm}
                          controls={true}
                          autoPlay={isPlaying}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Mountsmount;
