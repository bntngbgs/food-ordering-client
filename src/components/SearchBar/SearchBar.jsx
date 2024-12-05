import './SearchBar.scss';
import searchIcon from '../../assets/search.png';

const SearchBar = () => {
  return (
    <div className="searchbar-wrapper">
      <input type="text" placeholder="Cari makanan atau minuman..." />
      <div className="icon-wrapper">
        <img src={searchIcon} />
      </div>
    </div>
  );
};

export default SearchBar;
