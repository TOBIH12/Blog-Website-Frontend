import React, { useState } from 'react'
import PostItem from './PostItem'
import Loader from './Loader'
import axiosInstance from './axiosConfig'
import { useEffect } from 'react'



const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('No posts found');

const getPosts = async () => {
  setLoading(true);
  try {
    await axiosInstance.get(`/posts`)
    .then((data) => {
      setPosts(data.data);
      console.log(`Posts fetched successfully!`);
    })
  } catch (error) {
    console.log(error)
    setError('Something went wrong')
  }
  setLoading(false);
}

useEffect(() => {
  getPosts();
}, []);


if(loading) {
  return (
    <div className="loader">
      <Loader />

    </div>
  )
}
  return (
  <section className='posts'>
{ posts.length > 0 ?  <div className="container posts-container">
{
    posts.map((post) => <PostItem key={post._id} postID={post._id} thumbnail={post.thumbnail} category={post.category} title={post.title} description={post.description} authorID={post.creator} createdAt={post.createdAt}  />)
}
</div> : <h2 className='center'>{error}</h2>
}
  </section>
  )
}

export default Posts;