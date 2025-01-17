import axios from 'axios';
import Tags from '../../components/Tags/Tags';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import NotAuthModal from '../../components/notAuthModal/NotAuthModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAllProducts,
  setDocumentLength,
  incrementSkip,
  decrementSkip,
  selectPage,
  addTags,
  removeTags,
  setGlobalCount,
  clearCategory,
  resetSkip,
} from '../../app/features/productsSlice';
import './Home.scss';

const Home = () => {
  const {
    count,
    products,
    limit,
    skip,
    filteredCount,
    category,
    tags,
    searchQuery,
  } = useSelector((state) => state.product);
  const { showModal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [tagData, setTagData] = useState([]);

  // Effects for get the displayed product data
  useEffect(() => {
    let tagQuery = tags.map((tag) => `&tags[]=${tag}`).join('');

    if (tags.length > 0) {
      getTagResultLength();
    }

    const getProductData = async () => {
      try {
        const product = await axios.get(
          `http://localhost:3000/api/products?q=${searchQuery}&limit=${limit}&skip=${skip}&category=${category}${tagQuery}`
        );

        if (category == '' && tags.length == 0) {
          dispatch(setDocumentLength(product.data.count));
        }

        if (searchQuery !== '') {
          dispatch(setGlobalCount(product.data.data));
        }

        dispatch(addAllProducts(product.data.data));
      } catch (error) {
        console.log(error);
      }
    };

    getProductData();
  }, [limit, skip, dispatch, category, tags, searchQuery]);

  // Effects for get all the displayed tag data
  useEffect(() => {
    const getTagData = async () => {
      try {
        const tags = await axios.get('http://localhost:3000/api/tags');

        setTagData(tags.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTagData();
  }, []);

  const handleCountPaginate = (e) => {
    let currentPage = parseInt(e.target.innerText);

    if (e.target.id) {
      if (e.target.id === 'decrement' && skip > 0) {
        dispatch(decrementSkip());
      }

      if (
        e.target.id === 'increment' &&
        skip + products.length < count &&
        filteredCount == 0
      ) {
        dispatch(incrementSkip());
      }

      return;
    }

    dispatch(selectPage(currentPage - 1));
  };

  const handleClickTags = async (e) => {
    if (e.target.classList.contains('tag-wrapper')) return;

    dispatch(resetSkip());
    dispatch(clearCategory());

    if (e.target.classList.contains('active')) {
      dispatch(removeTags(e.target.innerText));
      return e.target.classList.remove('active');
    }

    dispatch(addTags(e.target.innerText));

    e.target.classList.add('active');

    let query = tags.map((tag) => `&tags[]=${tag}`).join('');

    const resultLength = await axios.get(
      `http://localhost:3000/api/products?${query}`
    );

    dispatch(setGlobalCount(resultLength.data.data));
  };

  const getTagResultLength = async () => {
    let query = tags.map((tag) => `&tags[]=${tag}`).join('');
    const resultLength = await axios.get(
      `http://localhost:3000/api/products?tags[]=${query}&limit=${0}`
    );

    dispatch(setGlobalCount(resultLength.data.data));
  };

  return (
    <section className="home">
      {showModal && <NotAuthModal />}
      <h1>Home</h1>
      <div className="tag-wrapper" onClick={handleClickTags}>
        <span>Tags : </span>
        {tagData.map((item, index) => (
          <Tags name={item.name} key={index} />
        ))}
      </div>

      {products.length < 1 ? (
        <h1 className="empty-search">
          Maaf, produk yang anda cari tidak dapat ditemukan.
        </h1>
      ) : (
        <div className="card-wrapper">
          {products.map((item, index) => (
            <Card
              key={index}
              product_id={item._id}
              img={item.image_url}
              title={item.name}
              price={item.price}
              category={item.category.name}
              tags={item.tags}
            />
          ))}
        </div>
      )}

      {products.length > 0 && (
        <Pagination handleCountPaginate={handleCountPaginate} />
      )}
    </section>
  );
};

export default Home;
