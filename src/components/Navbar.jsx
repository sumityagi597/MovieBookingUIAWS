import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [isLoggedIn, location]);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-nav p-4">
      <div className="flex justify-between items-center">
      {!isLoggedIn && (<div
        className="text-white font-bold text-xl"
        style={{ textAlign: "right" }}
      >
        <p>Welcome! {isLoggedIn && (<span>{sessionStorage.getItem('loginId')}</span>)} {!isLoggedIn && (<span>Guest</span>)}</p>
      </div>
      )}
      <div className="text-white font-bold text-xl" id="bookedTickets">
      {isLoggedIn && (
          <button
            className="mx-4 bg-grey-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/bookedTickets")}
          >
            Booked Movies
          </button>
        )}
      </div>
      </div>

      <div className="text-white font-bold text-xl">
        <button
          className="hover:font-extrabold"
          onClick={() => navigate("/movieList")}
        >
          Movie Booking App
        </button>
      </div>

      <div className="flex items-center">
        {!isLoggedIn && (
          <div>
            <button
              onClick={() => navigate("/register")}
              className="mx-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>

            <button
              onClick={() => navigate("/login")}
              className="mx-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
        )}
        {isLoggedIn && (
          <button
          id="logoutbtn"
            className="mx-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
