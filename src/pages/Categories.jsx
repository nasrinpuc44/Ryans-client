// Categories.jsx (updated with icons and navigation)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import your SVG icons
import PrinterIcon from '../assets/printer.svg';
import GamingIcon from '../assets/gaming.svg';
import MonitorIcon from '../assets/Monitor.svg';
import LaptopIcon from '../assets/Laptop.svg';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Printing Services",
      icon: PrinterIcon,
      description: "Professional printing for all your needs",
      count: "324 Services",
      path: "/order/printing"
    },
    {
      id: 2,
      name: "Gaming Equipment",
      icon: GamingIcon,
      description: "Rent gaming consoles and accessories",
      count: "187 Items",
      path: "/order/gaming"
    },
    {
      id: 3,
      name: "Monitors & Displays",
      icon: MonitorIcon,
      description: "High-quality displays for events",
      count: "256 Items",
      path: "/order/monitors"
    },
    {
      id: 4,
      name: "Laptops & Computers",
      icon: LaptopIcon,
      description: "Powerful computing solutions",
      count: "198 Items",
      path: "/order/laptops"
    },
    {
      id: 5,
      name: "Audio Equipment",
      icon: "🎵", // Using emoji as fallback
      description: "Sound systems and microphones",
      count: "172 Items",
      path: "/order/audio"
    },
    {
      id: 6,
      name: "Photography",
      icon: "📸", // Using emoji as fallback
      description: "Cameras and photography gear",
      count: "215 Items",
      path: "/order/photography"
    }
  ];

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-base-100">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services & Products</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our categories to find the perfect equipment or service for your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card bg-base-100 shadow-lg hover:shadow-xl cursor-pointer group"
              onClick={() => handleCategoryClick(category.path)}
            >
              <div className="card-body p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    {typeof category.icon === 'string' ? (
                      <span className="text-2xl">{category.icon}</span>
                    ) : (
                      <img 
                        src={category.icon} 
                        alt={category.name}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                  {category.description}
                </p>
                
                <p className="text-primary text-sm font-medium">
                  {category.count}
                </p>
                
                <div className="mt-4">
                  <button className="btn btn-primary btn-sm btn-outline">
                    Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button 
            className="btn btn-primary btn-outline"
            onClick={() => navigate('/categories')}
          >
            View All Categories
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;