import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../components/axiosConfig.js'
import { UserContext } from '../context/UserContext.jsx'


const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {setCurrentUser} = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value }
    })
  };
  const loginUser = async (e) =>{
    e.preventDefault();
    setError('')
    try {
   
     await axiosInstance
     .post(`/users/login`, userData)
     .then((data) => {
       console.log(`User Logged in! ${data.data}`);
       setCurrentUser(data.data)
       const token = data.data.token;
       const name = data.data.name;
       const userId = data.data.id;
       localStorage.setItem('token', token);
       localStorage.setItem('name', name);
       localStorage.setItem('id', userId);
       navigate("/");
       if(!data.data){
      return setError("Couldn't login user. please try again")
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
   <section className="login">
    <div className="container">
      <h2>Sign In</h2>
      <form className="form login-form" onSubmit={loginUser}>
       {error && <p className="form-error-message">{error}</p>}
        <input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} autoFocus/>
        <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler}/>
        <button type="submit" className="btn primary">Login</button>
      </form>
      <small>Don't have an account? <Link to={`/register`}>Sign Up</Link> </small>
    </div>
   </section>
  )
}

export default Login
