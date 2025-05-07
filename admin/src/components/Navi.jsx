import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navi() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();


  const updateRoleFromStorage = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setRole(null);
      return;
    }
    try {
      const admin = JSON.parse(localStorage.getItem('admin'));
      setRole(admin.role);
    } catch {
      setRole(null);
    }
  };


  useEffect(() => {
    updateRoleFromStorage();
    setLoading(false);

    const onAuthChange = () => {
      updateRoleFromStorage();
    };
    window.addEventListener('authChange', onAuthChange);
    return () => {
      window.removeEventListener('authChange', onAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setRole(null);
    // Optionally redirect to login page
    navigate('/');
  };

  if (loading) return null;

  const linksConfig = [
    { to: '/dashboard', label: 'Dashboard', show: [1, 2, 3, 4] },
    { to: '/bookings', label: 'Bookings Management', show: [1, 2] },
    { to: '/users', label: 'Users', show: [1, 2] },
    { to: '/register', label: 'Register Roles', show: [1] },
    { to: '/menu', label: 'Menu', show: [1, 3] },
    { to: '/orders', label: 'Orders', show: [1, 4] }
  ];

  return (
    <nav className="bg-prime p-4 min-w-fit">
      <div className="container mx-auto flex flex-col">
        <Link to="/" className="text-white text-2xl mb-2.5 font-bold">
          Admin Panel
        </Link>
        <ul className="flex flex-col space-y-4">
          {role === null ? (
            <li>
              <Link to="/" className="text-white hover:bg-primary-light hover:text-second px-3 py-2 rounded">
                Login
              </Link>
            </li>
          ) : (
            <>  
              {linksConfig.map(({ to, label, show }) => (
                show.includes(role) && (
                  <li key={to}>
                    <Link to={to} className="text-white hover:bg-primary-light hover:text-second px-3 py-2 rounded">
                      {label}
                    </Link>
                  </li>
                )
              ))}
              <li>
                <button onClick={handleLogout} className="text-white hover:bg-primary-light hover:text-second px-3 py-2 rounded text-left">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navi;
