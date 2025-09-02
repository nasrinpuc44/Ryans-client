// OrderPage.jsx (new file)
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const categoryNames = {
    printing: "Printing Services",
    gaming: "Gaming Equipment",
    monitors: "Monitors & Displays",
    laptops: "Laptops & Computers",
    audio: "Audio Equipment",
    photography: "Photography Equipment"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    setMessage(`Order placed for ${quantity} ${categoryNames[category]}!`);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-base-200 rounded-lg shadow-md p-6">
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm mb-4"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-center mb-6">
          Order {categoryNames[category] || category}
        </h1>

        {message ? (
          <div className="alert alert-success mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Delivery/Pickup Date</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Special Requirements</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Any special requirements or notes..."
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Place Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderPage;