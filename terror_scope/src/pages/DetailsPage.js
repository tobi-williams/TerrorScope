import '../styling/SearchResults.css';
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DetailsBody from '../components/DetailsBody';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function DetailsPage() {
    const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
    const [filterTerm, setFilterTerm] = useState(''); // State to store the filter term
    const [data, setData] = React.useState(null);
    const [id, setID] = useState(0);
    const navigate = useNavigate();
    const query = useQuery();

    useEffect(() => {
        setID(query.get('id'));
    }, [query]);
    
    React.useEffect(() => {
        fetch("http://localhost:3001/api/id", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id
                })
            })
            .then(res => {
                if (!res.ok) {
                    // If server status code is not OK, throw an error with the status
                    console.log("HTTP Error");
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                //console.log(res.json());
                console.log("HTTP OK");
                return res.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
            
    }, [id]);
    //console.log(data);
  
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
      console.log('Submitting search for:', searchTerm, 'with filter:', filterTerm); // For now, just log the search term
      // Here, you might set another state to trigger a re-render or display search results
      if (searchTerm !== ''){
        navigate(`/search?s=${encodeURIComponent(searchTerm)}&f=${encodeURIComponent(filterTerm)}`);
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
                {/* Database results go here */}
                {/* {data ? <p>{JSON.stringify(data[0].event_month)}</p> : <p>Loading...</p>} */}
                <div>
                    <h1>Event Details (ID: {id}) </h1>
                    <DetailsBody data={data} />
                </div>
            </main>
        </div>
    );
}

export default DetailsPage;