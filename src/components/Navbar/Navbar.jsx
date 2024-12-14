import CategorySelect from '../CategorySelect/CategorySelect';
import SearchBar from '../SearchBar/SearchBar';
import CartButton from '../CartButton/CartButton';
import Button from '../Button/Button';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.scss';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { full_name } = useSelector((state) => state.user);

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <CategorySelect />
        <SearchBar />
        <Link to="/cart">
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
          <Link to="/profile">
            <div className="account-wrapper">
              <FaUserCircle color="white" size={26} />
              <p>{full_name}</p>
            </div>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;