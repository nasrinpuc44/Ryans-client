import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            Welcome to Eventure, your premier destination for discovering and attending the most exciting events in your area and beyond.
          </p>
          <p className="mb-4">
            Founded in 2024, Eventure was created with a simple mission: to connect people with experiences that matter. 
            Whether you're looking for cultural festivals, tech conferences, music concerts, or business networking events, 
            we've got you covered.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Vision</h2>
          <p className="mb-4">
            We believe that events have the power to transform lives, build communities, and create lasting memories. 
            Our platform is designed to make event discovery and registration seamless and enjoyable.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Curated selection of events across various categories</li>
            <li>Easy ticket purchasing and registration</li>
            <li>Personalized event recommendations</li>
            <li>Event creation and management tools for organizers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;