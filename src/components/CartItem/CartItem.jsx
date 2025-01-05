import { useDispatch } from 'react-redux';
import { decrementQty, incrementQty } from '../../app/features/cartSlice';
import './CartItem.scss';

const CartItem = ({ img, title, price, qty }) => {
  let dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementQty(title));
  };

  const handleDecrement = () => {
    dispatch(decrementQty(title));
  };

  return (
    <tr>
      <td>
        <img
          src={`http://localhost:3000/images/products/${img}`}
          alt="burger"
          className="table-image"
        />
      </td>
      <td>
        <p>{title}</p>
      </td>
      <td>
        <p>{price}</p>
      </td>
      <td align="center">
        <span onClick={handleDecrement}>-</span>
        <span>{qty}</span>
        <span onClick={handleIncrement}>+</span>
      </td>
    </tr>
  );
};
export default CartItem;
