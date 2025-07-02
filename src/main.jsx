import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Register from './pages/Register'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
import Authors from './pages/Authors'
import CreatePosts from './pages/CreatePosts'
import EditPost from './pages/EditPost'
import AuthorPosts from './pages/AuthorPosts'
import Dashboard from './pages/Dashboard'
import Logout from './pages/Logout'
import DeletePost from './pages/DeletePost'
import UserProvider from './context/UserContext.jsx'
import CatPosts from './pages/CatPosts.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Home />},
      {path: 'posts/:id', element: <PostDetail/>},
      {path: 'register', element: <Register />},
      {path: 'login', element: <Login />},
      {path: 'profile/:id', element: <UserProfile />},
      {path: 'authors', element: <Authors />},
      {path: 'create', element: <CreatePosts />},
      {path: 'posts/edit/:id', element: <EditPost />},
      {path: 'posts/:id/delete', element: <DeletePost />},
      {path: 'posts/categories/:category', element: <CatPosts />},
      {path: 'posts/users/:id', element: <AuthorPosts />},
      {path: 'myposts/:id', element: <Dashboard />},
      {path: 'logout', element: <Logout />},
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
