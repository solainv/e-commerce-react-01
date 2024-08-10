// import React, { useRef, useEffect } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion'
// import './Header.css';
// import { Container, Row } from 'reactstrap';
// import { useSelector } from 'react-redux';
// import useAuth from '../../custom-hooks/useAuth'
// import logo from '../../assets/images/eco-logo.png';
// import userIcon from '../../assets/images/user-icon.png';

// const nav__links = [
//   {
//     path: 'home',
//     display: 'Home'
//   },
//   {
//     path: 'shop',
//     display: 'Shop'
//   },
//   {
//     path: 'cart',
//     display: 'Cart'
//   }
// ];

// const Header = () => {
//   const headerRef = useRef(null);
//   const menuRef = useRef(null);
//   const navigate = useNavigate();
//   const { currentUser } = useAuth()
//   const totalQuantity = useSelector(state => state.cart.totalQuantity)
//   const profileActionsRef = useRef(null)
//   const stickyHeaderFunc = () => {
//     if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//       headerRef.current.classList.add('sticky__header');
//     } else {
//       headerRef.current.classList.remove('sticky__header');
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', stickyHeaderFunc);
//     return () => window.removeEventListener('scroll', stickyHeaderFunc);
//   }, [])

//   const menuToggle = () => menuRef.current.classList.toggle('active__menu');
//   const navigateToCart = () => {
//     navigate('/cart')

//   }
//   const toggleProfileActions = () => {
//     if (profileActionsRef.current) {
//       profileActionsRef.current.classList.toggle('show__profileActions');
//     }
//   };


//   return (
//     <>
//       <header className="header" ref={headerRef}>
//         <Container>
//           <Row>
//             <div className="nav__wraper">
//               <div className="logo">
//                 <Link to='/home'><img src={logo} alt="logo" /></Link>
//                 <div>
//                   <h1><Link to='/home'>Multimart</Link></h1>
//                 </div>
//               </div>
//               <div className="navigation" ref={menuRef} onClick={menuToggle}>
//                 <ul className="menu">
//                   {nav__links.map((item, index) => (
//                     <li className="nav__item" key={index}>
//                       <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
//                     </li>
//                   ))
//                   }

//                 </ul>
//               </div>
//               <div className="nav__icons">
//                 <span className='fav__icon'>
//                   <i className="ri-heart-line"></i>
//                   <span className="badge">1</span>
//                 </span>
//                 <span className="cart__icon" onClick={navigateToCart}>
//                   <i className="ri-shopping-cart-line"></i>
//                   <span className="badge">{totalQuantity}</span>
//                 </span>

//                 <div className='profile' ref={profileActionsRef} onClick={toggleProfileActions}>
//                   <motion.img whileTap={{ scale: 1.2 }}
//                     src={currentUser ? currentUser.photoURL : userIcon}
//                     alt="icon"
//                   />
//                   <div className="profile__actions" >
//                     {
//                       currentUser ? <span>Logout</span> : <div>

//                         <Link to='/signup'>Signup</Link>
//                         <Link to='/login'>Login</Link>
//                       </div>
//                     }
//                   </div>
//                 </div>

//                 <div className="mobile__menu">
//                   <span onClick={menuToggle} className="menu__icon"><i className="ri-menu-line"></i></span>
//                 </div>
//               </div>

//             </div>
//           </Row>
//         </Container>
//       </header>
//     </>);
// };

// export default Header;


import React, { useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';
import { Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';

const nav__links = [
  { path: 'home', display: 'Home' },
  { path: 'shop', display: 'Shop' },
  { path: 'cart', display: 'Cart' }
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const profileActionsRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const logout = () => {
    signOut(auth).then(() => {
      toast.success('Logged out');
      navigate('/home');
    }).catch(err => {
      toast.error(err.message);
    });
  };

  const stickyHeaderFunc = () => {
    if (window.scrollY > 80) {
      headerRef.current.classList.add('sticky__header');
    } else {
      headerRef.current.classList.remove('sticky__header');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', stickyHeaderFunc);
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle('active__menu');

  const navigateToCart = () => {
    navigate('/cart');
  };
  const navigateToWischlist = () => {
    navigate('/wishlist');
  };

  const toggleProfileActions = (e) => {
    e.stopPropagation(); // Verhindert, dass der Klick das Event nach oben weitergibt
    if (profileActionsRef.current) {
      profileActionsRef.current.classList.toggle('show__profileActions');
    }
  };

  const handleClickOutside = (e) => {
    if (profileActionsRef.current && !profileActionsRef.current.contains(e.target)) {
      profileActionsRef.current.classList.remove('show__profileActions');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wraper">
            <motion.div

              whileTap={{ scale: 0.95 }}

              className="logo">
              <Link to='/home'><img src={logo} alt="logo" /></Link>
              <div>
                <h1><Link to='/home'>Mystore</Link></h1>
              </div>
            </motion.div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <motion.li className="nav__item" key={index}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <NavLink to={item.path} className={({ isActive }) => (isActive ? 'nav__active' : '')}>
                      {item.display}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <motion.span className='fav__icon'
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }} onClick={navigateToWischlist}
              >
                <i className="ri-heart-line"></i>
                <span className="badge">1</span>
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-cart-line"></i>
                <span className="badge">{totalQuantity}</span>
              </motion.span>

              <div className="profile" onClick={toggleProfileActions}>
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt="icon"
                />
                <div className="profile__actions" ref={profileActionsRef}>
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                      <span><Link to='/signup'>Sign up</Link></span>
                      <span><Link to='/login'>Log in</Link></span>
                      <span><Link to='/dashboard'>Dashboard</Link></span>
                    </div>
                  )}
                </div>
              </div>


              <div className="mobile__menu">
                <span onClick={menuToggle} className="menu__icon"><i className="ri-menu-line"></i></span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
