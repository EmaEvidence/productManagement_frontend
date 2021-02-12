import React, {useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";

const SignUp = ({signUp, user}) => {
  let history = useHistory();
  const [geoLocatAvail, setGeoLocatAvail] = useState(true);
  const [location, setLocation] = useState({});
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    name: '',
    address: `${location.latitude ? `${location.latitude} - ${location.longitude}` : ''}`,
    phone: ''
  });

  useEffect(() => {
    if (user) {
      history.push('/products')
    }
  }, [user]);

  useEffect(() => {
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({
        latitude,
        longitude
      });
    }
  
    function error() {
      setGeoLocatAvail(false);
    }
  
    if(!navigator.geolocation) {
      setGeoLocatAvail(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  const handleChange = ({target}) => {
    const newDetails = {...userDetails};
    newDetails[target.name] = target.value
    setUserDetails(newDetails);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(userDetails, history);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form__wrapper">
      <Link to="/">Sign In</Link>
      <h2>Sign Up for Product Manger</h2>
      <div className="input_wrapper">
        <label htmlFor="">Name</label>
        <input type="text" name="name" onChange={(event) => handleChange(event)} value={userDetails.name} />
      </div>
      <div className="input_wrapper">
        <label htmlFor="">Email</label>
        <input type="text" name="email" onChange={(event) => handleChange(event)} value={userDetails.email} />
      </div>
      <div className="input_wrapper">
        <label htmlFor="">Phone</label>
        <input type="text" name="phone" onChange={(event) => handleChange(event)} value={userDetails.phone} />
      </div>
      <div className="input_wrapper">
        <label htmlFor="">Address</label>
        <input type="text" name="address" onChange={(event) => handleChange(event)} value={userDetails.location} />
      </div>
      <div className="input_wrapper">
        <label htmlFor="">Password</label>
        <input type="password" name="password" onChange={(event) => handleChange(event)} value={userDetails.password} />
      </div>
      <button> Sign Up </button>
    </form>
  )
};

export default SignUp;


