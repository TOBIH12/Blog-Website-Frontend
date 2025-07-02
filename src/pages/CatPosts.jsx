import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import axiosInstance from '../components/axiosConfig';




const CatPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const params = useParams();

    const getCategoryPosts = async () => {
        setLoading(true);
        if(!params) {
          setError('No category posts found')
          setLoading(false);
          return
        };
        try {
          await axiosInstance.get(`${import.meta.env.VITE_FRONTEND_BASE_URI}/posts/categories/${params.category}`)
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
        getCategoryPosts();
      }, [params.category]);
    
      if(loading) {
        return (
          <div className="loader">
            <Loader />
          </div>
        )
      };
    

  return (
    <section className='category-posts'>
    { posts.length > 0 ?  <div className="container category-posts-container">
    {
       posts.map((post) => <PostItem key={post._id} postID={post._id} thumbnail={post.thumbnail} category={post.category} title={post.title} description={post.description} authorID={post.creator} createdAt={post.createdAt}/>)
    }
    </div> : <h2 className='center'>No posts under this category yet</h2>
    }
      </section>
  )
}

export default CatPosts;