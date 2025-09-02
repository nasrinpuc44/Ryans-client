import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div className="container mx-auto py-8 px-4 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <img 
          src="https://i.ibb.co.com/4wk20ysL/Oops-404-Error-with-a-broken-robot-cuate.png" 
          alt="404 Error" 
          className="w-full max-w-md mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold mb-4">Blog Section Coming Soon</h1>
        <p className="text-gray-600 mb-8">
          Our blog is currently under development. We're working hard to bring you valuable content soon!
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Blog;