import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from './axiosConfig'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({authorID,createdAt}) => {
const [author, setAuthor] = useState({});

const getAuthor = async () => {
  try {
    await axiosInstance.get(`/users/${authorID}`)
  .then((data) => {
    setAuthor(data?.data)
  })
  } catch (error) {
    console.log(error)
  }
  
}

useEffect(() => {
  getAuthor();
}, [])

  return (
   <Link to={`/posts/users/${author._id}`} className='post-author'>
    <div className="post-author-avatar">
        <img src={`${import.meta.env.VITE_FRONTEND_ASSETS_BASE_URI}/${author?.avatar}`} alt="" />
    </div>
    <div className="post-author-details">
        <h5>{author?.name}</h5>
        <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US'/></small>
    </div>
   </Link>
  )
}

export default PostAuthor;