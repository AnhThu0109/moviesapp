import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { KEY } from '../../utils/key';
import { BASE_URL } from '../../utils/api';
const JoinUs = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [session, setSession] = useState(1);
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
    const handleSubmit = () => {

    }
    return (
        <div className='p-5'>
            <h2 className='fw-bolder'>Sign up for an account</h2>
            <p>Signing up for an account is free and easy. Fill out the form below to get started.</p>
            <form onSubmit={handleSubmit} className="pt-4" method='post'>
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
                <button type="submit" className='mt-3 text-white btn btn-info'>Sign Up</button>
                <button type="btn" className='mt-3 ms-3 text-white btn btn-secondary'>Cancel</button>
            </form>
            {
                session == undefined ? (
                    <h5 className='text-danger pt-4'>Incorrect username or password. Please type again.</h5>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default JoinUs;