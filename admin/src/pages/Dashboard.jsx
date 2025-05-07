import React from 'react';

function Dashboard() {
  const admin = JSON.parse(localStorage.getItem('admin'));

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-prime mb-4">
        Dashboard
      </h1>
      <p className="text-xl text-text mb-2">
        Welcome, {admin?.name || 'Admin'}!
      </p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-BC p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-prime mb-2">Overview</h2>
          <p className="text-text">See your system stats and performance summary here.</p>
        </div>
        <div className="bg-BC p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-prime mb-2">Quick Access</h2>
          <p className="text-text">Use the sidebar to navigate to Bookings, Users, Menu, and more.</p>
        </div>
        <div className="bg-BC p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-prime mb-2">Support</h2>
          <p className="text-text">Need help? Contact the main administrator.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
