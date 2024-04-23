import './App.css';
//import AdminLogin from './AdminLogin';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

  const [dropdownFilter, setFilterTerm] = useState(''); // State to store the filter term

  // Function to update the search term state as the user types
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to update the filter term state as the user selects
  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
  };

  // Function to handle what happens when the search button is clicked
  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Submitting search for:', searchTerm, 'with filter:', dropdownFilter); // For now, just log the search term
    // Here, you might set another state to trigger a re-render or display search results
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
          </div>
          <div className="nav-links admin">
            <a href="/admin">Administrator</a>
          </div>
        </nav>
        <div className="body">
          <div className="titleText">
            <h1>TerrorScope - Explore the World's Timeline of Terrorism</h1>
          </div>
          <form className="searchForm" onSubmit={handleSearch}>
            <select
              className="dropdownFilter"
              name="dropdownFilter"
              value={dropdownFilter}
              onChange={handleFilterChange}
            >
              <option value="">Filter</option>
              <option value="location">Location</option>
              <option value="year">Year</option>
              <option value="group">Group</option>
              <option value="weapon">Weapon Type</option>
            </select>

            <input 
              type="text" 
              name="searchTerm"
              className="searchTerm" 
              placeholder="Search our extensive database"
              value={searchTerm}
              onChange={handleInputChange}
            />
            
            <button 
              type="submit" 
              className="searchButton"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
