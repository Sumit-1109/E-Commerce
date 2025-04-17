import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../../../services/auth';
import './Signup.scss';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: 'https://picsum.photos/800',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await signupUser(formData);

      if (res.ok) {
        navigate('/');
      } else {
        const error = await res.json();
        alert(`Signup failed: ${error.message || 'Invalid data'}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="avatar" placeholder="Avatar URL (optional)" onChange={handleChange} />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;