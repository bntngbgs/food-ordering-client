// import { useSelector } from 'react-redux';
import tag from '../../assets/tag.png';
import './Tags.scss';
// import { addTags } from '../../app/features/productsSlice';

const Tags = ({ name }) => {
  // const { tags } = useSelector((state) => state.product);
  // let dispatch = useDispatch();

  // const handleClick = (e) => {
  //   e.target.parentElement.classList.add('active');
  //   dispatch(addTags(name));
  // };

  return (
    <div className="tag">
      <img src={tag} className="tag-icon" />
      <p>{name}</p>
    </div>
  );
};

export default Tags;
