import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'

const PostItem=({postID, thumbnail, category, title, description, authorID, createdAt}) => {
    const shortDescription = description.length > 145 ? description.substr(0, 145) + '...' : description;
    const postTitle = title.length > 30 ? title.substr(0, 30) + '...' : title; 
  return (
   <article className='post'>
    <div className="post-thumbnail">
        <img src={`${import.meta.env.VITE_FRONTEND_ASSETS_BASE_URI}/${thumbnail}`} alt={title} />
    </div>
    <div className="post-content">
        <Link to={`/posts/${postID}`} >
        <h3>{postTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{__html: shortDescription}}></p>
        <div className="post-footer">
            <PostAuthor authorID={authorID} createdAt={createdAt} />
            <Link className='btn category' to={`/posts/categories/${category}` }>{category}</Link>
        </div>
    </div>
   </article>
  )
}

export default PostItem;