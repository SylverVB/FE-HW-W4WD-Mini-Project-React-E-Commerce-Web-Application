
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from './Footer.module.css';

const Footer = () => {
  return (
    <footer className="text-center fixed-bottom py-3">
      <Container>
        <Row className={`${style["footer-links"]} justify-content-around footer-links`}>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <Link to="/underconstruction" className="footer-link">FAQ</Link>
          </Col>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <Link to="/underconstruction" className="footer-link">Contact</Link>
          </Col>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <Link to="/underconstruction" className="footer-link">Terms of Use</Link>
          </Col>
        </Row>
        <div className={`${style.copyright} text-center mt-3 copyright`}>
          &copy; 2024 E-Commerce App. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;