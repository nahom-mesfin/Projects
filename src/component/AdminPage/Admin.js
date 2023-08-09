import Nav from "../../Nav";
import React from "react";
import { Link } from "react-router-dom";


function Admin() {
  return (
    <>
      <Nav />

      <div className="Admin-Main">

       
        <div className="Admin-border">
        <h1 className="Admin-H1">Welcome To The Admin Page</h1>

        <div className="admin-borders">
          <Link to="/deletepage">
            <button className="admin-button">Delete Tender</button>
          </Link>
          <Link to="/AdminAdd">
            <button className="admin-button">Add Tender</button>
          </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;