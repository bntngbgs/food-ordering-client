import axios from 'axios';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setCheckoutAddress } from '../../app/features/deliveryAddressSlice';
import { setCurrentOrderId } from '../../app/features/userSlice';
import { clearCart } from '../../app/features/cartSlice';
import './ConfirmOrder.scss';

const ConfirmOrder = () => {
  const [finalAddress, setFinalAddress] = useState({
    name: '',
    id: '',
  });
  const { address, selectedAddress } = useSelector(
    (state) => state.deliveryAddress
  );
  const { token } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const { totalPrice } = useSelector((state) => state.cart);

  const handleClickPrevious = () => {
    navigate('/checkout/address');
  };

  useEffect(() => {
    let addressData = address.filter((item) => item._id === selectedAddress);

    let [{ detail, provinsi, kabupaten, kecamatan, kelurahan, _id }] =
      addressData;

    let formattedAddress = `${provinsi}, ${kabupaten}, ${kecamatan}, ${kelurahan}, ${detail}`;

    setFinalAddress({
      name: formattedAddress,
      id: _id,
    });
  }, []);

  const handleConfirm = async () => {
    try {
      await axios.put('http://localhost:3000/api/carts', cart, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let saveToOrder = await axios.post(
        'http://localhost:3000/api/orders',
        { delivery_fee: 20000, delivery_address: finalAddress.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (saveToOrder.status === 200) {
        dispatch(setCurrentOrderId(saveToOrder.data._id));
        dispatch(setCheckoutAddress(finalAddress.name));
        dispatch(clearCart());
        navigate('/checkout/invoice');
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  return (
    <div>
      <h1>Konfirmasi Pemesanan</h1>
      <table className="confirm-order-table">
        <tbody>
          <tr>
            <td>Alamat</td>
            <td>{finalAddress.name}</td>
          </tr>
          <tr>
            <td>Sub Total</td>
            <td>Rp. {Intl.NumberFormat('id-ID').format(totalPrice)}</td>
          </tr>
          <tr>
            <td>Ongkir</td>
            <td>Rp. 20.000</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>Rp. {Intl.NumberFormat('id-ID').format(totalPrice + 20000)}</td>
          </tr>
        </tbody>
      </table>
      <div className="confirm-button-wrapper">
        <Button
          variant="filled-reversed"
          text="Sebelumnya"
          handleClick={handleClickPrevious}
        />
        <Button
          variant="green-filled"
          text="BAYAR"
          handleClick={handleConfirm}
        />
      </div>
    </div>
  );
};
export default ConfirmOrder;
