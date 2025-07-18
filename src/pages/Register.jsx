import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value }
    })
  }

  const registerUSer = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios
      .post(`${import.meta.env.VITE_FRONTEND_BASE_URI}/users/register`, userData)
      .then((data) => {
        let registrationData = data.data;
        console.log(`User Registered: ${registrationData}`);
        navigate("/login");
        if(!registrationData){
       return setError("Couldn't register user. please try again")
        }
      })
     
    } catch (err) {
      console.log(err)
        if(err){
          setError(err.response.data.message)
        }
    }
  }

  return (
   <section className="register">
    <div className="container">
      <h2>Sign Up</h2>
      <form className="form register-form" onSubmit={registerUSer}>
       {error && <p className="form-error-message">{error}</p>}
        <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandler}/>
        <input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler}/>
        <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler}/>
        <input type="password" placeholder='Confirm Password' name='password2' value={userData.password2} onChange={changeInputHandler}/>
        <button type="submit" className="btn primary">Register</button>
      </form>
      <small>Already have an account? <Link to={`/login`}>Sign In</Link> </small>
    </div>
   </section>
  )
}

export default Register
