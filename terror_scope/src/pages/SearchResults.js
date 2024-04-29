import '../styling/SearchResults.css';
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Table from '../components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResults() {
    const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
    const [filterTerm, setFilterTerm] = useState(''); // State to store the filter term
    const [data, setData] = useState(null);
    const [searchClick, setSearchClick] = useState(false);
    const query = useQuery();
    const [runOnce, setRunOnce] = useState(true);

    // Get search term and filter passed in from homepage through URL
    useEffect(() => {
        // This only needs to be done once
        if (runOnce) {
            setSearchTerm(query.get('s'));
            setFilterTerm(query.get('f'));
            console.log(searchTerm);
            setSearchClick(true);
            setRunOnce(false);
        }
        // eslint-disable-next-line
    }, [query]);
    
    // Retrieve requested event information from backend API call
    useEffect(() => {
        if (searchClick) {
            setSearchClick(false);
            
            fetch("http://localhost:3001/api", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    search: searchTerm,
                    filter: filterTerm
                })
            })
            .then(res => {
                if (!res.ok) {
                    // If server status code is not OK, throw an error with the status
                    console.log("HTTP Error");
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                console.log("HTTP OK");
                return res.json();
            })
            .then(data => {
                setData(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
        }
        else {
            return;
        }
        // eslint-disable-next-line
    }, [searchClick]);
  
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
      console.log('Submitting search for:', searchTerm, 'with filter:', filterTerm);

      if (searchTerm !== ''){
        setSearchClick(true);
      }
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
                            value={filterTerm}
                            onChange={handleFilterChange}
                            >
                            <option value="">Filter</option>
                            <option value="location">Location</option>
                            <option value="year">Year</option>
                            <option value="perp">Perpetrator</option>
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
                <div>
                    <h1>Search Results</h1>
                    <Table data={data} />
                </div>
            </main>
        </div>
    );
}

export default SearchResults;