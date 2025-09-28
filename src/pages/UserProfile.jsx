import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader';
import axiosInstance from '../components/axiosConfig';

const UserProfile = () => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [isAvatarTouched, setIsAvatarTouched] = useState(false);


  const {currentUser} = useContext(UserContext);
  let token = currentUser?.token;

  let userName = localStorage.getItem('name');
  let userID = localStorage.getItem('id');

  useEffect(() => {
    if (!token){
      navigate('/login')
    }
  }, []);

  const getLoggedUserDetails = async () => {
    setIsLoading(true)
    try {
      await axiosInstance.get(`/users/${userID}`)
      .then((data) => {
        if(!data){
          setIsLoading(false)
          setError(`User Details failed to retrieve`)
        }else{
          setIsLoading(false)
            setAvatar(data.data.avatar)
            setName(data.data.name)
            setEmail(data.data.email)
        }
      })
    } catch (err) {
      console.log(err)
      setError('Something went wrong');
    }
  };

  const updateUserInfo = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const userData = new FormData();
    // userData.set('avatar', avatar);
    userData.set('name', name);
    userData.set('email', email);
    userData.set('currentPassword', currentPassword);
    userData.set('newPassword', password);
    userData.set('newConfirmNewPassword', confirmNewPassword);


    if(!name || !email || !currentPassword || !password || !confirmNewPassword) {
      setIsLoading(false)
      return setError('All fields are required')
    }

    if( password !== confirmNewPassword) {
      setIsLoading(false)
      return setError('New Password and Confirm New Password do not match')
    }

    try {
      await axiosInstance.put(`/users/edit-user`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((data) => {
        if(!data.data){
          setIsLoading(false)
          setError(`User Details failed to update`)
        }else{
          setIsLoading(false)
          console.log(`User Info Updated, ${data.data}`)
          navigate(`/logout`); // Redirect to logout to clear local storage
          localStorage.removeItem('name');
          localStorage.removeItem('id');
          localStorage.removeItem('token');
        }
      })
    } catch (err) {
      if(err){
        console.log(err)
        setError(err.response?.data?.message || err.message || err );
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    getLoggedUserDetails();
  }, [userID]);

  if(isLoading){
    return (
      <div className="loader">
        <Loader />
      </div>
    )
  };

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const avatarData = new FormData();
      avatarData.set('avatar', avatar);
      await axiosInstance.post(`/users/change-avatar`, avatarData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((data) => {
        if(!data.data){
          setError(`Avatar failed to update`)
        }else{
          console.log(`Avatar Updated, ${data.data}`)
          setAvatar(data.data.avatar);
          setIsAvatarTouched(false);
          getLoggedUserDetails();
        }
      })
    } catch (err) {
      console.log('Axios Error ->>>',err)
      setError(err.response?.data?.message || err.message || err );
    }
  }



  return (
   <section className="profile">
    <div className="container profile-container">
      <Link to={`/myposts/${userID}`} className='btn'>My posts</Link>

      <div className="profile-details">
        <div className="avatar-wrapper">
          <div className="profile-avatar">
            <img src={`${import.meta.env.VITE_FRONTEND_ASSETS_BASE_URI}/${avatar}`} alt="" />
          </div>
          {/* FORM TO UPDATE PROFILE AVATAR (PROFILE PICTURE) */}
          <form className='avatar-form'>
            <input type="file" name='avatar' id='avatar' onChange={(e) => setAvatar(e.target.files[0])} accept='png, jpg, jpeg'/>
            <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)} className="profile-avatar-label">
            <FaEdit />
            </label>
          </form>
        { isAvatarTouched &&   <button className="profile-avatar-btn" onClick={changeAvatarHandler}><FaCheck /></button>}
        </div>
        <h1>{userName}</h1>

        {/* FORM TO UPDATE USER DETAILS */}

        <form className='form profile-form'>
         {error && <p className="form-error-message">
            {error.message || error}
          </p>}
          <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)}/>
          <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder='Current Password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
          <input type="password" placeholder='New Password' value={password} onChange={e => setNewPassword(e.target.value)}/>
          <input type="password" placeholder='Confirm new password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}/>
          <button type='submit' className="btn primary" onClick={updateUserInfo}>Update details</button>
        </form>
      </div>
    </div>
   </section>
  )
}

export default UserProfile;