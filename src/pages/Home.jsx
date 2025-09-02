import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import Typewriter from 'react-typewriter-effect';
import 'swiper/css';

const Home = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    };
    
    handleThemeChange();
    
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, []);

  // Banner slides data
  const bannerSlides = [
    {
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Discover Amazing",
      typewriterWords: ["Events", "Experiences", "Memories"],
      description: "Find the best events happening around you. From concerts to conferences, we've got you covered.",
      button1: "Explore Events",
      button2: "Learn More",
      link1: "/products",
      link2: "/about"
    },
    {
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Join The",
      typewriterWords: ["Community", "Celebration", "Movement"],
      description: "Be part of something bigger. Connect with like-minded people and create unforgettable experiences.",
      button1: "Get Tickets",
      button2: "View Gallery",
      link1: "/products",
      link2: "/about"
    },
    {
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Create Your",
      typewriterWords: ["Story", "Adventure", "Legacy"],
      description: "Every event is a new chapter in your life's story. Make it count with our curated experiences.",
      button1: "Book Now",
      button2: "Our Story",
      link1: "/products",
      link2: "/about"
    }
  ];

  // Categories data
  const categories = [
    {
      name: "Printer",
      image: "https://i.ibb.co.com/s9bWq0PW/printer-PNG7743.png",
      link: "/category/printer"
    },
    {
      name: "Gaming",
      image: "https://i.ibb.co.com/W9mMTK4/unnamed.webp",
      link: "/category/gaming"
    },
    {
      name: "Laptop",
      image: "https://i.ibb.co.com/TxKR23Gc/depositphotos-269193596-stock-illustration-realistic-laptop-vector-illustration-in.webp",
      link: "/category/laptop"
    },
    {
      name: "Monitor",
      image: "https://i.ibb.co.com/jPS1NgXp/monitor-1.png",
      link: "/category/monitor"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Banner Section */}
      <section className="rounded-t-none rounded-b-3xl">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ 
            delay: 3000,
            disableOnInteraction: false 
          }}
          loop={true}
          speed={800}
        >
          {bannerSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-screen max-h-[700px] rounded-b-3xl bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
                }}
              >
                <div className="text-white w-[90vw] mx-auto pt-32">
                  <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                  >
                    {slide.title}{' '}
                    <span className="text-primary">
                      <Typewriter
                        words={slide.typewriterWords}
                        loop={true}
                        cursor
                        cursorStyle="_"
                        typeSpeed={100}
                        deleteSpeed={60}
                        delaySpeed={1500}
                      />
                    </span>
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-lg max-w-2xl mb-8"
                  >
                    {slide.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link to={slide.link1}>
                      <button 
                        className="btn btn-lg w-full sm:w-auto bg-white text-black hover:bg-gray-100 font-bold shadow-lg px-8 py-4"
                      >
                        {slide.button1}
                      </button>
                    </Link>
                    <Link to={slide.link2}>
                      <button
                        className="btn btn-lg btn-outline w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/20 font-bold px-8 py-4"
                      >
                        {slide.button2}
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

    
<section className="py-20 px-4 md:px-8 lg:px-16 bg-base-100">
  <div className="container mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Shop By Category
      </h2>
      <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
        Discover our wide range of premium products organized by category to help you find exactly what you need
      </p>
    </motion.div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group"
        >
          <Link 
            to={category.link} 
            className="flex flex-col items-center p-8 bg-base-100 rounded-xl shadow-sm border border-base-300/50 
            hover:shadow-xl hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-2"
          >
            <div className="relative mb-6 w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full 
              group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 scale-0 group-hover:scale-110"></div>
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
            
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
              {category.name}
            </h3>
            
            <span className="text-primary font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Explore now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
    
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      viewport={{ once: true }}
      className="text-center mt-12"
    >
      <Link to="/categories" className="btn btn-outline btn-primary px-8">
        View All Categories
      </Link>
    </motion.div>
  </div>
</section>
    </div>
  );
};

export default Home;
