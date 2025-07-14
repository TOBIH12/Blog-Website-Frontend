import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Loader from '../components/Loader'
import axiosInstance from '../components/axiosConfig'
import DeletePost from './DeletePost'



const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext)
  const {id} = useParams();
  let token = currentUser?.token
  let loggedUserId = localStorage.getItem('id');

  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  })
  
  const getLoggedUserPosts = async () => {
    setIsLoading(true)
    try {
      await axiosInstance.get(`${import.meta.env.VITE_FRONTEND_BASE_URI}/posts/users/${loggedUserId}`).then((data) => {
        if(data){
          setIsLoading(false)
          setPosts(data.data)
          console.log(`Logged User Posts fectched sucessfully!, ${data.data}`);
        }else{
          setIsLoading(false);
          setPosts('No Posts Found')
          console.log(`Post not found`);
        }
      })
    } catch (error) {
      console.log(error)
      setError('Something went wrong');
    }
  }

 
  useEffect(() => {
    getLoggedUserPosts();
  }, [loggedUserId]);

if(isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    )
  };

  return (
   <section className="dashboard">
    {
      posts.length ? <div className="container dashboard-container">
        {
          posts.map((post) => {
            return <article key={post.id} className='dashboard-post'>
              <div className="dashboard-post-info">
                <div className="dashboard-post-thumbnail">
                  <img src={`${import.meta.env.VITE_FRONTEND_ASSETS_BASE_URI}/uploads/${post.thumbnail}`} alt={post.title} />
                </div>
                <h5>{post.title}</h5>
              </div>
              <div className="dashboard-post-actions">
                <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                <Link to={`/posts/edit/${post?._id}`} className='btn sm primary'>Edit</Link>
               <DeletePost postId={post?._id}/>
              </div>
            </article>
          })
        }
      </div> : <h2 className="center">You have no posts</h2>
    }
   </section>
  )
}

export default Dashboard;