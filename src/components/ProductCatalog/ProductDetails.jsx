import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Header as="h2">{product.name}</Card.Header>
        <Card.Body>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Card.Text>
                <strong>Price:</strong> ${product.price}
              </Card.Text>
              <Card.Text>
                <strong>Stock Level:</strong> {product.stock_level}
              </Card.Text>
              <Button variant="primary" href={`/products/${product.product_id}`}>Edit</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;