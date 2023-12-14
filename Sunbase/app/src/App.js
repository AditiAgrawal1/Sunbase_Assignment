import React from 'react';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Customer from './Customer';
import CreateCustomer from './CreateCustomer';
import UseAuth from './UseAuth';

const App = () => {
  const { isAuthenticated, login, logout } = UseAuth();

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login login={login} />} />
          {isAuthenticated ? (
            <>
              <Route path="/customers" element={<Customer />} />
              <Route path="/createcustomer" element={<CreateCustomer />} />
            </>
          ) : (
            <Navigate to="/" />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
