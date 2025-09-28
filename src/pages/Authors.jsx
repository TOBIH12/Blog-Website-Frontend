import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../components/axiosConfig'
import Loader from '../components/Loader'


const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('No authors found');

  const getAuthors = async () => {
    setLoading(true);
    try {
      await axiosInstance.get(`${import.meta.env.VITE_FRONTEND_BASE_URI}/users`)
      .then((data) => {
        setAuthors(data.data);
        console.log(`Authors fetched successfully!`);
      })
      
    } catch (error) {
      console.log(error)
      setError('Something went wrong')
    }
    setLoading(false);
  }

useEffect(() => {
  getAuthors();
}, []);

if(loading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    )
  };

  return (
   <section className="authors">
    {authors.length > 0 ? <div className="container authors-container">
    {
      authors.map((author) => {
        return <Link key={author._id} to={`/posts/users/${author._id}`} className='author'>
          <div className="author-avatar">
            <img className='avatar' src={`${import.meta.env.VITE_FRONTEND_ASSETS_BASE_URI}/${author?.avatar}`} alt={`image of ${author.name}`} />
          </div>
          <div className="author-info">
            <h4>{author.name}</h4>
            <p>{` Posts: ${author.posts}`}</p>
          </div>
        </Link>
      })
    }
    </div> : <h2 className='center'>No authors found</h2> }
   </section>
  )
}

export default Authors;