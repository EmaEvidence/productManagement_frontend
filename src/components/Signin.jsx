import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";

const SignIn = ({signIn, user}) => {
  let history = useHistory();
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      history.push('/products')
    }
  }, [user]);

  const handleChange = ({target}) => {
    const newDetails = {...userDetails};
    newDetails[target.name] = target.value
    setUserDetails(newDetails);
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn(userDetails, history);
  }

  return (
    <form onSubmit={(e) => handleSignIn(e)} className="form__wrapper">
      <Link to="/signup">Sign Up</Link>
      <h2>Sign In to Product Manger</h2> 
      <div className="input_wrapper">
        <label htmlFor="">Email</label>
        <input type="email" required name="email" onChange={(event) => handleChange(event)} id="username" value={userDetails.email} />
      </div>
      <div className="input_wrapper">
        <label htmlFor="">Password</label>
        <input type="password" required name="password" onChange={(event) => handleChange(event)} id="username" value={userDetails.password} />
      </div>
      <button type="submit"> Login </button>
    </form>
  )
};

export default SignIn;


