import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDelete = (productId) => {
    axios.delete(`http://127.0.0.1:5000/products/${productId}`)
      .then(() => {
        setProducts(products.filter(product => product.product_id !== productId));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2>Product List</h2>
        <Button variant="primary" onClick={() => navigate('/products/new', { state: { isEdit: false } })}>Add Product</Button>
      </div>
      <ListGroup className="mt-3">
        {products.map(product => (
          <ListGroupItem key={product.product_id} className="d-flex justify-content-between align-items-center">
            <div>
              {/* <strong>{product.name}</strong> - ${product.price} - Stock: {product.stock_level} */}
              <strong>{product.name}</strong> - ${product.price}
            </div>
            <div>
              <Button variant="warning" className="me-2" onClick={() => navigate('/products/new', { state: { isEdit: true, productId: product.product_id } })}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(product.product_id)}>Delete</Button>
              <Button variant="info" className="ms-2" onClick={() => navigate(`/products/administrator/${product.product_id}`)}>Administrator</Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ProductList;