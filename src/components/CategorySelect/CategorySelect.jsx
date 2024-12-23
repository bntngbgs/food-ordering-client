import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  clearTags,
  // addAllProducts,
  // setFilteredCount,
  setGlobalCount,
} from '../../app/features/productsSlice';
import arrowDown from '../../assets/arrow-down.png';
import './CategorySelect.scss';

const CategorySelect = () => {
  const { category } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleSelect = async (e) => {
    const selectedOption = e.target.value;
    try {
      const productLength = await axios.get(
        `http://localhost:3000/api/products?category=${selectedOption}`
      );

      // const product = await axios.get(
      //   `http://localhost:3000/api/products?category=${selectedOption}&limit=${limit}`
      // );

      // dispatch(addAllProducts(product.data.data));
      // dispatch(setFilteredCount(product.data.data));
      dispatch(setGlobalCount(productLength.data.data));
      dispatch(addCategory(selectedOption));
      dispatch(clearTags());
      document
        .querySelectorAll('.active')
        .forEach((item) => item.classList.remove('active'));
      // dispatch(setDocumentLength(product.data.data));

      // setTestProduct(product.data.data);
      // setDocumentLength(product.data.count);
      // console.log(product);
    } catch (error) {
      console.log(error);
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
