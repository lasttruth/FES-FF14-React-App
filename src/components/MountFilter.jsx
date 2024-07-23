import React, { useState } from "react";

function MountFilter({ onFilterChange }) {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedFilter(value);
    onFilterChange(value);
  };

  return (
    <>
      <select
        name=""
        id="filter"
        value={selectedFilter}
        onChange={handleChange}
      >
        <option value="" disabled selected>
          Expansion
        </option>
        <option value="ALL">ALL</option>
        <option value="ARR">A Realm Reborn</option>
        <option value="HW">Heavensward</option>
        <option value="SB">Stormblood</option>
        <option value="ShB">Shadowbringers</option>
        <option value="EW">Endwalker</option>
        <option value="DT">Dawntrail</option>
      </select>
    </>
  );
}

export default MountFilter;
