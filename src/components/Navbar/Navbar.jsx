import CategorySelect from '../CategorySelect/CategorySelect';
import SearchBar from '../SearchBar/SearchBar';
import CartButton from '../CartButton/CartButton';
import Button from '../Button/Button';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';
import './Navbar.scss';

const Navbar = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <CategorySelect />
        <SearchBar />
        <CartButton />
        <Link to="/register">
          <Button variant="outline" text="Register" />
        </Link>
        <Link to="/login">
          <Button variant="filled" text="Login" />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
