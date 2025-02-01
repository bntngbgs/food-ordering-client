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

const CategorySelect = ({ handleNavMenu }) => {
  const { category } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleSelect = async (e) => {
    const selectedOption = e.target.value;
    try {
      const productLength = await axios.get(
        `http://localhost:3000/api/products?category=${selectedOption}`
      );

      console.log(productLength);

      if (!Array.isArray(productLength.data.data)) {
        throw Error('API Error');
      }

      dispatch(setGlobalCount(productLength.data.data));
      dispatch(addCategory(selectedOption));
      dispatch(clearTags());
      document
        .querySelectorAll('.active')
        .forEach((item) => item.classList.remove('active'));
      handleNavMenu();
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
        <option value="utama">Utama</option>
        <option value="minuman">Minuman</option>
        <option value="snack">Snack</option>
        <option value="pastry">Pastry</option>
      </select>
      <div className="arrow-wrapper">
        <img src={arrowDown} />
      </div>
    </div>
  );
};

export default CategorySelect;
