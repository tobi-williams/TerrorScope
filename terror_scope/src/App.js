import './App.css';
//import AdminLogin from './AdminLogin';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

  // Function to update the search term state as the user types
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle what happens when the search button is clicked
  const handleSearchClick = () => {
    console.log('Search for:', searchTerm); // For now, just log the search term
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
          <div className="search">
          <select class="dropdown-filter">
              <option value="">Filter</option>
              <option value="option1">Location</option>
              <option value="option2">Year</option>
              <option value="option3">Group</option>
              <option value="option3">Weapon Type</option>
            </select>

            <input 
              type="text" 
              className="searchTerm" 
              placeholder="Search our extensive database"
              value={searchTerm}
              onChange={handleInputChange}
            />
            
            <button 
              type="submit" 
              className="searchButton"
              onClick={handleSearchClick}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
