// Customer.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Customer.css';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getCustomerList', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const deleteCustomer = async (uuid) => {
    console.log(uuid);

    if (!uuid) {
      console.error('Invalid UUID for delete operation.');
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/deleteCustomer?uuid=${uuid}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const updateCustomer = async () => {
    try {
      const { uuid, ...customerDetails } = editingCustomer;

      console.log(uuid);
      console.log(customerDetails);

      await axios.post(
        `http://localhost:8080/updateCustomer?uuid=${uuid}`,
        customerDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingCustomer(null);

      fetchCustomers();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleEditClick = (customer) => {
    setEditingCustomer((prevEditingCustomer) =>
      prevEditingCustomer && prevEditingCustomer.uuid === customer.uuid
        ? null
        : { ...customer }
    );
  };

  return (
    <div className="app">
      <button className="add-button" onClick={() => navigate('/createcustomer')}>
        Add Customer
      </button>
      <h1 className="title">Customer List Screen</h1>
      <table className="customer-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Street</th>
            <th>Address</th>
            <th>City</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.uuid}>
              <td>
                {editingCustomer?.uuid === customer.uuid ? (
                  <input
                    type="text"
                    value={editingCustomer.first_name}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        first_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.first_name
                )}
              </td>
              <td>
                {editingCustomer?.uuid === customer.uuid ? (
                  <input
                    type="text"
                    value={editingCustomer.last_name}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        last_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.last_name
                )}
              </td>
              <td>
                {editingCustomer?.uuid === customer.uuid ? (
                  <input
                    type="text"
                    value={editingCustomer.street}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        street: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.street
                )}
              </td>
              <td>
                {editingCustomer?.uuid === customer.uuid ? (
                  <input
                    type="text"
                    value={editingCustomer.address}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        address: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.address
                )}
              </td>
              <td>
                {editingCustomer?.uuid === customer.uuid ? (
                  <input
                    type="text"
                    value={editingCustomer.city}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        city: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.city
                )}
              </td>
              <td>
                {editingCustomer?.uuid === customer.uuid ? (
                  <input
                    type="text"
                    value={editingCustomer.email}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.email
                )}
              </td>
              <td>
                {editingCustomer?.uuid === customer.uuid ? (
                  <input
                    type="text"
                    value={editingCustomer.phone}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.phone
                )}
              </td>
              <td>
  {editingCustomer?.uuid === customer.uuid ? (
    <div className="button-group">
      <button onClick={updateCustomer}>Save</button>
      <button onClick={() => handleEditClick(customer)}>Cancel</button>
    </div>
  ) : (
    <div className="button-group">
      <button onClick={() => handleEditClick(customer)}>Edit</button>
      <button onClick={() => deleteCustomer(customer.uuid)}>Delete</button>
    </div>
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customer;
