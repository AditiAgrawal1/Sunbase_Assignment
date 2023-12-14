import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = ({ setToken, setError }) => {
 const [loginId, setLoginId] = useState('');
 const [password_, setPassword] = useState('');
 const navigate = useNavigate();
 const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/authenticate',
        {
          login_id: loginId,
          password: password_,
        }
      );

      // Assuming the token is returned in the response
      console.log(response);
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      navigate('/customers');
    } catch (error) {
      console.error('Error during authentication:', error);

      // // Check if the error is due to invalid credentials
      // if (error.response && error.response.status === 401) {
      //   setError('Invalid credentials. Please try again.');
      // } else {
      //   // Handle other types of errors
      //   setError('An unexpected error occurred. Please try again later.');
      // }
    }
 };

 return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form>
                <div className="form-group row">
                 <label htmlFor="loginId" className="col-md-4 col-form-label text-md-right">Login ID</label>
                 <div className="col-md-6">
                    <input id="loginId" type="text" className="form-control" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
                 </div>
                </div>

                <div className="form-group row">
                 <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                 <div className="col-md-6">
                    <input id="password" type="password" className="form-control" value={password_} onChange={(e) => setPassword(e.target.value)} />
                 </div>
                </div>

                <div className="form-group row mb-0">
                 <div className="col-md-8 offset-md-4">
                    <button type="button" className="btn btn-primary" onClick={handleLogin}>
                      Login
                    </button>
                 </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};

export default Login;