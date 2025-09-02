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
    // Listen for theme changes
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    };
    
    // Set initial theme
    handleThemeChange();
    
    // Create a mutation observer to watch for theme changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, []);

  // Banner slides data - simplified to not depend on theme for images
  const bannerSlides = [
    {
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Discover Amazing",
      typewriterWords: ["Events", "Experiences", "Memories"],
      description: "Find the best events happening around you. From concerts to conferences, we've got you covered.",
      button1: "Explore Events",
      button2: "Learn More",
      link1: "/products",
      link2: "/about"
    },
    {
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Join The",
      typewriterWords: ["Community", "Celebration", "Movement"],
      description: "Be part of something bigger. Connect with like-minded people and create unforgettable experiences.",
      button1: "Get Tickets",
      button2: "View Gallery",
      link1: "/products",
      link2: "/about"
    },
    {
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Create Your",
      typewriterWords: ["Story", "Adventure", "Legacy"],
      description: "Every event is a new chapter in your life's story. Make it count with our curated experiences.",
      button1: "Book Now",
      button2: "Our Story",
      link1: "/products",
      link2: "/about"
    }
  ];

  // Sample event data (all 6 events from your API)
  const featuredEvents = [
    {
      "availability": "Available",
      "category": "Health",
      "event_name": "Global Health Summit 2025",
      "location": "International Convention Hall",
      "ticket_price": "Free",
      "date": "2025-06-20",
      "image": "https://i.ibb.co/0yKfVZc/health-summit.jpg"
    },
    {
      "availability": "Available",
      "category": "Culture",
      "event_name": "Cultural Dance Festival",
      "location": "Open Air Theater",
      "ticket_price": "$10",
      "date": "2025-07-02",
      "image": "https://i.ibb.co/Zm4c5Ck/cultural-dance.jpg"
    },
    {
      "availability": "Available",
      "category": "Business",
      "event_name": "Startup Innovators Meetup",
      "location": "Tech Hub Auditorium",
      "ticket_price": "$15",
      "date": "2025-07-10",
      "image": "https://i.ibb.co/6btP7t7/startup-meetup.jpg"
    },
    {
      "availability": "Available",
      "category": "Food",
      "event_name": "International Food Fair",
      "location": "Downtown Market Square",
      "ticket_price": "$5",
      "date": "2025-07-15",
      "image": "https://i.ibb.co/3z6Lr3y/food-fair.jpg"
    },
    {
      "availability": "Available",
      "category": "Tech",
      "event_name": "AI Technology Conference",
      "location": "Innovation Center",
      "ticket_price": "$25",
      "date": "2025-07-22",
      "image": "https://i.ibb.co/fkStS0h/ai-conference.jpg"
    },
    {
      "availability": "Available",
      "category": "Music",
      "event_name": "Summer Music Festival",
      "location": "Lakeside Amphitheater",
      "ticket_price": "$20",
      "date": "2025-07-30",
      "image": "https://i.ibb.co/3p0xY5d/music-festival.jpg"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* 1. Hero Banner Section (Full-width slider) */}
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

      {/* Featured Events Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-base-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <figure>
                  <img src={event.image} alt={event.event_name} className="h-48 w-full object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{event.event_name}</h3>
                  <p className="text-sm text-gray-500">{event.category}</p>
                  <p className="text-sm">{new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-sm">{event.location}</p>
                  <p className="font-bold">{event.ticket_price}</p>
                  <div className="card-actions justify-end mt-4">
                    <Link 
                      to={`/event-details/${index}`} 
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;