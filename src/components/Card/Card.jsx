import Tags from '../Tags/Tags';
import cartPlus from '../../assets/cart-plus.png';
import './Card.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toogleModal } from '../../app/features/cartSlice';

const Card = ({ img, title, price, category, tags }) => {
  const { role } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (role == 'guest') {
      return dispatch(toogleModal(true));
    }

    dispatch(addToCart({ img, title, price }));
  };

  return (
    <div className="card">
      <img
        src={`http://localhost:3000/images/products/${img}`}
        className="card-image"
      />
      <div className="description">
        <h2>{title}</h2>
        <p>{category}</p>
      </div>
      <div className="tag-wrapper">
        {tags.map((item, index) => (
          <Tags name={item.name} key={index} />
        ))}
      </div>
      <div className="details">
        <div className="price">
          <p>Rp. {price.toLocaleString('id-ID')}</p>
        </div>
        <button className="cart-plus-button" onClick={handleClick}>
          <img src={cartPlus} className="cart-plus-icon" />
        </button>
      </div>
    </div>
  );
};

export default Card;
