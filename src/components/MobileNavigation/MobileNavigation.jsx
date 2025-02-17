import CartButton from '../CartButton/CartButton';
import Button from '../Button/Button';
import CategorySelect from '../CategorySelect/CategorySelect';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import './MobileNavigation.scss';

const MobileNavigation = ({ showCategory, handleNavMenu }) => {
  const { role, full_name } = useSelector((state) => state.user);

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
        {role === 'user' ? (
          <Link to="/user/profile" onClick={handleNavMenu}>
            <div className="account-wrapper">
              <FaUserCircle color="white" size={26} />
              <p>{full_name}</p>
            </div>
          </Link>
        ) : (
          <>
            <Link to="/register" onClick={handleNavMenu}>
              <Button variant="outline" text="Register" />
            </Link>
            <Link to="/login" onClick={handleNavMenu}>
              <Button variant="filled" text="Login" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default MobileNavigation;
