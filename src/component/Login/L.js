import React, { useState } from "react";
import './reg.css';
import  Login  from "./Login"; // add {Login}
import  Register  from "./Register";  


export default function L() {

  
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> :  <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}

//  ReactDOM.render(<L /> , document.getElementById('root'))
// export default L; 

