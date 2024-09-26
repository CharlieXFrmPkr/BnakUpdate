import React, { useState } from 'react';
import axios from 'axios';

const SignUpPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!form.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

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

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // 1. Get the existing users from the bin
        const getResponse = await axios.get('https://api.jsonbin.io/v3/b/66edc3e2acd3cb34a8883076/latest', {
          headers: {
            'X-Master-Key': '$2a$10$rZco98boEysxK6P/C.LxN.hu8quzE4O0V9X3pi2d5j8DKWDqONdPa', // Replace with your API key
          },
        });

        const existingUsers = getResponse.data.record.users || []; // Get existing users or initialize empty array

        // 2. Append the new user
        const newUser = { name: form.name, email: form.email, password: form.password };
        const updatedUsers = [...existingUsers, newUser];

        // 3. Update the bin with the new users list
        await axios.put(
          'https://api.jsonbin.io/v3/b/66edc3e2acd3cb34a8883076',
          { users: updatedUsers },
          {
            headers: {
              'X-Master-Key': '$2a$10$rZco98boEysxK6P/C.LxN.hu8quzE4O0V9X3pi2d5j8DKWDqONdPa', // Replace with your API key
            },
          }
        );

        setMessage('Signup successful!');

      } catch (error) {
        console.error('Error during signup:', error);
        setMessage('An error occurred during signup.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="********"
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <button type="submit">Sign Up</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUpPage;
