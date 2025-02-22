import Tags from '../Tags/Tags';
import cartPlus from '../../assets/cart-plus.png';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  addToCart,
  toogleModal,
  countTotal,
} from '../../app/features/cartSlice';
import './Card.scss';

const Card = ({ product_id, img, title, price, category, tags }) => {
  const { role, id } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (role == 'guest') {
      return dispatch(toogleModal(true));
    }

    dispatch(
      addToCart({
        product: { _id: product_id },
        user: { _id: id },
        img,
        title,
        price,
        qty: 1,
      })
    );
    dispatch(countTotal());

    toast.success('Berhasil menambahkan item!', { autoClose: 1000 });
  };

  return (
    <div className="card">
      <img
        src={`https://goodfood-api.vercel.app/images/products/${img}`}
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
