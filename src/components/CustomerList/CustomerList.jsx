import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/customers");
        setCustomers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCustomers();
  }, []);

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
      setCustomers(customers.filter(customer => customer.customer_id !== id));
    } catch (error) {
      console.log(error.response.data.error);
      setMessage(error.response.data.error);
      setShow(true);
    }
  };

  const handleClose = () => setShow(false);

  const handleViewOrders = (customerId) => {
    navigate(`/customers/${customerId}/orders`);
  };

  return (
    <Container className="border border-white rounded p-4 w-75">
      <h3>Customers</h3>
      <ListGroup>
        {customers.map(customer => (
          <Container key={customer.customer_id} className="mb-3">
            <ListGroup.Item className="li rounded border mb-2">{customer.name}</ListGroup.Item>
            <Button onClick={() => navigate(`/edit-customers/${customer.customer_id}`)} variant="outline-info" size="sm">Edit</Button>
            <Button onClick={() => handleDeleteCustomer(customer.customer_id)} variant="outline-danger" size="sm" className="ms-2 mt-1">Delete</Button>
            <Button onClick={() => handleViewOrders(customer.customer_id)} variant="outline-primary" size="sm" className="ms-2">View Orders</Button>
          </Container>
        ))}
      </ListGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CustomerList;