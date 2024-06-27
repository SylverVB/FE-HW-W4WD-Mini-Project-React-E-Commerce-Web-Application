import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import styles from './AdministratorForm.module.css';

const AdministratorForm = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock_level: ""
  });
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("Success!");

  useEffect(() => {
    if (productId) {
      axios.get(`http://127.0.0.1:5000/products/${productId}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
        });

      // Fetch stock level
      axios.get(`http://127.0.0.1:5000/products/${productId}/stock`)
        .then(response => {
          setFormData(prevState => ({ ...prevState, stock_level: response.data.stock_level }));
        })
        .catch(error => {
          console.error('Error fetching stock level:', error);
        });
    }
  }, [productId]);

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
        if (productId) {
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
        setMessageType("Error");
        setMessage('Failed to update product');
        setShow(true);
      }
    }
  };

  const handleRestock = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/products/restock', {
        low_level: 5,
        restock_amount: 20
      });
      setMessage('Products restocked successfully');
      setShow(true);
    } catch (error) {
      console.error('Error restocking products:', error);
      setMessageType('Error');
      setMessage('Failed to restock products');
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
    navigate('/products');
  };

  return (
    <Container className={styles.formContainer}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h3>{productId ? 'Update Product' : 'Add New Product'}</h3>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">Please enter a valid name.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">Please enter a valid price.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="stock_level" className="mb-3">
          <Form.Label>Stock Level</Form.Label>
          <Form.Control
            type="number"
            name="stock_level"
            value={formData.stock_level}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">Please enter a valid stock level.</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="btn btn-primary">
          {productId ? 'Update Product' : 'Add New Product'}
        </Button>
        <Button variant="success" onClick={handleRestock} className="ms-3">Restock Products</Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{messageType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdministratorForm;













// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { Button, Container, Form, Modal } from 'react-bootstrap';
// import styles from './AdministratorForm.module.css';

// const AdministratorForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { state } = location;
//   const productId = state?.productId || null;

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     stock_level: ""
//   });
//   const [validated, setValidated] = useState(false);
//   const [show, setShow] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("Success!");

//   useEffect(() => {
//     if (productId) {
//       axios.get(`http://127.0.0.1:5000/products/${productId}`)
//         .then(response => {
//           setFormData(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching product data:', error);
//         });
//     }
//   }, [productId]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.target;
//     if (form.checkValidity() === false) {
//       event.stopPropagation();
//       setValidated(true);
//     } else {
//       try {
//         if (productId) {
//           await axios.put(`http://127.0.0.1:5000/products/${productId}`, formData, {
//             headers: { "Content-Type": "application/json" }
//           });
//           setMessage(`Successfully Updated Product: ${formData.name}`);
//         } else {
//           await axios.post(`http://127.0.0.1:5000/products`, formData, {
//             headers: { "Content-Type": "application/json" }
//           });
//           setMessage(`Successfully Added Product: ${formData.name}`);
//         }
//         setShow(true);
//       } catch (error) {
//         console.error('Error submitting product form:', error);
//         setMessageType("Error");
//         setMessage('Failed to update product');
//         setShow(true);
//       }
//     }
//   };

//   const handleClose = () => {
//     setShow(false);
//     navigate('/products');
//   };

//   return (
//     <Container className={styles.formContainer}>
//       <Form noValidate validated={validated} onSubmit={handleSubmit}>
//         <h3>{productId ? 'Update Product' : 'Add New Product'}</h3>
//         <Form.Group controlId="name" className="mb-3">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <Form.Control.Feedback type="invalid">Please enter a valid name.</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group controlId="price" className="mb-3">
//           <Form.Label>Price</Form.Label>
//           <Form.Control
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//           />
//           <Form.Control.Feedback type="invalid">Please enter a valid price.</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group controlId="stock_level" className="mb-3">
//           <Form.Label>Stock Level</Form.Label>
//           <Form.Control
//             type="number"
//             name="stock_level"
//             value={formData.stock_level}
//             onChange={handleChange}
//             required
//           />
//           <Form.Control.Feedback type="invalid">Please enter a valid stock level.</Form.Control.Feedback>
//         </Form.Group>
//         <Button type="submit" className="btn btn-primary">
//           {productId ? 'Update Product' : 'Add New Product'}
//         </Button>
//       </Form>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{messageType}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{message}</Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default AdministratorForm;