import React from 'react';
import { Link } from 'react-router-dom';

const UpcomingEvents = () => {
  // Sample event data (replace with your API data)
  const events = [
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
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={event.image} alt={event.event_name} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{event.event_name}</h3>
                <div className="badge badge-primary">{event.category}</div>
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
    </div>
  );
};

export default UpcomingEvents;