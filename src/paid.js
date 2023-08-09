// import React, { useState, useEffect } from 'react';
// import Nav from './Nav';

// function PaidPage() {
// const [paidTenders, setPaidTenders] = useState([]);

// useEffect(() => {
// fetch('/api/paidtenders')
// .then((response) => response.json())
// .then((data) => setPaidTenders(data))
// .catch((error) => console.error('Error:', error));
// }, []);

// return (
// <div className="homepage">
// <Nav />

// {paidTenders.map((tender) => (
//       <div className="card-main" key={tender._id}>
//         <h3>{tender.title}</h3>
//         <p>{tender.description}</p>
//         <p>Closing Date: {tender.closingDate}</p>
//         <p>Budget: ${tender.budget}</p>
//         <p>Status: {tender.status}</p>
//         <p className="tender-type">{tender.type}</p>
//       </div>
//     ))}
//   </div>
//   );
// }

// export default PaidPage;
 





import React, { useState, useEffect } from 'react';
import Nav from './Nav';

function PaidPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingTenders, setMatchingTenders] = useState([]);
  const [showTenders, setShowTenders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paidTenders, setPaidTenders] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setMatchingTenders([]);
    setShowTenders(false);
  };

  useEffect(() => {
    setLoading(true); // Set loading state to true

    // Fetch tenders based on the search term
    fetch(`/api/paidtenders?title=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setMatchingTenders(data);
        setShowTenders(true);
        setLoading(false); // Set loading state to false after data is fetched
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); // Set loading state to false in case of an error
      });

    return () => {
      setShowTenders(false); // Reset showTenders when the component unmounts
    };
  }, [searchTerm]);

  useEffect(() => {
    // Fetch all paid tenders
    fetch('/api/paidtenders')
      .then((response) => response.json())
      .then((data) => setPaidTenders(data))
      .catch((error) => console.error('Error:', error));
  }, []); // Empty dependency array to fetch only once on component mount

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
          {loading ? (
            <p>Loading tenders...</p>
          ) : matchingTenders.length === 0 && showTenders ? (
            <p>No search results found.</p>
          ) : showTenders ? (
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
            // Render the paid tenders if no search is performed
            paidTenders.map((tender) => (
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

        <div className="card-small">
          ads here
        </div>
      </div>
    </div>
  );
}

export default PaidPage;

