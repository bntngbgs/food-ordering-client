import Tags from '../Tags/Tags';
import cartPlus from '../../assets/cart-plus.png';
import './Card.scss';

const Card = ({ img, title }) => {
  return (
    <div className="card">
      <img src={img} className="card-image" />
      <div className="description">
        <h2>{title}</h2>
        <p>Utama</p>
      </div>
      <div className="details">
        <div className="price">
          <Tags />
          <p>Rp. 20.000</p>
        </div>
        <button className="cart-plus-button">
          <img src={cartPlus} className="cart-plus-icon" />
        </button>
      </div>
    </div>
  );
};

export default Card;
