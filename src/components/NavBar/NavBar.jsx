import React from 'react';
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Modal, Button, Form } from 'react-bootstrap';
import style from './NavBar.module.css';

function NavBar() {
  const [showSignIn, setShowSignIn] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);

  const handleCloseSignIn = () => setShowSignIn(false);
  const handleShowSignIn = () => setShowSignIn(true);
  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  return (
    <>
      <Navbar expand="lg" className={`${style.navbar} bg-primary navbar-dark`}>
        <Container>
          <Navbar.Brand className="text-white" href="/">E-Commerce App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border border-white" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav className="ms-auto">
              <NavDropdown title="Why Us?" id="why-us-dropdown">
                <NavDropdown.Item href="#">Our Mission</NavDropdown.Item>
                <NavDropdown.Item href="#">Our History</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Customers" id="customers-dropdown">
                <NavDropdown.Item as={Link} to="/customers">View Customers</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/add-customer">Add Customer</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Products" id="products-dropdown">
                <NavDropdown.Item as={Link} to="/products">Product Catalog</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/products/new">Add New Product</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Orders" id="orders-dropdown">
                <NavDropdown.Item as={Link} to="/customers/:customerId/orders/new">Place Order</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Button variant="outline-light ms-5" onClick={handleShowSignIn}>Sign In</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sign In Modal */}
      <Modal show={showSignIn} onHide={handleCloseSignIn}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="signInEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signInPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="rememberMe">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit">Sign In</Button>
            <div className="mt-3">
              <p>New around here? <Button variant="link" onClick={handleShowSignUp}>Sign Up</Button></p>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Sign Up Modal */}
      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="signUpName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="John Doe" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signUpEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signUpPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signUpConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" required />
            </Form.Group>
            <Button variant="secondary" onClick={handleCloseSignUp}>Cancel</Button>
            <Button variant="primary" type="submit">Sign Up</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
