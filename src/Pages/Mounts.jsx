import axios from "axios";
import React, { useEffect, useState } from "react";
import Mount from "../components/Mount";
import MountFilter from "../components/MountFilter";
import Searchbar from "../UI/Searchbar";
import MountSkeleton from "../UI/MountSkeleton";
import { useLocation } from "react-router-dom";

function Mounts() {
  const [mounts, setMounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMounts, setFilteredMounts] = useState([]);
  const [fitlerTitle, setFilterTitle] = useState("All Mounts");
  const [displayCount, setDisplayCount] = useState(20);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("name_en_end");

  async function fetchMounts() {
    try {
      const { data } = await axios.get("https://ffxivcollect.com/api/mounts");
      setMounts(data.results);
      setFilteredMounts(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching mounts:", error);
    }
  }

  useEffect(() => {
    fetchMounts();
  }, []);

  useEffect(() => {
    if (query) {
      handleSearch(query);
    } else {
      setFilteredMounts(mounts);
      setFilterTitle("All Mounts");
    }
  }, [query, mounts]);

  const filterMounts = (filter) => {
    const expansions = {
      ARR: { min: 2.0, max: 3.0, title: "A Realm Reborn" },
      HW: { min: 3.0, max: 4.0, title: "Heavensward" },
      SB: { min: 4.0, max: 5.0, title: "Stormblood" },
      ShB: { min: 5.0, max: 6.0, title: "Shadowbringers" },
      EW: { min: 6.0, max: 7.0, title: "Endwalker" },
    };

    if (filter in expansions) {
      const { min, max, title } = expansions[filter];
      const filtered = mounts
        .filter((mount) => {
          const patch = parseFloat(mount.patch);
          return patch >= min && patch < max;
        })
        .sort((a, b) => {
          const patchA = parseFloat(a.patch);
          const patchB = parseFloat(b.patch);
          return patchA - patchB;
        });
      setFilteredMounts(filtered);
      setFilterTitle(title);
    } else {
      setFilteredMounts(mounts);
      setFilterTitle("All Mounts");
    }
  };

  const handleFilterChange = (filter) => {
    filterMounts(filter);
  };

  const handleShowMore = () => {
    setDisplayCount(displayCount + 20);
  };

  async function handleSearch(query) {
    try {
      const { data } = await axios.get(
        `https://ffxivcollect.com/api/mounts?name_en_end=${query}`
      );

      if (data.results.length === 0) {
        setFilteredMounts([]);
        setFilterTitle("No results found");
      } else {
        setFilteredMounts(data.results);
        setFilterTitle("Search Results");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      // Handle error gracefully, e.g., display an error message
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="mounts__header">
            <h2 class="mounts__header--title">
              {fitlerTitle} <span class="secondary"> Mounts </span>
            </h2>
            <MountFilter onFilterChange={handleFilterChange} />
          </div>
          <Searchbar onSearch={handleSearch} />
          <div className="mounts__list">
            {loading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <MountSkeleton key={index} />
                ))
              : filteredMounts
                  .slice(0, displayCount)
                  .map((mount) => <Mount  mount={mount} key={mount.id} />)}
          </div>
          {displayCount < filteredMounts.length && (
            <div className="button__wrapper">
              <button
                className="show-more button__arrow"
                onClick={handleShowMore}
              >
                Show More!
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Mounts;
