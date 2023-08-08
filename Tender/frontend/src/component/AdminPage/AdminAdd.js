import React, { useState } from "react";

function AdminAdd() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Generate a unique ID for the new tender
    const id = Date.now(); // Use the current timestamp as the ID

    // Create a new tender object
    const newTender = {
      id,
      title,
      description,
      closingDate,
      budget,
      status,
      type,
    };

    console.log("Sending request to backend:", newTender);

    // Send a POST request to the backend API to add the tender
    fetch("/api/tenders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTender),
    })
      .then((response) => {
        if (response.ok) {
          // Show a success message
          alert("Tender added successfully!");
          // Reset the form fields
          setTitle("");
          setDescription("");
          setClosingDate("");
          setBudget("");
          setStatus("");
          setType("");
        } else {
          throw new Error("Failed to add tender");
        }
      })
      .catch((error) => {
        console.error("Error adding tender:", error);
        // Show an error message
        alert("Failed to add tender");
      });
  };

  return (
    <div className="Add-Main">
      <div className="Add-border">
        <h2 className="Add-H2">Add Tender</h2>
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="add-form-group">
            <label className="add-form-label">Title:</label>
            <input
              className="add-form-input"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="add-form-group">
            <label className="add-form-label">Description:</label>
            <textarea
              className="add-form-input admin-form-textarea"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }></textarea>
          </div>
          <div className="add-form-group">
            <label className="add-form-label">Closing Date:</label>
            <input
              className="add-form-input"
              type="date"
              value={closingDate}
              onChange={(event) => setClosingDate(event.target.value)}
            />
          </div>
          <div className="add-form-group">
            <label className="add-form-label">Budget:</label>
            <input
              className="add-form-input"
              type="number"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
            />
          </div>
          <div className="add-form-group">
            <label className="add-form-label">Status:</label>
            <input
              className="add-form-input"
              type="text"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            />
          </div>
          <div className="add-form-group">
            <label className="add-form-label">Type:</label>
            <input
              className="add-form-input"
              type="text"
              value={type}
              onChange={(event) => setType(event.target.value)}
            />
          </div>
          <button className="add-form-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAdd;
