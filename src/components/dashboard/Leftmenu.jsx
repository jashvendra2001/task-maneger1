import React from 'react';
import "./left.css";
import { FaWindows } from "react-icons/fa";

const Leftmenu = () => {
  return (
    <div className='leftMenu d-none d-md-flex flex-column align-items-center py-3'>
      <div className="taskButton  text-center w-100">
        Task-Manager
      </div>  

      <div className="totaltask d-flex align-items-center justify-content-center my-2 w-100">
        <FaWindows className="me-2" /> 
        DashBoard
      </div>
    </div>
  );
}

export default Leftmenu;
