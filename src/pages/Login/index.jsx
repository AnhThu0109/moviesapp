import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KEY } from '../../utils/key';
import { BASE_URL } from '../../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get a request token
    const tokenResponse = await fetch(`${BASE_URL}/authentication/token/new?${KEY}`);
    const tokenData = await tokenResponse.json();
    const requestToken = tokenData.request_token;
    console.log(requestToken);

    // Validate the request token with the user's credentials
    const loginUrl = `https://api.themoviedb.org/3/authentication/token/validate_with_login?${KEY}`;
    const loginParams = {
      username: email,
      password: password,
      request_token: requestToken,
    };
    await fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginParams),
    });

    // const response = await fetch(`${BASE_URL}/authentication/token/validate_with_login?${KEY}&request_token=${requestToken}&username=${email}&password=${password}`);
    // const data = await response.json();
    // console.log(data);

    // Create a session
    const sessionResponse = await fetch(`${BASE_URL}/authentication/session/new?${KEY}&request_token=${requestToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const sessionData = await sessionResponse.json();
    console.log(sessionData);
    const sessionId = sessionData.session_id;

    // Store the session ID in local storage
    localStorage.setItem('session_id', sessionId);
    navigate('/');
  };

  return (
    <div className='p-5'>
      <h2 className=''>Login to your account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className='form-label'>Email:</label>
          <input
            className='form-control'
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className='form-label'>Password:</label>
          <input
            className='form-control'
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className='mt-3 text-white btn btn-info'>Login</button>
      </form>
    </div>
  );
};

export default Login;
