// Dashboard.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">Welcome back!</h2>
              <p>Hello, {currentUser.displayName || currentUser.email}</p>
            </div>
          </div>
          
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title">Your Profile</h2>
              <p>Manage your account information</p>
              <div className="card-actions justify-end mt-4">
                <Link to="/profile" className="btn btn-primary">Edit Profile</Link>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title">Orders</h2>
              <p>View your order history</p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-outline">View Orders</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-base-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023-11-15</td>
                  <td>Account created</td>
                  <td><div className="badge badge-success">Completed</div></td>
                </tr>
                <tr>
                  <td>2023-11-20</td>
                  <td>Profile updated</td>
                  <td><div className="badge badge-success">Completed</div></td>
                </tr>
                <tr>
                  <td>2023-11-25</td>
                  <td>Order #12345 placed</td>
                  <td><div className="badge badge-warning">Processing</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;