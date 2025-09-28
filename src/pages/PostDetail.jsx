import React, {useContext, useState, useEffect} from 'react'
import PostAuthor from '../components/PostAuthor'
import {Link, useParams } from 'react-router-dom'
// import Thumbnail from '../assets/blog22.jpg'
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader';
import DeletePost from './DeletePost';
import axiosInstance from '../components/axiosConfig';
import LikeButton from '../components/LikeButton';

const PostDetail = () => {
const {id} = useParams()
const [post, setPost] = useState(null)
const [creatorID, setCreatorID] = useState(null)
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(false)



const {currentUser} = useContext(UserContext);

const isLikedByUser = post?.likes.includes(currentUser?.id);



useEffect(() => {
const getPost = async () => {
  setIsLoading(true)
  try {
    await axiosInstance.get(`${import.meta.env.VITE_FRONTEND_BASE_URI}/posts/${id}`)
    .then((data) => {
      setPost(data.data);
      setCreatorID(data.data.creator);
    });
  } catch (error) {
    setError(error)
  }

  setIsLoading(false);
}
getPost();
}, [])


if(isLoading) {
  return <div className="loader">
  <Loader />
</div>
}


  return (
  <section className='post-detail'>
    {error && <p className='error'>{error}</p> }
    {post && <div className="container post-detail-container">
      <div className="post-detail-header">
         <PostAuthor authorID={post.creator} createdAt={post.createdAt}/> 
      {currentUser?.id == post?.creator &&   <div className="post-detail-btns">
          <Link to={`/posts/edit/${post?._id}`} className='btn sm primary'>Edit</Link>
         <DeletePost postId={id}/>
        </div>}
      </div>
      <h1>{post.title}</h1>
      <div className="post-detail-thumbnail">
        <img src={`${import.meta.env.VITE_FRONTEND_ASSETS_BASE_URI}/${post.thumbnail}`} alt="" />
      </div>
      <p dangerouslySetInnerHTML={{__html: post.description}}></p>

      <LikeButton post={post} id={post._id} initialLikes={post.likes.length} isLikedByUser={isLikedByUser} currentUser={currentUser}/>

    </div>}
  </section>
  )
}

export default PostDetail;