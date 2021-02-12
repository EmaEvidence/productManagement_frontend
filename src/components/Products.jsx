import React, {useEffect, useState} from 'react';
import { Link, useHistory } from "react-router-dom";

const Products = ({products, getProducts, user}) => {
  const [location, setLocation] = useState('');
  const history = useHistory();
  useEffect(() => {
      if (!user) {
        history.push('/')
      }
    }, [user]);
  const handleChange = ({target}) => {
    setLocation(target.value);
  }

  const handleGetProductByLocation = (e) => {
    e.preventDefault();
    getProducts(location);
  }

  

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products, '=--=-=-=-=-=-')
  return (
    <div className="products__wrapper">
      <form onSubmit={(e) => handleGetProductByLocation(e)} className="location_filter">
        <div className="input_wrapper">
          <input type="text" required onChange={(e) => handleChange(e)} name="location" value={location} placeholder="Enter location" />
        </div>
        <button type="submit"> Find a Product </button>
        <Link to="createproduct"><button type="button"> Add a Product </button></Link>
      </form>
      <div className="products__container">
        {
          products.length === 0 ? <span>No product yet</span> : (
            products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="product_card">
                  <img className="product_image" src={product.image} alt={product.name} />
                  <span className="product_name">{product.name}</span>
                  <span className="product_owner">{product.userName}</span>
                  <span className="product_location">{product.location}</span>
                </div>
              </Link>
              
            ))
          )
        }
      </div>
    </div>
  )
};

export default Products;
