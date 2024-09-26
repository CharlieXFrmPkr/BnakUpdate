import React from 'react';
import Footer from './Footer'; 

const About = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container flex-grow-1">
        <h1>About Our Bank</h1>
        <p>We offer the best financial services to meet your needs.</p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
