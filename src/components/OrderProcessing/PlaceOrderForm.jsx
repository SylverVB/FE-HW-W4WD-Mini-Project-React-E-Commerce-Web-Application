import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import style from './PlaceOrderForm.module.css';

const PlaceOrderForm = ({ customerId }) => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(customerId || '');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orderDate, setOrderDate] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/customers');
        setCustomers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchProducts() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCustomers();
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedCustomer) {
        setMessage('Please select a customer.');
        setShow(true);
        return;
      }
      
      const customerId = parseInt(selectedCustomer, 10);

      await axios.post('http://127.0.0.1:5000/orders', {
        customer_id: customerId,
        product_ids: selectedProducts,
        date: orderDate
      });
      setMessage('Success! Your order will be shipped as soon as possible.');
      setShow(true);
      setSelectedProducts([]);
      setOrderDate('');
      setSelectedCustomer('');
    } catch (error) {
      console.log(error);
      setMessage('Error placing order.');
      setShow(true);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center w-75 order-form-container">
      <h3 className="align-self-start mb-3">Place Order</h3>
      <Form onSubmit={handleSubmit} className="border border-white rounded p-4 custom-form w-100">
        <FloatingLabel controlId="floatingSelectCustomer" label="Select Customer" className="mb-3">
          <Form.Select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} required>
            <option value="" disabled>Select Customer</option>
            {customers.map(customer => (
              <option key={customer.customer_id} value={customer.customer_id}>{customer.name}</option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelectProducts" label="Select Products" className="mb-3">
          <Form.Control as="select" multiple value={selectedProducts} onChange={(e) => setSelectedProducts([...e.target.selectedOptions].map(option => option.value))} style={{ height: '150px' }}>
            {products.map(product => (
              <option key={product.product_id} value={product.product_id}>{product.name}</option>
            ))}
          </Form.Control>
        </FloatingLabel>
        <FloatingLabel controlId="floatingDate" label="Order Date" className="mb-3">
          <Form.Control type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
        </FloatingLabel>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PlaceOrderForm;