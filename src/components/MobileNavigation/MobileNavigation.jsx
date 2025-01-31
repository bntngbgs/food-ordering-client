import { Link } from 'react-router';
import CartButton from '../CartButton/CartButton';
import './MobileNavigation.scss';
import Button from '../Button/Button';

const MobileNavigation = () => {
  return (
    <div className="mobile-nav">
      <div className="mobile-cart-wrapper">
        <h2>Your Cart : </h2>
        <CartButton />
      </div>
      <div className="mobile-auth-wrapper">
        <Link to="/register">
          <Button variant="outline" text="Register" />
        </Link>
        <Link to="/login">
          <Button variant="filled" text="Login" />
        </Link>
      </div>
    </div>
  );
};
export default MobileNavigation;
