import { useState } from 'react';
import { userLogin } from '../features/auth/authActions.jsx';
import { useDispatch, useSelector } from 'react-redux';

function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt with:', username, password);
    try {
      await dispatch(userLogin({ username, password }));
      alert('User registered successfully!');
      window.location.reload();


    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="poap-login-container">
      <div className="poap-login-card">
        <h1 className="poap-login-title">Login to POAP Events</h1>
        <form onSubmit={handleSubmit} className="poap-login-form">
          <div className="poap-login-input-group">
            <label htmlFor="email" className="poap-login-label">Email</label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="poap-login-input"
              required
            />
          </div>
          <div className="poap-login-input-group">
            <label htmlFor="password" className="poap-login-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="poap-login-input"
              required
            />
          </div>
          <button type="submit" className="poap-login-button">
            Log In
          </button>
        </form>
      </div>
    </div>


  );
}

export default LoginScreen;
