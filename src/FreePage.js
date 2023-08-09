import React, { useState, useEffect } from 'react';
import Nav from './Nav';

function FreePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingTenders, setMatchingTenders] = useState([]);
  const [showTenders, setShowTenders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [freeTenders, setFreeTenders] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setMatchingTenders([]);
    setShowTenders(false);
  };

  useEffect(() => {
    setLoading(true);

    // Fetch all free tenders
    fetch('/api/freetenders')
      .then((response) => response.json())
      .then((data) => setFreeTenders(data))
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    // Fetch tenders based on the search term
    fetch(`/api/freetenders?title=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setMatchingTenders(data);
        setShowTenders(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      setShowTenders(false);
    };
  }, [searchTerm]);

  return (
    <div className="homepage">
      <Nav />

      <div className="content">
        <div className="search-element">
          <input type="text" value={searchTerm} onChange={handleSearch} className="search-input" />
          <div className="search-buttons">
            <button className="btn-search" onClick={() => setShowTenders(true)}>
              <label>Search</label>
            </button>
            <button className="btn-clear" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>

        <div className="cards">
          {
             showTenders ? (
            matchingTenders.map((tender) => (
              <div className="card-main" key={tender._id}>
                <h3>{tender.title}</h3>
                <p>{tender.description}</p>
                <p>Closing Date: {tender.closingDate}</p>
                <p>Budget: ${tender.budget}</p>
                <p>Status: {tender.status}</p>
                <p className="tender-type">{tender.type}</p>
              </div>
            ))
          ) : (
            // Render the free tenders if no search is performed
            freeTenders.map((tender) => (
              <div className="card-main" key={tender._id}>
                <h3>{tender.title}</h3>
                <p>{tender.description}</p>
                <p>Closing Date: {tender.closingDate}</p>
                <p>Budget: ${tender.budget}</p>
                <p>Status: {tender.status}</p>
                <p className="tender-type">{tender.type}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FreePage;
