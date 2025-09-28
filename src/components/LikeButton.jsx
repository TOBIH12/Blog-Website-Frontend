import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
// import { UserContext } from '../context/UserContext';
import axios from 'axios';




const LikeButton = ({post, id, initialLikes, isLikedByUser, currentUser}) => {

const [liked, setLiked] = useState(isLikedByUser)
const [likes, setLikes] = useState(initialLikes)

// const {currentUser} = useContext(UserContext);




const handleLike = async () => {
  
    try {
      {
        await axios.put(`${import.meta.env.VITE_FRONTEND_BASE_URI}/posts/like/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }).then((data) => {
          setLikes(data.data)
          setLiked(!liked);
        })
      } 
    } catch (error) {
      console.log(error)
    }
  }
  

  useEffect(() => {
    if(currentUser && post) {
      if(post.likes.includes(currentUser.id)) {
        setLiked(true)
      } else {
        setLiked(false)
      }
    }
  }, [currentUser, post])
  

  return (
    <div className='likeDiv'>
        {
liked ? <FaHeart className="liked" onClick={handleLike}/> : <FaRegHeart className="likeBtn" onClick={handleLike}/>
        }
      
      <span>{likes} {likes == 1 ? 'like' : 'likes'}</span>
      </div>
  )
}

export default LikeButton;