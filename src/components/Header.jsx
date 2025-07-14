import React, { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import Logo from '../assets2/logo-green.png'
import { HiBars3 } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from '../context/UserContext.jsx';

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false)
  // const [open, setOpen] = useState(false)
  const {currentUser} = useContext(UserContext)

  const closeNavHandler = () => {
    if(window.innerWidth < 800){
      setIsNavShowing(false)
    } else{
      setIsNavShowing(true)
    }
  }

  const userName = localStorage.getItem('name') || 'User';

  // const handleMenuClick = () => {
  //   setOpen(prev => !prev)
  // }

  window.addEventListener('resize', () => {
    if(window.innerWidth > 800) {
      closeNavHandler();
    }else if(window.innerWidth < 800) {
      setIsNavShowing(false)
    }
  })


  return (
   <nav>
    <div className="container nav-container">
      <Link to='/' className='nav-logo' onClick={closeNavHandler}>
      <img src={Logo} alt="NavBar Logo" />
      </Link>

      <div className="nav-menu-container">
      { currentUser?.id &&
        isNavShowing && <ul className='nav-menu'>
        <li><Link to={`/profile/${userName}`} onClick={closeNavHandler}>{userName}</Link></li>
        <li><Link to='/create' onClick={closeNavHandler}>Create Post</Link></li>
        <li><Link to='/authors' onClick={closeNavHandler}>Authors</Link></li>
        <li><Link to='/logout' onClick={closeNavHandler}>Log Out</Link></li>
      </ul>
      }
      { !currentUser?.id &&
        isNavShowing && <ul className='nav-menu'>
        <li><Link to='/authors' onClick={closeNavHandler}>Authors</Link></li>
        <li><Link to='/login' onClick={closeNavHandler}>Login</Link></li>
      </ul>
      }
      <button className='nav-toggle-btn' onClick={() => setIsNavShowing(!isNavShowing)}>
    {
      isNavShowing ? <AiOutlineClose/> : <HiBars3/>
    }
      </button>
      </div>
    </div>
   </nav>
  )
}

export default Header
