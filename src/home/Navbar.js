import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-green-600 p-5 shadow-lg">
      <div className="container mx-auto">
        <ul className="flex  space-x-8 text-white font-semibold">
          <li>
            <Link
              to="/"
              className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-500 hover:shadow-md hover:scale-105"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-500 hover:shadow-md hover:scale-105"
            >
              Calculator
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-500 hover:shadow-md hover:scale-105"
            >
              Weather
            </Link>
          </li>
          <li>
            <Link
              to="/todo"
              className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-500 hover:shadow-md hover:scale-105"
            >
              Todolist
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;