import React, { useState, useRef } from 'react';
import axios from 'axios';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import './centralizedStyling.css';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const loadingBarRef = useRef(null);

  const handleLogin = async () => {
    try {
      loadingBarRef.current?.continuousStart();

      const data = {
        nickname: username,
        password: password
      };

      const response = await axios.post('https://localhost:7112/api/Login', data);
      console.log(response.data);
      localStorage.setItem('access_token', response.data.token);
      localStorage.setItem('user_id', response.data.user_id);
      setIsAuthenticated(true);

      setTimeout(() => {
        navigate('/LatestNews');
      }, 1000);
      // navigate('/LatestNews');

    } catch (error) {
      console.error(error);
      setErrorMessage('Utilizatorul nu a fost găsit');
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const handleSignUp = async () => {
    try {
      loadingBarRef.current?.continuousStart();

      const data = {
        nickname: signUpUsername,
        password: signUpPassword
      };

      const response = await axios.post('https://localhost:7112/api/Login/Register', data);
      console.log(response.data);
      setIsAuthenticated(true);

      setTimeout(() => {
        navigate('/LatestNews');
      }, 700);
      
    } catch (error) {
      console.error(error);
      setErrorMessage('A apărut o eroare la înregistrare');
    } finally {
      loadingBarRef.current?.complete();
    }
  };


  return (
    <div>
      <LoadingBar className='loadingBar' ref={loadingBarRef} color='#e6b811' height={4} />

      <div className="centralizeContainer">
        <div className="chenarContinutSignUp">
          <MDBRow d-flex align-items-center justify-content-center>
            <MDBCol className="col align-items-center justify-content-center centrat">
              <h1 className='header'>Log In</h1>
              <br /><br />
              <input
                className='formControl'
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <br />
              <input
                className='formControl'
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              /><br />

              <button
                className={`btn-login`}
                onClick={handleLogin}
              >
                Log In
              </button>

              {errorMessage && <p>{errorMessage}</p>}
            </MDBCol>
            <MDBCol className="col align-items-center justify-content-center centrat">
              <h1>Sign Up</h1>
              <br /><br />
              <input
                className='formControl'
                type="text"
                placeholder="Username"
                value={signUpUsername}
                onChange={e => setSignUpUsername(e.target.value)}
              />
              <br />
              <input
                className='formControl'
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={e => setSignUpPassword(e.target.value)}
              />
              <br />

              <button
                className={`btn-login`}
                onClick={handleSignUp}
              >
                Sign Up
              </button>

            </MDBCol>
          </MDBRow>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
