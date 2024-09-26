import React from 'react';
import Footer from './Footer'; 

const Services = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container flex-grow-1">
        <h2>Our Services</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Savings Accounts</h5>
                <p className="card-text">Earn interest and save securely with our range of savings accounts.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Loans</h5>
                <p className="card-text">Flexible loan options for personal, auto, and home loans.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Investments</h5>
                <p className="card-text">Grow your wealth with our investment solutions tailored to your goals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
