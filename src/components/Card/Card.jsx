import Tags from '../Tags/Tags';
import cartPlus from '../../assets/cart-plus.png';
import './Card.scss';

const Card = ({ img, title, price, category, tags }) => {
  // console.log(img);
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
        <button className="cart-plus-button">
          <img src={cartPlus} className="cart-plus-icon" />
        </button>
      </div>
    </div>
  );
};

export default Card;
