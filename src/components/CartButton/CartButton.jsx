import './CartButton.scss';
import cartIcon from '../../assets/cart.png';

const CartButton = () => {
  return (
    <div className="cart-button">
      <img src={cartIcon} />
      <div className="bubble">
        <span>0</span>
      </div>
    </div>
  );
};

export default CartButton;
