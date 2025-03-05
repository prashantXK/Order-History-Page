import React, { useState, useEffect } from 'react';
import formData from '../formData.json'; // Import form field definitions
import orderHistoryData from '../orderHistory.json'; // Import order history

const OrderHistory = () => {
  const [formFields, setFormFields] = useState(formData);
  const [orders, setOrders] = useState(orderHistoryData);

  // Handle input changes
  const handleChange = (id, value) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setFormFields(updatedFields);
  };

  // Save form data as a new order
  const handleSave = () => {
    const newOrder = formFields.reduce((acc, field) => {
      acc[field.id] = field.value;
      return acc;
    }, {});
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
  
    // Save to localStorage
    localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
  
    // Reset form fields
    const resetFields = formFields.map((field) => ({ ...field, value: '' }));
    setFormFields(resetFields);
  };
  
  // Load from localStorage on component mount
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orderHistory')) || orderHistoryData;
    setOrders(savedOrders);
  }, []);
  return (
    <div>
      <h2>Add New Order</h2>
      <form>
        {formFields.map((field) => (
          <div key={field.id}>
            <label>{field.label}: </label>
            <input
              type={field.type}
              value={field.value}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>

      <h2>Order History</h2>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              {formFields.map((field) => (
                <th key={field.id}>{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                {formFields.map((field) => (
                  <td key={field.id}>{order[field.id]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
};

export default OrderHistory;