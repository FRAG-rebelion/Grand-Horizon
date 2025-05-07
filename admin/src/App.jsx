import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Navi from './components/Navi';
import BookingsAdmin from './pages/Bookings';
import RegisterRoles from './pages/RegisterRoles';
import Users from './pages/Users';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';
import Menu from './pages/Menu';
import OrdersPage from './pages/Orders';
import Dashboard from './pages/dashboard';
function App() {


  return (
    <div className="min-h-screen  overflow-hidden bg-BG flex ">
      <Router>
        <Navi />
        <Routes>
        <Route path='/' element={<Login />} />
          <Route path='/Bookings' element={<BookingsAdmin />} />
          <Route path='/Menu' element={<Menu />} />
          <Route path='/Register' element={<RegisterRoles />} />
          <Route path='/Users' element={<Users />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
