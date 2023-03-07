import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'your_api_key';
const BASE_URL = 'https://api.themoviedb.org/3';

function Login() {
  const [requestToken, setRequestToken] = useState('');
  const navigate = useNavigate();

  // Step 1: Create a request token
  useEffect(() => {
    const createRequestToken = async () => {
      const response = await fetch(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
      const data = await response.json();
      setRequestToken(data.request_token);
    }
    createRequestToken();
  }, []);

  // Step 2: Redirect the user to the TMDb website to grant access
  const handleLogin = () => {
    window.location = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/session/callback`;
  }

  return (
    <div>
      <button onClick={handleLogin}>Log in with TMDb</button>
    </div>
  );
}

function Callback() {
  const [sessionId, setSessionId] = useState('');
  const navigate = useNavigate();

  // Step 3: Validate the request token with the user's credentials
  useEffect(() => {
    const validateRequestToken = async () => {
      const username = 'your_tmdb_username';
      const password = 'your_tmdb_password';

      const response = await fetch(`${BASE_URL}/authentication/token/validate_with_login?api_key=${API_KEY}&request_token=${requestToken}&username=${username}&password=${password}`);
      const data = await response.json();

      if (data.success) {
        // Step 4: Create a session ID
        const response = await fetch(`${BASE_URL}/authentication/session/new?api_key=${API_KEY}&request_token=${requestToken}`);
        const data = await response.json();
        setSessionId(data.session_id);
        navigate('/home');
      } else {
        // Handle invalid credentials
        console.log('Invalid credentials');
      }
    }
  })
}
