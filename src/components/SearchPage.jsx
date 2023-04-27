import React, { useState } from 'react';
import JobList from './Joblist';

function SearchPage() {
  const [searchTerms, setSearchTerms] = useState({ title: '', location: '', fullTimeOnly: false });
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setSearchTerms((prevTerms) => ({ ...prevTerms, [name]: inputValue }));
  };

  const handleSearchClick = () => {
    setIsLoading(true);
    setError(null);
    // Send search terms to the server to get the matching results
    const fullTimeOnlyValue = searchTerms.fullTimeOnly ? '&full_time=true' : '';
    fetch(`http://localhost:8000/jobs?search=${searchTerms.title}&location=${searchTerms.location}${fullTimeOnlyValue}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Error fetching search results.');
        setIsLoading(false);
        console.error('Error fetching search results:', error);
      });
  };

  return (
    <div>
      <div className='search-container'>
        <div className='search-content'>
          <img src="../img/icon-search.svg" alt="" />
          <input className='search-input' type="text" name="title" placeholder='Filter by title, companies, expertise…' value={searchTerms.title} onChange={handleInputChange} />
          <img src="../img/icon-location.svg" alt="" />
          <input className='search-input' type="text" name="location" placeholder='Filter by location…' value={searchTerms.location} onChange={handleInputChange} />
          <label className='check-container'>
            <input type="checkbox" name="fullTimeOnly" checked={searchTerms.fullTimeOnly} onChange={handleInputChange} />
            Full Time Only
          </label>
          <button onClick={handleSearchClick}>Search</button>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {searchResults.length > 0 ? <JobList jobs={searchResults} /> : null}
    </div>
  );
}

export default SearchPage;
