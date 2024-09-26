import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Login from './Login';
import SignUp from './SignUp';
import Services from './Services';
import Footer from './Footer';
import Transaction from './Transaction';
import './App.css'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/'); 
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/Bank.png" alt="Bank Logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/transaction">Transactions</Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={handleLogout}>Log Out</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
