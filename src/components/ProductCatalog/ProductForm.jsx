import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const ProductForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const isEdit = state?.isEdit || false;
  const productId = state?.productId || null;

  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("Success!");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    // stock_level: ""
  });

  useEffect(() => {
    if (isEdit && productId) {
      axios.get(`http://127.0.0.1:5000/products/${productId}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
        });
    }
  }, [isEdit, productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        if (isEdit && productId) {
          await axios.put(`http://127.0.0.1:5000/products/${productId}`, formData, {
            headers: { "Content-Type": "application/json" }
          });
          setMessage(`Successfully Updated Product: ${formData.name}`);
        } else {
          await axios.post(`http://127.0.0.1:5000/products`, formData, {
            headers: { "Content-Type": "application/json" }
          });
          setMessage(`Successfully Added Product: ${formData.name}`);
        }
        setShow(true);
      } catch (error) {
        console.error('Error submitting product form:', error);
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    navigate('/products');
  };

  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="border border-white w-75 mx-auto rounded p-4">
        <h3>{isEdit ? 'Update Product' : 'Add New Product'}</h3>
        <FloatingLabel
          controlId="name"
          label="Name"
          className="mb-3 text-dark"
        >
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter a valid name.</Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel
          controlId="price"
          label="Price"
          className="mb-3 text-dark"
        >
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter a valid price.</Form.Control.Feedback>
        </FloatingLabel>
        {/* <FloatingLabel
          controlId="stock_level"
          label="Stock Level"
          className="mb-3 text-dark"
        >
          <Form.Control
            type="number"
            name="stock_level"
            value={formData.stock_level}
            onChange={handleChange}
            placeholder="Stock Level"
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter a valid stock level.</Form.Control.Feedback>
        </FloatingLabel> */}
        <Button type="submit" className="btn btn-primary w-25">
          {isEdit ? 'Update Product' : 'Add New Product'}
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{messageType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductForm;