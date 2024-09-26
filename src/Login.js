// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setIsLoggedIn }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email address is invalid';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Fetch users from the API bin
        const response = await axios.get('https://api.jsonbin.io/v3/b/66edc3e2acd3cb34a8883076/latest', {
          headers: {
            'X-Master-Key': '$2a$10$rZco98boEysxK6P/C.LxN.hu8quzE4O0V9X3pi2d5j8DKWDqONdPa', // Replace with your API key
          },
        });

        const users = response.data.record.users || [];

const validUser = users.find(user => user.email === form.email && user.password === form.password);


if (validUser) {
  setIsLoggedIn(true);
  localStorage.setItem('isLoggedIn', true);
  localStorage.setItem('username', validUser.email); // Access username from validUser
  
  navigate('/transaction');
} else {
  setErrors({
    ...errors,
    general: 'Invalid email or password',
  });
}


      } catch (error) {
        console.error('Error during login:', error);
        setErrors({
          ...errors,
          general: 'An error occurred during login.',
        });
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@domain.com"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {errors.general && <p className="error">{errors.general}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
