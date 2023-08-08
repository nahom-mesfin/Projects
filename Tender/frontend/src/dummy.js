import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TenderCard = ({ tender }) => {
  return (
    <div className="card-main">
      <h3>
        <Link to={`/landingpage/${tender.id}`}>{tender.title}</Link>
     </h3>
  
      <p>{tender.description}</p>
      <p>Closing Date: {tender.closingDate}</p>
      <p>Budget: ${tender.budget}</p>
      <p>Status: {tender.status}</p>
      <p className="tender-type">{tender.type}</p>
    </div>
  );
};

const FrontPage = ({ searchTerm }) =>  {
  const tenders = [
    // existing tender data

    {
            id: 1,
            title: "Supply of Office Furniture",
            description: "Procurement of office furniture including desks, chairs, and cabinets.",
            closingDate: "2023-09-15",
            budget: 5000,
            status: "Open",
            type: "Free",
          },
          {
            id: 2,
            title: "Construction of New Building",
            description: "Construction of a new commercial building with three floors.",
            closingDate: "2023-10-10",
            budget: 100000,
            status: "Open",
            type: "Free",
          },
          {
            id: 3,
            title: "IT Infrastructure Upgrade",
            description: "Upgrading the existing IT infrastructure including servers, networking equipment, and software.",
            closingDate: "2023-09-30",
            budget: 25000,
            status: "Closed",
            type: "Free",
          },
          
          {
            id: 4,
            title: "Website Redesign",
            description: "Redesigning the company website for improved user experience.",
            closingDate: "2023-09-25",
            budget: 15000,
            status: "Open",
            type: "Free",
          },
          {
            id: 5,
            title: "Marketing Campaign",
            description: "Planning and executing a marketing campaign for a new product launch.",
            closingDate: "2023-09-20",
            budget: 20000,
            status: "Open",
            type: "Free",
          },
          {
            id: 6,
            title: "Software Development",
            description: "Developing custom software for business management.",
            closingDate: "2023-09-18",
            budget: 30000,
            status: "Open",
            type: "Free",
          },
          {
            id: 7,
            title: "Graphic Design Services",
            description: "Providing graphic design services for branding and marketing materials.",
            closingDate: "2023-09-23",
            budget: 8000,
            status: "Open",
            type: "Free",
          },
          {
            id: 8,
            title: "Event Management",
            description: "Organizing and managing corporate events and conferences.",
            closingDate: "2023-09-28",
            budget: 50000,
            status: "Open",
            type: "Free",
          },
          {
            id: 9,
            title: "Data Analysis",
            description: "Analyzing and interpreting data to provide insights for business decisions.",
            closingDate: "2023-09-22",
            budget: 12000,
            status: "Open",
            type: "Free",
          },
          {
            id: 10,
            title: "Content Writing",
            description: "Creating high-quality content for websites, blogs, and marketing materials.",
            closingDate: "2023-09-17",
            budget: 6000,
            status: "Open",
            type: "Free",
          },
  ];

  useEffect(() => {
    const searchTenders = async () => {
      try {
        // Make the API request to search tenders based on the title using the searchTerm
        const response = await fetch(`/api/tenders?title=${searchTerm}`);
        
        // Check if the API request was successful
        if (response.ok) {
          // Parse the response data
          const data = await response.json();
          
          // Update the state or perform any necessary logic with the search results
          console.log(data); // Example: Logging the search results
        } else {
          // Handle the error if the API request fails
          console.error('Failed to search tenders');
        }
      } catch (error) {
        // Handle any other errors that occur during the API request
        console.error('Error searching tenders:', error);
      }
    };
  
    // Call the searchTenders function when the searchTerm changes
    searchTenders();
  }, [searchTerm]);

  return (
    <div className="front-page">
      <h1>All Tender Listings</h1>
      <div className="card-container">
        {tenders.map((tender) => (
          <TenderCard key={tender.id} tender={tender} />
        ))}
      </div>
    </div>
  );
};

export { FrontPage, TenderCard };

