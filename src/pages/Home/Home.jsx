import Tags from '../../components/Tags/Tags';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
// import burgerTestImage from '../../assets/burger.jpg';
// import pizzaTestImage from '../../assets/pizza.jpg';
// import coffeeTestImage from '../../assets/ice-coffee.jpg';
import './Home.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAllProducts,
  setDocumentLength,
  incrementSkip,
  decrementSkip,
  selectPage,
} from '../../app/features/productsSlice';
// import { userLogin } from '../../app/features/userSlice';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { count, products, limit, skip, filteredCount, category } = useSelector(
    (state) => state.product
  );
  // const [testProduct, setTestProduct] = useState([]);
  const [testTag, setTestTag] = useState([]);
  // const [documentLength, setDocumentLength] = useState(0);
  // const [requestQuery, setRequestQuery] = useState({
  //   limitPerPage: 8,
  //   skippedPage: 0,
  // });

  // console.log(limit);

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
        // dispatch(setFilteredCount(0));

        // setTestProduct(product.data.data);
        // setDocumentLength(product.data.count);
        // console.log(product);
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
    // `http://localhost:3000/api/products?limit=${requestQuery.limitPerPage}&skip=${requestQuery.skippedPage}`
    let currentPage = parseInt(e.target.innerText);

    if (e.target.id) {
      if (e.target.id === 'decrement' && skip > 0) {
        // setRequestQuery((prevState) => ({
        //   ...prevState,
        //   skippedPage: requestQuery.skippedPage - requestQuery.limitPerPage,
        // }));
        dispatch(decrementSkip());
      }

      if (
        e.target.id === 'increment' &&
        skip + products.length < count &&
        filteredCount == 0
      ) {
        // setRequestQuery((prevState) => ({
        //   ...prevState,
        //   skippedPage: requestQuery.skippedPage + requestQuery.limitPerPage,
        // }));
        dispatch(incrementSkip());
      }
      return;
    }

    // setRequestQuery((prevState) => ({
    //   ...prevState,
    //   skippedPage: (currentPage - 1) * requestQuery.limitPerPage,
    // }));

    dispatch(selectPage(currentPage - 1));
  };

  return (
    <section className="home">
      <h1>Home</h1>
      <div className="tag-wrapper">
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
        {/* <Card img={burgerTestImage} title="Hamburger" />
        <Card img={pizzaTestImage} title="Pizza" />
        <Card img={coffeeTestImage} title="Ice Coffee" />
        <Card img={pizzaTestImage} title="Pizza" />
        <Card img={coffeeTestImage} title="Ice Coffee" />
        <Card img={burgerTestImage} title="Hamburger" /> */}
      </div>
      <Pagination
        dataCount={count}
        dataPerPage={limit}
        skippedPage={skip}
        handleCountPaginate={handleCountPaginate}
      />
    </section>
  );
};

export default Home;
