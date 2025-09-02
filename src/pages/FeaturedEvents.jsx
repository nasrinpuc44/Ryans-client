import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedEvents = () => {
  const featuredEvents = [
    {
      "id": 1,
      "availability": "Available",
      "category": "Health",
      "event_name": "Global Health Summit 2025",
      "location": "International Convention Hall",
      "ticket_price": "Free",
      "date": "2025-06-20",
      "image": "https://i.ibb.co/0yKfVZc/health-summit.jpg",
      "rating": 4.8,
      "attendees": 1200
    },
    {
      "id": 2,
      "availability": "Available",
      "category": "Music",
      "event_name": "Summer Music Festival",
      "location": "Lakeside Amphitheater",
      "ticket_price": "$20",
      "date": "2025-07-30",
      "image": "https://i.ibb.co/3p0xY5d/music-festival.jpg",
      "rating": 4.9,
      "attendees": 3500
    },
    {
      "id": 3,
      "availability": "Available",
      "category": "Tech",
      "event_name": "AI Technology Conference",
      "location": "Innovation Center",
      "ticket_price": "$25",
      "date": "2025-07-22",
      "image": "https://i.ibb.co/fkStS0h/ai-conference.jpg",
      "rating": 4.7,
      "attendees": 800
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-base-100">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the most exciting events happening around you. From conferences to festivals, we've got something for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card bg-base-100 shadow-xl card-hover group"
            >
              <figure className="relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.event_name} 
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-primary">{event.category}</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="badge badge-ghost bg-white/90 dark:bg-gray-800/90">
                    {event.ticket_price}
                  </span>
                </div>
              </figure>
              
              <div className="card-body">
                <h3 className="card-title">{event.event_name}</h3>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(event.date).toLocaleDateString()}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="rating rating-sm">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input
                          key={star}
                          type="radio"
                          name={`rating-${event.id}`}
                          className="mask mask-star-2 bg-orange-400"
                          checked={star === Math.floor(event.rating)}
                          readOnly
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">({event.rating})</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {event.attendees.toLocaleString()} attendees
                  </span>
                </div>

                <div className="card-actions">
                  <Link 
                    to={`/event-details/${event.id}`} 
                    className="btn btn-primary w-full"
                  >
                    View Details
                  </Link>
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
          <Link to="/upcoming-events" className="btn btn-outline btn-primary">
            View All Events
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEvents;