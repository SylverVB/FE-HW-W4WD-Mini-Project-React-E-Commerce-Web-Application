# React E-commerce Web Application

This project is a front-end e-commerce web application built using React. The application allows customers to explore products, manage their shopping carts, and place orders. Administrators can oversee product inventory, monitor orders, and ensure the smooth operation of the platform.

## Table of Contents
- [React E-commerce Web Application](#react-e-commerce-web-application)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Backend Dependency](#backend-dependency)
  - [Project Structure](#project-structure)
  - [API Endpoints](#api-endpoints)
  - [Component Overview](#component-overview)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contributors License Agreement (CLA)](#contributors-license-agreement-cla)

## Features
- **Customer Management**:
  - Create, read, update, and delete customer information.
  - Confirmation modals for securely creating, updating, or deleting a customer.
- **Product Catalog**:
  - List all products, view product details, create, update, and delete products.
  - Manage product stock levels and restock products when inventory is low.
- **Order Processing**:
  - Place new orders, retrieve order details, track order status, manage order history, cancel orders, and calculate order total prices.
- **Routing and Navigation**:
  - Implemented using React Router for navigating between different sections and pages of the application.
- **Form Handling and Validation**:
  - Forms for capturing user inputs, with validation and submission handling.
- **Integration with React-Bootstrap**:
  - Enhanced UI with React-Bootstrap components and styling.

## Technologies Used
- **Frontend**: React, React Router, Axios, React-Bootstrap
- **Styling**: CSS Modules

## Installation
1. **Clone the repository**:
   ```sh
   git clone https://github.com/SylverVB/FE-HW-W4WD-Mini-Project-React-E-Commerce-Web-Application.git
   cd FE-HW-W4WD-Mini-Project-React-E-Commerce-Web-Application
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the application**:
   ```sh
   npm start
   ```

   The application will run on `http://localhost:5173`.

## Backend Dependency
This project depends on a backend E-commerce API built using Flask, Flask-SQLAlchemy, and Marshmallow. The API provides endpoints for managing products, orders, and customer accounts. The API allows customers to browse products, add them to their shopping carts, place orders, and manage their accounts. Administrators can manage product inventory, track orders, and ensure a seamless shopping experience.

**Backend Project**: [E-commerce API](https://github.com/SylverVB/BE-HW-W4D5-ORM-Flask-SQLAlchemy-E-Commerce-API.git)

Follow the instructions in the backend project repository to set up and run the API. Ensure that the API is running on `http://localhost:5000` before starting the frontend application.

## Project Structure
```
react-e-commerce-web-application
├── node_modules
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── CustomerForm
│   │   │   ├── CustomerForm.jsx
│   │   │   └── CustomerForm.module.css
│   │   ├── CustomerList
│   │   │   └── CustomerList.jsx
│   │   ├── Footer
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.module.css
│   │   ├── HomePage
│   │   │   └── HomePage.jsx
│   │   ├── NavBar
│   │   │   ├── NavBar.jsx
│   │   │   └── NavBar.module.css
│   │   ├── NotFound
│   │   │   └── NotFound.jsx
│   │   ├── OrderProcessing
│   │   │   ├── OrderList.jsx
│   │   │   ├── PlaceOrderForm.jsx
│   │   │   └── PlaceOrderForm.module.css
│   │   ├── ProductCatalog
│   │   │   ├── AdministratorForm.jsx
│   │   │   ├── AdministratorForm.module.css
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductList.jsx
│   │   │   └── ProductList.module.css
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## API Endpoints
- **Customer Management**:
  - `GET /customers`: Retrieve a list of all customers.
  - `GET /customers/:id`: Retrieve details of a specific customer.
  - `POST /customers`: Add a new customer.
  - `PUT /customers/:id`: Update an existing customer.
  - `DELETE /customers/:id`: Delete a customer.

- **Product Catalog**:
  - `GET /products`: Retrieve a list of all products.
  - `GET /products/:id`: Retrieve details of a specific product.
  - `POST /products`: Add a new product.
  - `PUT /products/:id`: Update an existing product.
  - `DELETE /products/:id`: Delete a product.
  - `POST /products/restock`: Restock products with low inventory.

- **Order Processing**:
  - `POST /orders`: Place a new order.
  - `GET /orders/:id`: Retrieve details of a specific order.
  - `PUT /orders/:id/cancel`: Cancel an order.

## Component Overview
- **CustomerForm**: 
  - `CustomerForm.jsx`: Form component for creating and updating customer information.
  - `CustomerForm.module.css`: Styling for the CustomerForm component.

- **CustomerList**: 
  - `CustomerList.jsx`: List of all customers with options to edit or delete.

- **Footer**: 
  - `Footer.jsx`: Footer component.
  - `Footer.module.css`: Styling for the Footer component.

- **HomePage**: 
  - `HomePage.jsx`: Homepage of the application.

- **NavBar**: 
  - `NavBar.jsx`: Navigation bar component.
  - `NavBar.module.css`: Styling for the NavBar component.

- **NotFound**: 
  - `NotFound.jsx`: Component for handling 404 errors.

- **OrderProcessing**:
  - `OrderList.jsx`: List of all orders.
  - `PlaceOrderForm.jsx`: Form for placing new orders.
  - `PlaceOrderForm.module.css`: Styling for the PlaceOrderForm component.

- **ProductCatalog**:
  - `AdministratorForm.jsx`: Form for adding and updating product information.
  - `AdministratorForm.module.css`: Styling for the AdministratorForm component.
  - `ProductDetails.jsx`: Detailed view of a product.
  - `ProductForm.jsx`: Form for adding and updating product information.
  - `ProductList.jsx`: List of all products.
  - `ProductList.module.css`: Styling for the ProductList component.

## Usage
1. **Customer Management**:
   - Add, update, and delete customer information using the CustomerForm component.
   - View customer details and list of all customers.

2. **Product Catalog**:
   - Add, update, and delete products using the AdministratorForm and ProductForm components.
   - View product details, list of all products, and manage stock levels.

3. **Order Processing**:
   - Place new orders using the PlaceOrderForm component.
   - Retrieve order details, track order status, manage order history, and cancel orders.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This application is the property of Victor Bondaruk. As the owner, [Victor Bondaruk](https://github.com/SylverVB) retains all rights to the application.

## Contributors License Agreement (CLA)
By making a contribution to this project, you agree to the following terms and conditions for your contributions:

1. You grant the owner, Victor Bondaruk, a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable license to use, distribute, and modify your contributions as part of this project.
2. You represent that you are legally entitled to grant the above license.
3. You agree to promptly notify the owner of any facts or circumstances of which you become aware that would make these representations inaccurate in any respect.