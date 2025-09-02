import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const EventDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [isBooking, setIsBooking] = useState(false);
  
  // Sample event data (replace with your API data)
  const events = [
    {
      "availability": "Available",
      "category": "Health",
      "event_name": "Global Health Summit 2025",
      "location": "International Convention Hall",
      "ticket_price": "Free",
      "date": "2025-06-20",
      "image": "https://i.ibb.co/0yKfVZc/health-summit.jpg",
      "description": "Join global health experts for a summit on the latest developments in healthcare, medical research, and public health policies. This event brings together professionals from various medical fields to discuss innovations, challenges, and future directions in global health."
    },
    {
      "availability": "Available",
      "category": "Culture",
      "event_name": "Cultural Dance Festival",
      "location": "Open Air Theater",
      "ticket_price": "$10",
      "date": "2025-07-02",
      "image": "https://i.ibb.co/Zm4c5Ck/cultural-dance.jpg",
      "description": "Experience the rich tapestry of global cultures through traditional dance performances, workshops, and interactive sessions. This festival celebrates diversity and cultural heritage through the universal language of dance."
    },
    {
      "availability": "Available",
      "category": "Business",
      "event_name": "Startup Innovators Meetup",
      "location": "Tech Hub Auditorium",
      "ticket_price": "$15",
      "date": "2025-07-10",
      "image": "https://i.ibb.co/6btP7t7/startup-meetup.jpg",
      "description": "Connect with fellow entrepreneurs, investors, and innovators at this dynamic networking event. Share ideas, find collaborators, and gain insights from successful startup founders and industry experts."
    },
    {
      "availability": "Available",
      "category": "Food",
      "event_name": "International Food Fair",
      "location": "Downtown Market Square",
      "ticket_price": "$5",
      "date": "2025-07-15",
      "image": "https://i.ibb.co/3z6Lr3y/food-fair.jpg",
      "description": "Embark on a culinary journey around the world without leaving the city. Sample authentic dishes from various countries, watch cooking demonstrations, and learn about different food cultures and traditions."
    },
    {
      "availability": "Available",
      "category": "Tech",
      "event_name": "AI Technology Conference",
      "location": "Innovation Center",
      "ticket_price": "$25",
      "date": "2025-07-22",
      "image": "https://i.ibb.co/fkStS0h/ai-conference.jpg",
      "description": "Explore the cutting edge of artificial intelligence at this premier technology conference. Featuring keynote speakers from leading tech companies, hands-on workshops, and networking opportunities with AI professionals and enthusiasts."
    },
    {
      "availability": "Available",
      "category": "Music",
      "event_name": "Summer Music Festival",
      "location": "Lakeside Amphitheater",
      "ticket_price": "$20",
      "date": "2025-07-30",
      "image": "https://i.ibb.co/3p0xY5d/music-festival.jpg",
      "description": "Enjoy a day of music with top artists from various genres at our annual summer music festival by the lake. Featuring food trucks, artisan vendors, and activities for all ages, this is the perfect summer celebration for music lovers."
    }
  ];

  const event = events[id] || events[0]; // Default to first event if ID not found

  const handleBookTicket = async () => {
    if (!currentUser) {
      toast.error("Please sign in to book tickets.");
      return;
    }

    setIsBooking(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Successfully booked ticket for ${event.event_name}!`);
      
      // You can add your actual booking logic here
    } catch (error) {
      toast.error("Failed to book ticket. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="breadcrumbs text-sm mb-6">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/upcoming-events">Upcoming Events</Link></li>
            <li>{event.event_name}</li>
          </ul>
        </div>
        
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure className="lg:w-1/2">
            <img src={event.image} alt={event.event_name} className="w-full h-64 lg:h-full object-cover" />
          </figure>
          <div className="card-body lg:w-1/2">
            <h2 className="card-title text-2xl">{event.event_name}</h2>
            <div className="badge badge-primary">{event.category}</div>
            <p className="text-gray-700">{event.description}</p>
            <div className="divider"></div>
            <div className="space-y-2">
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> 6:00 PM - 11:00 PM</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Price:</strong> {event.ticket_price}</p>
              <p><strong>Availability:</strong> <span className="text-success">{event.availability}</span></p>
            </div>
            <div className="card-actions justify-end mt-4">
              <button 
                className="btn btn-primary"
                onClick={handleBookTicket}
                disabled={isBooking}
              >
                {isBooking ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Booking...
                  </>
                ) : (
                  "Get Tickets"
                )}
              </button>
              <Link to="/upcoming-events" className="btn btn-outline">
                View All Events
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Related Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.filter(e => e.category === event.category && e.event_name !== event.event_name)
                   .slice(0, 2)
                   .map((relatedEvent, index) => (
              <div key={index} className="card bg-base-100 shadow-md">
                <div className="card-body p-4">
                  <h4 className="card-title text-lg">{relatedEvent.event_name}</h4>
                  <p className="text-sm">{new Date(relatedEvent.date).toLocaleDateString()}</p>
                  <p className="text-sm">{relatedEvent.location}</p>
                  <div className="card-actions justify-end">
                    <Link 
                      to={`/event-details/${events.findIndex(e => e.event_name === relatedEvent.event_name)}`} 
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
    </div>
  );
};

export default EventDetails;