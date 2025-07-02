import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axiosInstance from '../components/axiosConfig';


const EditPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const navigate = useNavigate();
  const {id} = useParams()
  const [error, setError] = useState(null)
  

  const {currentUser} = useContext(UserContext);
  let token = currentUser?.token;



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


  const getPostDetails = async () => {
    try {
      await axiosInstance.get(`/posts/${id}`)
      .then((data) => {
        if(!data.data) {
          return setError('Post not found')
        } else{
          setTitle(data.data.title);
          setCategory(data.data.category);
          setDescription(data.data.description);
        }
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || err || 'Something went wrong while fetching post details')
      console.log(err);
    }
  }

  useEffect(() => {
    getPostDetails();
  }, [id]);


  const handleEditedPost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    postData.set('thumbnail', thumbnail);

   
      try {
       await axiosInstance.put(`/posts/edit/${id}`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
       }).then((data) => {
        if(!data.data) {
          setError('Post not found')
        }else{
          console.log(`Post Updated`, data.data);
          navigate('/');
        }
       })
      
      } catch (err) {
        setError(err.response?.data?.message || err.message || err || 'Something went wrong')
        console.log(err);
    
    }
  }

  useEffect(() => {
    if (!token){
      navigate('/login')
    }

  }, []);

 

    return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
      { error &&
        <p className="form-error-message">
          {error.message || error}
      </p>}
        <form className="form create-post-form" onSubmit={handleEditedPost}>
        <input type="text" placeholder='Title' name='title' value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
        <select name="category" value={category} onChange={e => setCategory(e.target.value)} id="">
        {
          POST_CATEGORIES.map((category) => <option key={category}>{category}</option>)
        }
        </select>
        <ReactQuill modules={modules} formats={formats} name='description' value={description} onChange={setDescription}/>
        <input type="file" name='thumbnail' onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg'/>
        <button type="submit" className='btn primary'>Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost;