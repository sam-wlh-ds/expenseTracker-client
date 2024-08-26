import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 

function ToggleButton({cls, tog}){
    return(
        <button 
            className={cls}
            onClick={tog} 
            type="button" 
            aria-label="Toggle navigation"
        >
            ☰
        </button>
    )
}

function AuthNavBar() {
  const isSmallWidth = window.innerWidth < 900;

  const [isSidebarOpen, setSidebarOpen] = useState(isSmallWidth? false:true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  if (isSmallWidth && !isSidebarOpen){
    return(
        <nav className='nav'>
            <ToggleButton cls={"s-toggle-closed"} tog={toggleSidebar}/>
        </nav>
    )
  }
  else if (!isSidebarOpen){
    return(
        <nav className='nav'>
            <ToggleButton cls={"s-toggle-closed"} tog={toggleSidebar}/>
        </nav>
    )
  }
  return (
    <nav className={`nav sidebar ${(isSidebarOpen) ? 'show' : ''}`}>
      <ToggleButton cls={"s-toggle btn btn-sm btn-outline-secondary"} tog={toggleSidebar}/>
      <ul className='nav-redirects'>
        <li>
          <Link to="/login" className="nav-link active">Login</Link>
        </li>
        <li>
          <Link to="/register" className="nav-link active">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AuthNavBar;
