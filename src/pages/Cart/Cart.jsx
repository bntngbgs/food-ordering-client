import CardItem from '../../components/CartItem/CartItem';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Button from '../../components/Button/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './Cart.scss';

const Cart = () => {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  let navigate = useNavigate();

  const handleUpdateCart = async () => {
    navigate('/checkout/address');
  };

  return (
    <section className="cart-page">
      <Breadcrumbs />
      <h2>Sub Total : Rp. {Intl.NumberFormat('id-ID').format(totalPrice)}</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Belum ada produk.</p>
      ) : (
        <div className="cart-table">
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
            </tbody>
          </table>
          <Button
            variant="outline-reversed"
            text="Checkout"
            handleClick={handleUpdateCart}
          />
        </div>
      )}
    </section>
  );
};

export default Cart;
