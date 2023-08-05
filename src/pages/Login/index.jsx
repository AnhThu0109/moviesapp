import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KEY } from '../../utils/key';
import { BASE_URL } from '../../utils/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(1);
  const [errMess, setErrMess] = useState("");
  const navigate = useNavigate();
  let s = localStorage.getItem('session_id');
  

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get a request token
    const tokenResponse = await fetch(`${BASE_URL}/authentication/token/new?${KEY}`);
    const tokenData = await tokenResponse.json();
    let requestToken = tokenData.request_token;

    // Validate the request token with the user's credentials
    const loginUrl = `https://api.themoviedb.org/3/authentication/token/validate_with_login?${KEY}&username=${username}&password=${password}&request_token=${requestToken}`;
    const loginParams = {
      username: username, //anhthu010997
      password: password, //010997
      request_token: requestToken,
    };
    await fetch(loginUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${requestToken}`
      },
      body: JSON.stringify(loginParams),
    })
      .then(res => res.json())
      .then(data => {
        if(data.success === false){
          setErrMess(data.status_message);
        } else{
          requestToken = data.request_token;
        }
      })
      .catch(err => console.log(err))

    // Create a session
    const sessionResponse = await fetch(`${BASE_URL}/authentication/session/new?${KEY}&request_token=${requestToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.session_id;
    setSession(sessionId);

    // Store the session ID in local storage
    localStorage.setItem('session_id', sessionId);  
    if(localStorage.getItem('session_id') !== "undefined" && localStorage.getItem('session_id') != null){
      navigate("/");
    }
  };

  return (
    <div className='p-5'>
      <h2 className='fw-bolder'>Login to your account</h2>
      <p className='fw-bolder'>Please log in to see more information.</p>
      <form onSubmit={handleSubmit} className="pt-4">
        <div>
          <label htmlFor="text" className='form-label'>Username:</label>
          <input
            className='form-control'
            type="input"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
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
      {
        session === undefined? (
            <h5 className='text-danger pt-4'>{errMess}</h5>
        ) : (
            <></>
        )
      }
    </div>
  );
};

export default Login;
