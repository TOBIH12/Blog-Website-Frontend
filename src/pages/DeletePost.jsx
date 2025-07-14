import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axiosInstance from '../components/axiosConfig';

const DeletePost = ({postId: id}) => {
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext)
  const location = useLocation();
  let token = currentUser?.token

  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  }, [])

  const deletePost = async () => {
    alert('Are you sure you want to delete this post? This action cannot be undone.');
    if(!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    try {
      axiosInstance.delete(`/posts/${id}`)
      .then((data) => {
        if(!data.data) {
          alert('Post not deleted, please try again');
        } 
        
        if(location.pathname == `/myposts/${currentUser?.id}`){
         navigate(0)
         alert('Post deleted successfully');
        }else{
          navigate('/');
          alert('Post deleted successfully');
        }
      })

    } catch (error) {
       setError(error.response?.data?.message || error.message || error || 'Something went wrong')
    }
  }



  return (
   <Link className='btn sm danger' onClick={() => deletePost(id)}>Delete</Link>
  )
}

export default DeletePost;