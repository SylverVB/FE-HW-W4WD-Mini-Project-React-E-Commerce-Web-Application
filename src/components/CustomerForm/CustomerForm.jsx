import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

// internal import
import style from './CustomerForm.module.css';

function CustomerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("Success!");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (id) {
      // Fetching customer data for editing
      const fetchCustomerData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCustomerData();
    }
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity() === false && !id) {
      event.stopPropagation();
      setValidated(true);
    } else {
      if (id) {
        try {
          const response = await axios.put(`http://127.0.0.1:5000/customers/${id}`, formData, {
            headers: {
              "Content-Type": "application/json"
            }
          });
          setMessage(`Successfully Updated Customer: ${formData.name}`);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const response = await axios.post(`http://127.0.0.1:5000/customers`, formData, {
            headers: {
              "Content-Type": "application/json"
            }
          });
          setMessage(`Successfully Added Customer: ${formData.name}`);
        } catch (error) {
          console.error(error);
        }
      }
      setShow(true);
    }
  }

  function handleClose() {
    setShow(false);
    navigate('/customers');
  }

  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="border border-white mx-auto w-75 rounded p-4">
        <h3>{id ? 'Update Customer Information' : 'Add Customer'}</h3>
        <FloatingLabel htmlFor="name" label="Name" className="mb-3 text-dark">
          <Form.Control
            type="text"
            size="sm"
            id="name"
            name="name"
            pattern="[A-Z][a-z]*\s{0,1}([A-Z][a-z]*)*"
            placeholder="Name here"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please Enter a Valid Name</Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel htmlFor="email" label="Email" className="mb-3 text-dark">
          <Form.Control
            type="email"
            id="email"
            name="email"
            pattern="[\w.]+@[\w]+[.][a-z]{2,}"
            placeholder="Email here"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please Enter a Valid Email</Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel htmlFor="phone" label="Phone" className="mb-3 text-dark">
          <Form.Control
            type="text"
            id="phone"
            name="phone"
            pattern="[\d]{10}"
            placeholder="Phone here"
            onChange={handleChange}
            value={formData.phone}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please Enter a Valid 10 Digit Phone #</Form.Control.Feedback>
        </FloatingLabel>
        <Button type="submit" className={`${style.button} btn btn-primary w-25`}>Submit</Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{messageType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    </Container>
  );
}

export default CustomerForm;