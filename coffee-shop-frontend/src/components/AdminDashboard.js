import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Only once



// Remove this duplicate line (if it exists):
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; 

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken')); // Get JWT token from localStorage
  const history = useHistory();

  // Fetch all products (Admin Only)
  useEffect(() => {
    if (!token) {
      history.push('/login'); // Redirect to login if not authenticated
      return;
    }

    axios
      .get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Edit a Product
  const handleSubmit = (e) => {
    e.preventDefault();

    const apiEndpoint = editingProduct
      ? `http://localhost:5000/api/products/${editingProduct._id}`
      : 'http://localhost:5000/api/products';

    const method = editingProduct ? 'put' : 'post';

    axios({
      method,
      url: apiEndpoint,
      data: formData,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (editingProduct) {
          setProducts((prev) =>
            prev.map((product) =>
              product._id === res.data._id ? res.data : product
            )
          );
        } else {
          setProducts((prev) => [...prev, res.data]);
        }
        setFormData({
          name: '',
          description: '',
          price: '',
          image: '',
        });
        setEditingProduct(null);
      })
      .catch((err) => console.error(err));
  };

  // Handle Edit Product
  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setEditingProduct(product);
  };

  // Handle Delete Product
  const handleDeleteProduct = (productId) => {
    axios
      .delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setProducts(products.filter((product) => product._id !== productId));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Product Image URL"
          value={formData.image}
          onChange={handleInputChange}
        />
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h3>All Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <div>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <img src={product.image} alt={product.name} width="100" />
              <button onClick={() => handleEditProduct(product)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
