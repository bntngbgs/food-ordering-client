import searchIcon from '../../assets/search.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSearch, clearSearch } from '../../app/features/productsSlice';
import './SearchBar.scss';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(addSearch(search));
  };

  return (
    <form className="searchbar-wrapper" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Cari makanan atau minuman..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (e.target.value == '') {
            dispatch(clearSearch());
          }
        }}
      />
      <button className="icon-wrapper">
        <img src={searchIcon} />
      </button>
    </form>
  );
};

export default SearchBar;
