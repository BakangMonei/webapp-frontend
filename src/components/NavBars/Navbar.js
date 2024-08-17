import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Olympic Games</div>
        <div>
          <Link to="/RegistrationPage" className="text-white mx-2">Sign Up</Link>
          <Link to="/LoginPage" className="text-white mx-2">Log In</Link>
          <Link to="/sports" className="text-white mx-2">View Sports</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
