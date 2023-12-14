import React, { useState } from 'react';
import axios from 'axios';
import './CreateCustomer.css'; // Import a CSS file for styling

const CreateCustomer = () => {
  const [customerData, setCustomerData] = useState({
    first_name: 'Jane',
    last_name: 'Doe',
    street: 'Elvnu Street',
    address: 'H no 2',
    city: 'Delhi',
    state: 'Delhi',
    email: 'sam@gmail.com',
    phone: '12345678',
  });

  var token = localStorage.getItem('token');

  const handleCreateCustomer = async () => {
    try {
      // Check for empty first name or last name
      if (!customerData.first_name || !customerData.last_name) {
        // Show message in a div
        document.getElementById('errorMessage').innerText = 'First Name or Last Name is missing';
        return;
      }
  
      // Clear any previous error messages
      document.getElementById('errorMessage').innerText = '';
  
      console.log('Token:', token);
      const response = await axios.post(
        'http://localhost:8080/createCustomer',
        customerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 201) {
        console.log('Customer created successfully');
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error creating customer:', error);
  
      if (error.response && error.response.status === 400) {
        // Show message in a div
        document.getElementById('errorMessage').innerText = 'First Name or Last Name is missing';
      } else {
        console.error('An unexpected error occurred. Please try again later.');
      }
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  return (
    <div className="create-customer-container">
        <div id="errorMessage" className="error-message"></div>
      <h2>Create Customer</h2>
      <form>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={customerData.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={customerData.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            value={customerData.street}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={customerData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={customerData.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleCreateCustomer}>
          Create Customer
        </button>
      </form>
      <a href="/customers">Back</a>
    </div>
  );
};

export default CreateCustomer;
