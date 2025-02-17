import CategorySelect from '../CategorySelect/CategorySelect';
import SearchBar from '../SearchBar/SearchBar';
import CartButton from '../CartButton/CartButton';
import Button from '../Button/Button';
import logo from '../../assets/logo.png';
import MobileNavigation from '../../components/MobileNavigation/MobileNavigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { FaHamburger } from 'react-icons/fa';
import { RiCloseLargeLine } from 'react-icons/ri';
import './Navbar.scss';

const Navbar = () => {
  const { full_name } = useSelector((state) => state.user);
  const [mobileNav, setMobileNav] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  let navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    if (width > 768) {
      setMobileNav(false);
    }

    if (width < 551) {
      setShowCategory(true);
    } else {
      setShowCategory(false);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  const handleClick = () => {
    if (!mobileNav) {
      setMobileNav(true);
      setTimeout(() => {
        document.querySelector('.mobile-nav-wrapper').classList.add('slide-in');
      }, 100);
    } else {
      document
        .querySelector('.mobile-nav-wrapper')
        .classList.remove('slide-in');
      setTimeout(() => {
        setMobileNav(false);
      }, 300);
    }
  };

  const handleNavMenu = () => {
    document.querySelector('.mobile-nav-wrapper').classList.remove('slide-in');
    setTimeout(() => {
      setMobileNav(false);
    }, 300);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div
          onClick={() => {
            navigate('/');
            window.location.reload();
          }}
        >
          <img src={logo} alt="logo" className="logo" />
        </div>
        <CategorySelect />
        <SearchBar />
        <Link to="/cart" className="cart-link">
          <CartButton />
        </Link>

        {!full_name ? (
          <div className="auth-wrapper">
            <Link to="/register">
              <Button variant="outline" text="Register" />
            </Link>
            <Link to="/login">
              <Button variant="filled" text="Login" />
            </Link>
          </div>
        ) : (
          <Link to="/user/profile">
            <div className="account-wrapper">
              <FaUserCircle color="white" size={26} />
              <p>{full_name}</p>
            </div>
          </Link>
        )}

        <div className="hamburger-menu" onClick={handleClick}>
          {mobileNav ? (
            <RiCloseLargeLine color="#fff" className="close-icon-mobile" />
          ) : (
            <FaHamburger color="#fff" className="hamburger-icon-mobile" />
          )}
        </div>
      </nav>

      {mobileNav && (
        <div className="mobile-nav-wrapper">
          <MobileNavigation
            showCategory={showCategory}
            handleNavMenu={handleNavMenu}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
