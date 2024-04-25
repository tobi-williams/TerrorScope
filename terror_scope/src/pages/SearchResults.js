import '../styling/SearchResults.css';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchResults() {
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
        <div className="AppSR">
            <header className="App-headerSR">
                <nav className='navbarSR'>
                    <div className="nav-linksSR">
                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        
                    </div>

                    <div className="search">
                        <form className="searchFormSR" onSubmit={handleSearch}>
                            <select
                            className="dropdownFilterSR"
                            name="dropdownFilterSR"
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
                            name="searchTermSR"
                            className="searchTermSR" 
                            value={searchTerm}
                            onChange={handleInputChange}
                            />
                            
                            <button 
                            type="submit" 
                            className="searchButtonSR"
                            >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    </div>

                    <div className="nav-links adminSR">
                        <a href="/admin">Administrator</a>
                    </div>
                </nav>
            </header>

            <main className='content'>
                {/* Database results go here */}
                message
            </main>
        </div>
    );
}

export default SearchResults;