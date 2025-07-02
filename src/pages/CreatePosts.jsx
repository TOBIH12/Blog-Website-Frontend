import React, { useState, useContext, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { UserContext } from '../context/UserContext'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../components/axiosConfig'


const CreatePosts = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext);
  let token = currentUser?.token;

  useEffect(() => {
    if (!token){
      navigate('/login')
    }
  }, [])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const POST_CATEGORIES = ['Agriculture', 'Business', 'Education', 'Entertainment', 'Art', 'Investment', 'Uncategorized', 'Weather']


  const createPost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    postData.set('thumbnail', thumbnail);

      try {
       await axiosInstance.post(`/posts/create`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
       }).then((data) => {
        if(!data.data) {
          setError('Post not created, please try again');
        }else{
          console.log(`Post Created`, data.data);
          navigate('/');
        }
       })
      
      } catch (err) {
        setError(err.response?.data?.message || err.message || err || 'Something went wrong')
      } 
    
  }


    return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
      {error &&  <p className="form-error-message">
        {error.message || error || 'Something went wrong, please try again later.'}
        </p>}
        <form className="form create-post-form" onSubmit={createPost} >
        <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
        <select name="category" value={category} onChange={e => setCategory(e.target.value)} id="">
        {
          POST_CATEGORIES.map((category) => <option key={category}>{category}</option>)
        }
        </select>
        <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription}/>
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg'/>
        <button type="submit" className='btn primary'>Create</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePosts;