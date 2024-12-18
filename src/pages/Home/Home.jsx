import Tags from '../../components/Tags/Tags';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
// import burgerTestImage from '../../assets/burger.jpg';
// import pizzaTestImage from '../../assets/pizza.jpg';
// import coffeeTestImage from '../../assets/ice-coffee.jpg';
import './Home.scss';
import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { userLogin } from '../../app/features/userSlice';
import axios from 'axios';

const Home = () => {
  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.user);
  const [testProduct, setTestProduct] = useState([]);
  const [testTag, setTestTag] = useState([]);
  const [documentLength, setDocumentLength] = useState(0);
  const [requestQuery, setRequestQuery] = useState({
    limitPerPage: 8,
    skippedPage: 0,
  });

  useEffect(() => {
    const getProductData = async () => {
      try {
        const product = await axios.get(
          `http://localhost:3000/api/products?limit=${requestQuery.limitPerPage}&skip=${requestQuery.skippedPage}`
        );

        setTestProduct(product.data.data);
        setDocumentLength(product.data.count);
        // console.log(product);
      } catch (error) {
        console.log(error);
      }
    };

    getProductData();
  }, [requestQuery]);

  useEffect(() => {
    const getTagData = async () => {
      try {
        const tags = await axios.get('http://localhost:3000/api/tags');

        setTestTag(tags.data);

        // console.log(tags);
      } catch (error) {
        console.log(error);
      }
    };

    getTagData();
  }, []);

  const handleCountPaginate = (e) => {
    let currentPage = parseInt(e.target.innerText);

    if (e.target.id) {
      if (e.target.id === 'decrement') {
        setRequestQuery((prevState) => ({
          ...prevState,
          skippedPage: requestQuery.skippedPage - requestQuery.limitPerPage,
        }));
      }

      if (e.target.id === 'increment') {
        setRequestQuery((prevState) => ({
          ...prevState,
          skippedPage: requestQuery.skippedPage + requestQuery.limitPerPage,
        }));
      }
      return;
    }

    setRequestQuery((prevState) => ({
      ...prevState,
      skippedPage: (currentPage - 1) * requestQuery.limitPerPage,
    }));
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
        {testProduct.map((item, index) => (
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
        dataCount={documentLength}
        dataPerPage={requestQuery.limitPerPage}
        skippedPage={requestQuery.skippedPage}
        handleCountPaginate={handleCountPaginate}
      />
    </section>
  );
};

export default Home;
