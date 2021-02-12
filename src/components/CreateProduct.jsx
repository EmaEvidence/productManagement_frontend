import React, {useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";

const CreateProduct = ({addProduct, user}) => {
  const history = useHistory();
  useEffect(() => {
      if (!user) {
        history.push('/')
      }
    }, [user]);
  const [productDetails, setProductDetails] = useState({
    name: '',
    location: '',
    image: ''
  })

  const handleChange = ({target}) => {
    const newDetails = {...productDetails};
    newDetails[target.name] = target.name === 'image' ? target.files[0] : target.value
    setProductDetails(newDetails);
  }

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append('name', productDetails.name);
    bodyFormData.append('location', productDetails.location);
    bodyFormData.append('image', productDetails.image);
    addProduct(bodyFormData);
  }
  return (
    <form onSubmit={(e) => handleCreateProduct(e)} className="form__wrapper">
      <h2>Create Product</h2>
      <div className="link_wrapper">
        <Link to="/"><button> View Products </button></Link>
      </div>
      <div className="input_wrapper">
        <label htmlFor="">Product Name</label>
        <input type="text" required name="name" onChange={(e) => handleChange(e)} value={productDetails.name} />
      </div>
      <div className="input_wrapper">
        <label htmlFor="">Location</label>
        <input type="text" name="location" onChange={(e) => handleChange(e)} value={productDetails.location} />
      </div>
      <div className="input_wrapper">
        <label htmlFor="">Image</label>
        <input type="file" name="image" onChange={(e) => handleChange(e)} value={productDetails.file} />
      </div>
      <button type="submit"> Create Product </button>
    </form>
  )
};

export default CreateProduct;


