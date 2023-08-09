// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const LandingPage = () => {
//   const { id } = useParams();
//   const [tender, setTender] = useState(null);

//   useEffect(() => {
//     fetch(`/api/dummyData/${id}`)
//       .then((response) => response.json())
//       .then((data) => setTender(data))
//       .catch((error) => console.error('Error:', error));
//   }, [id]);

//   if (!tender) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="landing-page">
//       <h1>{tender.title}</h1>
//       <p>{tender.description}</p>
//       <p>Closing Date: {tender.closingDate}</p>
//       <p>Budget: ${tender.budget}</p>
//       <p>Status: {tender.status}</p>
//       <p className="tender-type">{tender.type}</p>
//     </div>
//   );
// };

// export default LandingPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const { id } = useParams();
  const [tender, setTender] = useState(null);

  useEffect(() => {
    const fetchTender = async () => {
      try {
        const response = await axios.get(`/api/tenders/${id}`);
        setTender(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTender();
  }, [id]);

  if (!tender) {
    return <div>Loading...</div>;
  }

  return (
    <div className="landing-page">
      <h1>{tender.title}</h1>
      <p>{tender.description}</p>
      <p>Closing Date: {tender.closingDate}</p>
      <p>Budget: ${tender.budget}</p>
      <p>Status: {tender.status}</p>
      <p className="tender-type">{tender.type}</p>
    </div>
  );
};

export default LandingPage;