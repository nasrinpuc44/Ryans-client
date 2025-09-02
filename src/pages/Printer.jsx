// Printer.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Printer = () => {
  const [printers, setPrinters] = useState([]);
  const [filteredPrinters, setFilteredPrinters] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);

  // Simulating API data fetch
  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        // In a real app, this would be an API call
        const printerData = [
          {
            "id": 1,
            "name": "Ultra Printer P1",
            "brand": "Canon",
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            "price": 499,
            "stock": 12,
            "connectivity": "Wireless, USB",
            "description": "High-speed printer with wireless connectivity and efficient paper handling."
          },
          {
            "id": 2,
            "name": "LaserJet Pro L2",
            "brand": "HP",
            "image": "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            "price": 399,
            "stock": 8,
            "connectivity": "USB, Ethernet",
            "description": "Efficient laser printer ideal for both home and office use."
          },
          {
            "id": 3,
            "name": "All-in-One Printer X3",
            "brand": "Epson",
            "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
            "price": 599,
            "stock": 15,
            "connectivity": "Wi-Fi, USB",
            "description": "All-in-One printer that allows you to print, scan, and copy with ease."
          },
          {
            "id": 4,
            "name": "EcoTank Printer E4",
            "brand": "Epson",
            "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
            "price": 549,
            "stock": 20,
            "connectivity": "Wireless, USB",
            "description": "Refillable ink tank system for cost-effective and eco-friendly printing."
          },
          {
            "id": 5,
            "name": "Compact Printer C5",
            "brand": "Brother",
            "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
            "price": 299,
            "stock": 10,
            "connectivity": "USB",
            "description": "Portable and compact printer suitable for small offices and limited spaces."
          },
          {
            "id": 6,
            "name": "Wireless InkJet W6",
            "brand": "Canon",
            "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
            "price": 449,
            "stock": 18,
            "connectivity": "Wireless, Mobile Print",
            "description": "InkJet printer with wireless and mobile printing support for convenience."
          }
        ];
        
        setPrinters(printerData);
        setFilteredPrinters(printerData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching printers:", error);
        setLoading(false);
      }
    };

    fetchPrinters();
  }, []);

  // Filter and sort printers
  useEffect(() => {
    let result = [...printers];
    
    // Filter by brand
    if (selectedBrand !== 'All') {
      result = result.filter(printer => printer.brand === selectedBrand);
    }
    
    // Filter by price range
    result = result.filter(printer => 
      printer.price >= priceRange[0] && printer.price <= priceRange[1]
    );
    
    // Sort results
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price-low') {
        return a.price - b.price;
      } else if (sortBy === 'price-high') {
        return b.price - a.price;
      } else if (sortBy === 'brand') {
        return a.brand.localeCompare(b.brand);
      }
      return 0;
    });
    
    setFilteredPrinters(result);
  }, [selectedBrand, priceRange, sortBy, printers]);

  // Get unique brands for filter
  const brands = ['All', ...new Set(printers.map(printer => printer.brand))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p>Loading printers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Printer Collection
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Discover our wide range of high-quality printers for home and office use
          </p>
        </motion.div>

        {/* Filters and Sorting */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-base-200 rounded-xl p-6 mb-8 shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Brand</span>
                </label>
                <select 
                  className="select select-bordered"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price Range: ${priceRange[0]} - ${priceRange[1]}</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="range range-primary"
                />
              </div>
            </div>
            
            <div className="form-control w-full md:w-48">
              <label className="label">
                <span className="label-text">Sort By</span>
              </label>
              <select 
                className="select select-bordered"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="brand">Brand</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Printer Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredPrinters.length > 0 ? (
            filteredPrinters.map((printer, index) => (
              <motion.div
                key={printer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex flex-col h-full bg-base-100 rounded-xl shadow-sm border border-base-300/50 
                  hover:shadow-xl hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                    <img 
                      src={printer.image} 
                      alt={printer.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-content text-xs font-bold px-2 py-1 rounded-full">
                      {printer.brand}
                    </div>
                    {printer.stock < 5 && (
                      <div className="absolute top-4 right-4 bg-error text-error-content text-xs font-bold px-2 py-1 rounded-full">
                        Low Stock
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {printer.name}
                    </h3>
                    
                    <p className="text-base-content/70 mb-4 flex-grow">
                      {printer.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="badge badge-outline mr-2">{printer.connectivity.split(',')[0].trim()}</div>
                      <div className="badge badge-outline">{printer.connectivity.split(',')[1].trim()}</div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl font-bold text-primary">
                        ${printer.price}
                      </span>
                      
                      <span className={`text-sm ${printer.stock > 10 ? 'text-success' : printer.stock > 0 ? 'text-warning' : 'text-error'}`}>
                        {printer.stock > 0 ? `${printer.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    
                    <div className="mt-4">
                      <Link 
                        to={`/order/${printer.id}`} 
                        className={`btn btn-primary w-full ${printer.stock === 0 ? 'btn-disabled' : ''}`}
                      >
                        {printer.stock > 0 ? 'Order Now' : 'Out of Stock'}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No printers found</h3>
              <p className="text-base-content/70">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </motion.div>

        {/* Back to Categories */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/" className="btn btn-outline btn-primary px-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Categories
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Printer;