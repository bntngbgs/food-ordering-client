import './CartButton.scss';
import cartIcon from '../../assets/cart.png';
import { useSelector } from 'react-redux';

const CartButton = () => {
  const { badgeCount } = useSelector((state) => state.cart);

  return (
    <div className="cart-button">
      <img src={cartIcon} />
      <div className="bubble">
        <span>{badgeCount}</span>
      </div>
    </div>
  );
};

export default CartButton;
