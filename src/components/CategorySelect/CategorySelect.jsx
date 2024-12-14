import './CategorySelect.scss';
import arrowDown from '../../assets/arrow-down.png';

const CategorySelect = () => {
  return (
    <div className="custom-dropdown">
      <select name="category" id="category" className="custom-select">
        <option>Kategori</option>
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
