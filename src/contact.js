// import React from 'react';
// import Nav from './Nav';
// import './contact.css';
// import addiswayImage from './component/Image/addiswayImage.png';
// /* Contact.js */

// function Contact() {
//   return (
//     <>
//       <Nav />
//       <div className="contact-container">

//         <div className='left'>
//           <div className="contact-details">
//             <h2>Addisway Tenders</h2>
//             <p>Location: Bole Atlas</p>
//             <p>Phone: 0935303319</p>
//           </div>
//           <div className="about-us-content">
//             <h2>About Our Website</h2>

//             <p className='bigger'> The tender publishing website aims to address the critical need for a centralized and user-friendly
// platform to streamline the process of tender publication and access. In the dynamic landscape of
// business and procurement, organizations often face challenges in efficiently disseminating tender
// opportunities and ensuring that these opportunities reach a diverse pool of interested parties.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Contact;

import React from "react";
import Nav from "./Nav";
import "./contact.css";

function Contact() {
  return (
    <>
      <Nav />
      <div className="contact-container">
        <div className="contact-overlay">
          <div className="left">
            <div className="contact-details">
              <h2>Addisway Tenders</h2>
              <p>Location: Bole Atlas</p>
              <p>Phone: 0935303319</p>
            </div>
            <div className="about-us-content">
              <h2>About Our Website</h2>
              <p className="bigger">
                The tender publishing website aims to address the critical need
                for a centralized and user-friendly platform to streamline the
                process of tender publication and access. In the dynamic
                landscape of business and procurement, organizations often face
                challenges in efficiently disseminating tender opportunities and
                ensuring that these opportunities reach a diverse pool of
                interested parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
