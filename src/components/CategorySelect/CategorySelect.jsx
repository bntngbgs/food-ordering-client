import axios from 'axios';
import arrowDown from '../../assets/arrow-down.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  clearTags,
  setGlobalCount,
} from '../../app/features/productsSlice';
import './CategorySelect.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const CategorySelect = ({ handleNavMenu }) => {
  const { category } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSelect = async (e) => {
    const selectedOption = e.target.value;
    try {
      const productLength = await axios.get(
        `https://goodfood-api.vercel.app/api/products?category=${selectedOption}`
      );

      if (!Array.isArray(productLength.data.data)) {
        throw Error('API Error');
      }

      dispatch(setGlobalCount(productLength.data.data));
      dispatch(addCategory(selectedOption));
      dispatch(clearTags());
      document
        .querySelectorAll('.active')
        .forEach((item) => item.classList.remove('active'));
      if (handleNavMenu) handleNavMenu();
      navigate('/');
    } catch (error) {
      toast.error(`${error.message}: Can't fetch product length`);
    }
  };

  return (
    <div className="custom-dropdown">
      <select
        name="category"
        id="category"
        className="custom-select"
        onChange={handleSelect}
      >
        <option value="" selected={category === ''}>
          Kategori
        </option>
        <option value="utama" selected={category === 'utama'}>
          Utama
        </option>
        <option value="minuman" selected={category === 'minuman'}>
          Minuman
        </option>
        <option value="snack" selected={category === 'snack'}>
          Snack
        </option>
        <option value="pastry" selected={category === 'pastry'}>
          Pastry
        </option>
      </select>
      <div className="arrow-wrapper">
        <img src={arrowDown} />
      </div>
    </div>
  );
};

export default CategorySelect;
