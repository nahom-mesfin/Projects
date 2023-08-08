import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './DeletePage.css'; // Import the CSS file

function DeletePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tender, setTender] = useState(null);

  useEffect(() => {
    // Fetch the tender based on the search query
    if (searchQuery) {
      axios
        .get(`/api/tenders?title=${searchQuery}`) // Update the URL format
        .then((response) => {
          const data = response.data;
          if (data.length > 0) {
            setTender(data[0]);
          } else {
            setTender(null);
          }
        })
        .catch((error) => {
          console.error('Error fetching tender:', error);
          // Handle the error
        });
    } else {
      setTender(null);
    }
  }, [searchQuery]);

  const handleDelete = () => {
    if (tender) {
      // Send a DELETE request to the backend API to delete the tender
      axios
        .delete(`/api/tenders/${tender._id}`)
        .then((response) => {
          if (response.status === 200) {
            // Show a success message
            alert('Tender deleted successfully!');
            // Perform any additional actions after deletion
            setTender(null);
            setSearchQuery('');
          } else {
            throw new Error('Failed to delete tender');
          }
        })
        .catch((error) => {
          console.error('Error deleting tender:', error);
          // Show an error message
          alert('Failed to delete tender');
        });
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setTender(null);
  };

  return (
    <div className="Add-Main">
      <div className="Add-border">
        <h2 className="Add-H2">Delete Tender</h2>
        <div className="add-form-group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Tender"
            className="add-form-input"
          />
          <button onClick={handleClear} type="button">
            Clear
          </button>
        </div>
        <div className="DeletePage-tender">
          <p className="DeletePage-tender-info">Title: {tender && tender.title}</p>
          <p className="DeletePage-tender-info">Description: {tender && tender.description}</p>
          <p className="DeletePage-tender-info">Closing Date: {tender && tender.closingDate}</p>
          <p className="DeletePage-tender-info">Budget: {tender && tender.budget}</p>
          <p className="DeletePage-tender-info">Status: {tender && tender.status}</p>
          <p >Type: {tender && tender.type}</p>
          <button onClick={handleDelete} type="button" className="add-form-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePage;
