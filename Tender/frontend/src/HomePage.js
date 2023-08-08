import Nav from './Nav';
import { FrontPage } from './dummy';
import React, { useState, useEffect } from 'react';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingTenders, setMatchingTenders] = useState([]);
  const [showTenders, setShowTenders] = useState(false);
  const [newlyCreatedTender, setNewlyCreatedTender] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setMatchingTenders([]);
    setShowTenders(false);
  };

  useEffect(() => {
    fetch(`/api/tenders?title=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setMatchingTenders(data);
        setShowTenders(true);
      })
      .catch((error) => console.error('Error:', error));

    return () => {
      setShowTenders(false); // Reset showTenders when component unmounts
    };
  }, [searchTerm]);

  useEffect(() => {
    if (newlyCreatedTender) {
      setLoading(true);

      fetch(`/api/tenders/${newlyCreatedTender}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch newly created tender');
          }
        })
        .then((data) => {
          setMatchingTenders([data]);
          setShowTenders(true);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching newly created tender:', error);
          setLoading(false);
        });
    }
  }, [newlyCreatedTender]);

  return (
    <div>
      <Nav />
      <div className="homepage">
        <div className="content">
          <div className="search-element">
            <div className="search-bar">
              <input type="text" value={searchTerm} onChange={handleSearch} className="search-input" />
              <div className="search-buttons">
                <button className="btn-search">
                  <label>Search</label>
                </button>
                <button className="btn-clear" onClick={handleClear}>
                  Clear
                </button>
              </div>
            </div>
            <div className="search-results">
              {loading ? (
                <p>Loading tender...</p>
              ) : matchingTenders.length === 0 && showTenders ? (
                <p>No search results found.</p>
              ) : showTenders ? (
                matchingTenders.map((tender) => (
                  <div key={tender.id}>
                    <h3><strong>{tender.title}</strong></h3>
                    <p>{tender.description}</p>
                    <p>Closing Date: {tender.closingDate}</p>
                    <p>Budget: {tender.budget}</p>
                    <p>Status: {tender.status}</p>
                  </div>
                ))
              ) : null}
            </div>
          </div>
          <div className="cards">
            <div className="card-large">
              <FrontPage searchTerm={searchTerm} />
            </div>
          </div>
          <div className="card-small">
            ads here
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;