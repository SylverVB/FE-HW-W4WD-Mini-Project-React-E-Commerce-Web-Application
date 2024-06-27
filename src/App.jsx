import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CustomerList from './components/CustomerList/CustomerList';
import CustomerForm from './components/CustomerForm/CustomerForm';
import NotFound from './components/NotFound/NotFound';
import ProductList from './components/ProductCatalog/ProductList';
import ProductForm from './components/ProductCatalog/ProductForm';
import ProductDetails from './components/ProductCatalog/ProductDetails';
import AdministratorForm from './components/ProductCatalog/AdministratorForm';
import OrderList from './components/OrderProcessing/OrderList';
import PlaceOrderForm from './components/OrderProcessing/PlaceOrderForm';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer.jsx/Footer';
import './App.css';

function App() {
  return (
    <div id="app-container">
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/customers' element={<CustomerList />} />
        <Route path='/add-customer' element={<CustomerForm mode="add" />} />
        <Route path='/edit-customers/:id' element={<CustomerForm mode="edit" />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/products/new' element={<ProductForm />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/products/administrator/:id' element={<AdministratorForm />} />
        <Route path='/customers/:customerId/orders' element={<OrderList />} />
        <Route path='/customers/:customerId/orders/new' element={<PlaceOrderForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;