import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from 'axios';

import './App.css';
import CreateProduct from './components/CreateProduct';
import Products from './components/Products';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Product from './components/Product';

const baseUrl = 'http://localhost:3001';

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const signUp = (data, history) => {
    setIsLoading(true);
    axios.post(`${baseUrl}/user/signup`, data)
    .then((response) => {
      alert(response.data.message);
      setIsLoading(false);
      setUser(response.data.data);
      axios.defaults.headers.common['Authorization'] = response.data.data.token;
      history.push('/products');
    })
    .catch((error) => {
      alert(error?.response?.data?.message);
      setIsLoading(false);
    });
  }

  const signIn = (data, history) => {
    setIsLoading(true);
    axios.post(`${baseUrl}/user/signin`, data)
    .then((response) => {
      alert(response.data.message);
      setIsLoading(false);
      setUser(response.data.data);
      axios.defaults.headers.common['Authorization'] = response.data.data.token;
      history.push('/products');
    })
    .catch((error) => {
      alert(error?.response?.data?.message);
      setIsLoading(false);
    });
  }

  const addProduct = (data) => {
    setIsLoading(true);
    axios({
      method: 'post',
      url: `${baseUrl}/product`,
      data: data,
      headers: {'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      alert(response.data.message);
      setIsLoading(false);
      const newProducts = [...products];
      newProducts.push(response.data.data);
      setProducts(newProducts);
    })
    .catch((error) => {
      alert(error.response.data.message);
      setIsLoading(false);
    });
  }

  const getProducts = (location=user.address) => {
    setIsLoading(true)
    axios.get(`${baseUrl}/products/${location}`).then((response) => {
      alert(response.data.message);
      setIsLoading(false);
      const newProducts = [...response.data.data];
      setProducts(newProducts);
    })
    .catch((error) => {
      alert(error.response.data.message);
      setIsLoading(false);
    });
  }

  const commentOnProduct = (comment, productId) => {
    setIsLoading(true)
    axios.put(`${baseUrl}/product/${productId}/comment`, comment).then((response) => {
      alert(response.data.message);
      setIsLoading(false);
      const newProducts = [...products].map((product) => {
        if (product._id === productId) {
          return response.data.data
        }
        return product;
      });
      
      setProducts(newProducts);
    })
    .catch((error) => {
      alert(error.response.data.message);
      setIsLoading(false);
    });
  }

  const replyComment = (reply, productId, commentId) => {
    setIsLoading(true)
    axios.get(`${baseUrl}/products/${productId}/${commentId}/reply`).then((response) => {
      alert(response.data.message);
      setIsLoading(false);
      const newProducts = [...response.data.data];
      setProducts(newProducts);
    })
    .catch((error) => {
      alert(error.response.data.message);
      setIsLoading(false);
    });
  }

  return (
    <>
      {
        isLoading && <div className="loader">Loading...</div>
      }
      <Router>
        <Switch>
          <Route path="/products" exact render={() => <Products user={user} getProducts={getProducts} products={products} replyComment={replyComment} />} />
          <Route path="/createproduct" exact render={() => <CreateProduct user={user} addProduct={addProduct} />} />
          <Route path="/product/:id" exact render={() => <Product user={user} products={products} replyComment={replyComment} commentOnProduct={commentOnProduct} />}  />
          <Route path="/" exact render={() => <SignIn user={user} signIn={signIn} />} />
          <Route path="/signup" exact render={() => <SignUp user={user} signUp={signUp} />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
