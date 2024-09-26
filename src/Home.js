import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  return (
    <div>
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(/hero.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: '80px 20px'
        }}
      >
        <div className="hero-content">
          <h1>Welcome to Siddartha Bank</h1>
          <p>Secure, Reliable, and Tailored Financial Solutions Just for You.</p>
          <a href="#services" className="btn btn-primary">Explore Services</a>
        </div>
      </div>

      <div id="services" className="container py-5">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="service-card">
              <i className="fa fa-credit-card-alt"></i>
              <div className="service-card-content">
                <h4>Find a Credit Card</h4>
                <p>Choose from a variety of PS credit cards offering great features and rewards.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="service-card">
              <i className="fa-solid fa-piggy-bank"></i>
              <div className="service-card-content">
                <h4>Find a Savings Account</h4>
                <p>Accounts to help you grow your savings.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="service-card">
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <div className="service-card-content">
                <h4>Borrowing</h4>
                <p>Find a borrowing option that fits your life.</p>
              </div>
            </div>
          </div>

          {/* New services */}
          <div className="col-md-4 mb-4">
            <div className="service-card">
              <i className="fa-solid fa-house-user"></i>
              <div className="service-card-content">
                <h4>Explore Mortgage Options</h4>
                <p>Get specialized advice to help with your home ownership journey.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="service-card">
              <i className="fa-solid fa-chart-line"></i>
              <div className="service-card-content">
                <h4>Personal Investing</h4>
                <p>Registered plans and investments to help you reach your goals.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="service-card">
              <i className="fa-solid fa-money-check-alt"></i>
              <div className="service-card-content">
                <h4>Invest and Trade Online</h4>
                <p>PS Direct Investing – innovative tools for self-directed investors.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="service-card">
              <i className="fa-solid fa-briefcase"></i>
              <div className="service-card-content">
                <h4>Personalized Wealth Advice</h4>
                <p>Goals-based planning and advice with a PS Wealth advisor.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="service-card">
              <i className="fa-solid fa-dollar-sign"></i>
              <div className="service-card-content">
                <h4>Exchange Rates</h4>
                <p>Current rates for borrowing & investing products.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container plan-section">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="/move.png" alt="Plan Your Move" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h3>Plan your move to Nepal</h3>
            <p>
              Start learning about the Nepalese banking system, the immigration process, and
              what you could expect when you arrive.
            </p>
            <a href="#" className="btn btn-success">Learn more</a>
          </div>
        </div>
      </div>

      
      <div className="container advice-section text-center">
        <h3>Siddartha Advice - ready to help you move forward</h3>
        <p>
          Looking for financial advice? Read through our articles, videos, and tools with helpful 
          information for everyday banking, borrowing, saving, and financial planning needs.
        </p>
        <a href="#" className="btn btn-success">Learn more</a>
      </div>

    </div>

    
  );
};

export default Home;
