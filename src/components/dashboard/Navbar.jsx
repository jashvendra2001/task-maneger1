import React, { useState, useEffect } from 'react';
import "./nav.css";
import { searchingData } from '../../data';
import { CiSearch } from "react-icons/ci";

const Navbar = ({ onAddClick, onSearchChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const handleSearching = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      onSearchChange(searchQuery);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, onSearchChange]);

  const handleSearingButton = () => {
    onSearch();
  };

  return (
    <div className='container-fluid navBar'>
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              onChange={handleSearching}
              value={searchQuery}
              placeholder="Search..."
            />
            <button className="btn btn-outline-secondary" onClick={handleSearingButton}>
              <CiSearch />
            </button>
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end align-items-center">
          <div className="sorting me-3">
            <select className="form-select" onChange={onSearch}>
              <option value="sortedBy">Sorted By</option>
              <option value="Priority">Priority-Task</option>
              <option value="Date">Date</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={onAddClick}>
            Add/Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
