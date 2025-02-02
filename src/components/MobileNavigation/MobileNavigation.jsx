import { Link } from 'react-router';
import CartButton from '../CartButton/CartButton';
import Button from '../Button/Button';
import './MobileNavigation.scss';
import CategorySelect from '../CategorySelect/CategorySelect';

const MobileNavigation = ({ showCategory, handleNavMenu }) => {
  return (
    <div className="mobile-nav">
      {showCategory && (
        <>
          <div className="mobile-category-wrapper">
            <h2>Filter by : </h2>
            <CategorySelect handleNavMenu={handleNavMenu} />
          </div>
          <hr />
        </>
      )}

      <div className="mobile-cart-wrapper">
        <h2>Your Cart : </h2>
        <Link to="/cart" onClick={handleNavMenu}>
          <CartButton />
        </Link>
      </div>
      <hr />

      <div className="mobile-auth-wrapper">
        <Link to="/register" onClick={handleNavMenu}>
          <Button variant="outline" text="Register" />
        </Link>
        <Link to="/login" onClick={handleNavMenu}>
          <Button variant="filled" text="Login" />
        </Link>
      </div>
    </div>
  );
};
export default MobileNavigation;
