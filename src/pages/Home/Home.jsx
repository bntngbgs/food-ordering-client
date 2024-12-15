import Tags from '../../components/Tags/Tags';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import burgerTestImage from '../../assets/burger.jpg';
import pizzaTestImage from '../../assets/pizza.jpg';
import coffeeTestImage from '../../assets/ice-coffee.jpg';
import './Home.scss';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { userLogin } from '../../app/features/userSlice';
// import axios from 'axios';

const Home = () => {
  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     const user = JSON.parse(localStorage.getItem('user'));

  //     if (token) {
  //       try {
  //         const result = await axios.get('http://localhost:3000/auth/me', {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });

  //         dispatch(userLogin(result.data));
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  //   getUserData();
  // }, [dispatch, token]);

  return (
    <section className="home">
      <h1>Home</h1>
      <div className="tag-wrapper">
        <span>Tags : </span>
        <Tags />
        <Tags />
        <Tags />
        <Tags />
      </div>
      <div className="card-wrapper">
        <Card img={burgerTestImage} title="Hamburger" />
        <Card img={pizzaTestImage} title="Pizza" />
        <Card img={coffeeTestImage} title="Ice Coffee" />
        <Card img={pizzaTestImage} title="Pizza" />
        <Card img={coffeeTestImage} title="Ice Coffee" />
        <Card img={burgerTestImage} title="Hamburger" />
      </div>
      <Pagination />
    </section>
  );
};

export default Home;
