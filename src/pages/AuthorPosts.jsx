import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import { useParams } from 'react-router-dom';
import axiosInstance from '../components/axiosConfig';
import Loader from '../components/Loader';

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {id} = useParams();
  

  const getAuthorPosts = async () => {
    setLoading(true);
    if(!id) {
      setError('No author found')
      setLoading(false);
      return
    };
    try {
      await axiosInstance.get(`${import.meta.env.VITE_FRONTEND_BASE_URI}/posts/users/${id}`)
      .then((data) => {
        setPosts(data.data);
        console.log(`User posts fetched successfully!`);
      })
    } catch (error) {
      console.log(error)
      setError('Something went wrong')
    }
    setLoading(false);
  }

  useEffect(() => {
    getAuthorPosts();
  }, []);

  if(loading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    )
  };



  return (
    <section className='author-posts'>
    { posts.length > 0 ?  <div className="container author-posts-container">
    {
        posts.map((post) => <PostItem key={post._id} postID={post._id} thumbnail={post.thumbnail} category={post.category} title={post.title} description={post.description} authorID={post.creator} createdAt={post.createdAt}/>)
    }
    </div> : <h2 className='center'>No posts for now</h2>
    }
      </section>
  )
}

export default AuthorPosts;