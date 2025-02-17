import axios from 'axios';
import Tags from '../../components/Tags/Tags';
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';
import NotAuthModal from '../../components/NotAuthModal/NotAuthModal';
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
  setLoadingState,
} from '../../app/features/productsSlice';
import './Home.scss';
import SkeletonCard from '../../components/Skeleton/SkeletonCard';
import Skeleton from '../../components/Skeleton/Skeleton';
import { toast } from 'react-toastify';

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
    isLoading,
  } = useSelector((state) => state.product);
  const { showModal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [tagData, setTagData] = useState([]);
  const [loadingTag, setLoadingTag] = useState(false);

  // Effects for get the displayed product data
  useEffect(() => {
    dispatch(setLoadingState(true));

    let tagQuery = tags.map((tag) => `&tags[]=${tag}`).join('');

    if (tags.length > 0) {
      getTagResultLength();
    }

    const getProductData = async () => {
      try {
        const product = await axios.get(
          `https://goodfood-api.vercel.app/api/products?q=${searchQuery}&limit=${limit}&skip=${skip}&category=${category}${tagQuery}`
        );

        if (!product.data.data) {
          throw Error('API Error');
        }

        if (category == '' && tags.length == 0) {
          dispatch(setDocumentLength(product.data.count));
        }

        if (searchQuery !== '') {
          dispatch(setGlobalCount(product.data.data));
        }

        dispatch(addAllProducts(product.data.data));
        dispatch(setLoadingState(false));
      } catch (error) {
        toast.error(`${error.message}: Can't fetch product data`);
      }
    };

    getProductData();
  }, [limit, skip, dispatch, category, tags, searchQuery]);

  // Effects for get all the displayed tag data
  useEffect(() => {
    setLoadingTag(true);

    const getTagData = async () => {
      try {
        const tags = await axios.get(
          'https://goodfood-api.vercel.app/api/tags'
        );

        if (!Array.isArray(tags.data)) {
          throw Error('API Error');
        }

        setTagData(tags.data);
        setLoadingTag(false);
      } catch (error) {
        toast.error(`${error.message}: Can't fetch tag data`);
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
  };

  const getTagResultLength = async () => {
    let query = tags.map((tag) => `&tags[]=${tag}`).join('');

    try {
      const resultLength = await axios.get(
        `https://goodfood-api.vercel.app/api/products?tags[]=${query}&limit=${0}`
      );

      dispatch(setGlobalCount(resultLength.data.data));
    } catch (error) {
      toast.error(`${error.message}: Can't set tag data length`);
    }
  };

  return (
    <section className="home">
      {showModal && <NotAuthModal />}

      <div className="search-wrapper">
        <SearchBar />
      </div>

      <div className="tag-wrapper" onClick={handleClickTags}>
        <span>Tags : </span>
        {loadingTag
          ? Array(16)
              .fill(1)
              .map((_, index) => <Skeleton type="tags" key={index} />)
          : tagData.map((item, index) => <Tags name={item.name} key={index} />)}
      </div>

      {isLoading && (
        <div className="home-skeleton">
          {Array.from(Array(8)).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {products.length < 1 && !isLoading && (
        <h1 className="empty-search">
          Maaf, produk yang anda cari tidak dapat ditemukan.
        </h1>
      )}

      {products.length > 0 && !isLoading && (
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
