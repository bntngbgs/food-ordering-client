import tag from '../../assets/tag.png';
import './Tags.scss';

const Tags = ({ name }) => {
  return (
    <div className="tag">
      <img src={tag} className="tag-icon" />
      <p>{name}</p>
    </div>
  );
};

export default Tags;
