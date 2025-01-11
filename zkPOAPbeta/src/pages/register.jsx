import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/authActions.jsx';

const RegisterScreen = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const submitForm = async (data) => {
    try {
      setError(null); // Clear previous error
      await dispatch(registerUser(data));
      alert('User registered successfully!');
      reset(); // Reset the form
      window.location.reload();

      window.location.href = '/'; // Redirect to the homepage (root URL)

    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration failed:', error);
    }
  };

  return (



    <div className="poap-login-container">
    <div className="poap-login-card">
      <h1 className="poap-login-title">Register to POAP Events</h1>
      <form className="poap-login-form" onSubmit={handleSubmit(submitForm)}>

        <div className="poap-login-input-group">
          <label htmlFor="email" className="poap-login-label">Email</label>
          <input
            type="email"
            id="email"
            className="poap-login-input"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="poap-login-input-group">
          <label htmlFor="username" className="poap-login-label">Username</label>
          <input
            type="text"
            id="username"
            className="poap-login-input"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="error-text">{errors.username.message}</p>}
        </div>

        <div className="poap-login-input-group">
          <label htmlFor="password" className="poap-login-label">Password</label>
          <input
            type="password"
            id="password"
            className="poap-login-input"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="poap-login-button" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
    </div>

  );
};

export default RegisterScreen;
