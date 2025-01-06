import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    project: '',
    password:''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login: Check if user exists
        const response = await axios.get(`http://localhost:8080/api/users/username/${formData.username}`);
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/upload');
        }
      } else {
        // Signup: Create new user
        const response = await axios.post('http://localhost:8080/api/users', formData);
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/upload');
        }
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError('User not found');
      } else if (err.response?.status === 400) {
        setError('Invalid user data');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ><h1 className='header'>Custom GPT</h1>
    <div className="App">
      
      <div className="App-content">
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '1.5rem',
          color: '#374151' 
        }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {error && (
          <div style={{ 
            color: '#dc2626', 
            marginBottom: '1rem',
            padding: '0.75rem',
            backgroundColor: '#fee2e2',
            borderRadius: '0.375rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="styled-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="styled-input-file"
              required
            /><br/><br/>
             <label htmlFor="password" className="styled-label">password</label>
             <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="styled-input-file"
              required
            /><br/><br/>
          </div>

          {!isLogin && (
            <>
              <div>
                <label htmlFor="email" className="styled-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="styled-input-file"
                  required={!isLogin}
                /><br/><br/>
              </div>

              <div>
                <label htmlFor="project" className="styled-label">Project</label>
                <input
                  type="text"
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  className="styled-input-file"
                  required={!isLogin}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="styled-button"
            disabled={loading}
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>

          <div style={{ marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({
                  username: '',
                  email: '',
                  project: '',
                  password:''
                });
              }}
              style={{ 
                background: 'none',
                border: 'none',
                color: '#4f46e5',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '0.5rem'
              }}
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;