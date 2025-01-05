import { useSelector } from 'react-redux';
import CardItem from '../../components/CartItem/CartItem';
// import burgerImage from '../../assets/burger.jpg';
import Button from '../../components/Button/Button';

import './Cart.scss';

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <section className="cart-page">
      <h1>Home {'>'} Cart</h1>
      <h2>Sub Total : Rp. 64.000</h2>
      <table>
        <thead>
          <tr>
            <th>Gambar</th>
            <th>Barang</th>
            <th>Harga</th>
            <th align="center">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.map((item, index) => <CardItem key={index} {...item} />)}
          {/* <tr>
            <td>
              <img src={burgerImage} alt="burger" className="table-image" />
            </td>
            <td>
              <p>Triple Burger</p>
            </td>
            <td>
              <p>Rp. 30.000</p>
            </td>
            <td align="center">
              <span>-</span>
              <span>1</span>
              <span>+</span>
            </td>
          </tr>
          <tr>
            <td>
              <img src={burgerImage} alt="burger" className="table-image" />
            </td>
            <td>
              <p>Triple Burger</p>
            </td>
            <td>
              <p>Rp. 30.000</p>
            </td>
            <td align="center">
              <span>-</span>
              <span>1</span>
              <span>+</span>
            </td>
          </tr> */}
        </tbody>
      </table>
      <Button variant="outline-reversed" text="Checkout" />
    </section>
  );
};

export default Cart;
