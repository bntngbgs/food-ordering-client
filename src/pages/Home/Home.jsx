import Tags from '../../components/Tags/Tags';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAllProducts,
  setDocumentLength,
  incrementSkip,
  decrementSkip,
  selectPage,
  addTags,
} from '../../app/features/productsSlice';
import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { count, products, limit, skip, filteredCount, category } = useSelector(
    (state) => state.product
  );
  const [testTag, setTestTag] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const product = await axios.get(
          `http://localhost:3000/api/products?limit=${limit}&skip=${skip}&category=${category}`
        );

        if (category == '') {
          dispatch(setDocumentLength(product.data.count));
        }

        dispatch(addAllProducts(product.data.data));
      } catch (error) {
        console.log(error);
      }
    };

    getProductData();
  }, [limit, skip, dispatch, category]);

  useEffect(() => {
    const getTagData = async () => {
      try {
        const tags = await axios.get('http://localhost:3000/api/tags');

        setTestTag(tags.data);
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

  const handleClick = (e) => {
    console.log(e.target);

    if (e.target.classList.contains('tag-wrapper')) return;
    e.target.classList.add('active');
    dispatch(addTags(e.target.innerText));
  };

  return (
    <section className="home">
      <h1>Home</h1>
      <div className="tag-wrapper" onClick={handleClick}>
        <span>Tags : </span>
        {testTag.map((item, index) => (
          <Tags name={item.name} key={index} />
        ))}
      </div>
      <div className="card-wrapper">
        {products.map((item, index) => (
          <Card
            key={index}
            img={item.image_url}
            title={item.name}
            price={item.price}
            category={item.category.name}
            tags={item.tags}
          />
        ))}
      </div>
      <Pagination handleCountPaginate={handleCountPaginate} />
    </section>
  );
};

export default Home;
