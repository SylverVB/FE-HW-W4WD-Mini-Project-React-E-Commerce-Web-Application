import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, ListGroup, ListGroupItem, Button, Modal } from 'react-bootstrap';

const OrderList = () => {
  const { customerId } = useParams();
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCustomerAndOrders() {
      if (customerId) {
        try {
          // Fetch customer details
          const customerResponse = await axios.get(`http://127.0.0.1:5000/customers/${customerId}`);
          setCustomerName(customerResponse.data.name);

          // Fetch customer orders
          const ordersResponse = await axios.get(`http://127.0.0.1:5000/customers/${customerId}/orders`);
          if (ordersResponse.status === 404) {
            setOrders([]);
          } else {
            const ordersWithDetails = await Promise.all(ordersResponse.data.map(async (order) => {
              const totalResponse = await axios.get(`http://127.0.0.1:5000/orders/${order.order_id}/total`);
              const productsResponse = await axios.get(`http://127.0.0.1:5000/orders/${order.order_id}/products`);
              return { ...order, total: totalResponse.data.total_price, products: productsResponse.data };
            }));
            setOrders(ordersWithDetails);
          }
        } catch (error) {
          console.log(error);
          setOrders([]); // Ensure orders state is set to an empty array on error
        }
      }
    }
    fetchCustomerAndOrders();
  }, [customerId]);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/orders/${orderId}/cancel`);
      if (response.status === 200) {
        setOrders(orders.map(order => order.order_id === orderId ? { ...order, status: 'canceled' } : order));
        setMessage("Order canceled successfully");
      } else {
        setMessage("Failed to cancel order");
      }
      setShow(true);
    } catch (error) {
      console.error('Error canceling order:', error);
      setMessage("Failed to cancel order");
      setShow(true);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Orders for {customerName}</h3>
        <Button variant="outline-primary" onClick={() => navigate(`/customers/${customerId}/orders/new`)}>Place Order</Button>
      </div>
      {orders.length === 0 ? (
        <p className="text-center">No orders yet.</p>
      ) : (
        <ListGroup className="mt-3">
          {orders.map(order => (
            <ListGroupItem key={order.order_id} className="d-flex flex-column mb-3">
              <div className="mb-2">
                Order ID: {order.order_id}, Date: {order.date}, Status: {order.status}, Total: ${order.total.toFixed(2)}
              </div>
              <div>
                <strong>Products:</strong>
                <ListGroup className="mt-2">
                  {order.products.map(product => (
                    <ListGroupItem key={product.product_id}>
                      {product.name} - ${product.price.toFixed(2)}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
              {order.status !== 'shipped' && order.status !== 'completed' && order.status !== 'canceled' && (
                <Button variant="danger" onClick={() => handleCancelOrder(order.order_id)} className="mt-3">Cancel Order</Button>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default OrderList;