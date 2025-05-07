import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-prime text-BC p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-sans font-semibold tracking-tight">
          Grand Horizon
        </h1>
        <div className="flex space-x-6">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/services">Services</Link>
          <Link className="nav-link" to="/book">Book</Link>
          <Link className="nav-link" to="/menu">Menu</Link>
          <Link className="nav-link" to="/contact">Contact</Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-base font-medium hover:text-second transition duration-200 ease-in-out border-b-2 border-transparent hover:border-H"
            >
              Logout
            </button>
          ) : (
            <Link
              className="text-base font-medium hover:text-second transition duration-200 ease-in-out border-b-2 border-transparent hover:border-H"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
