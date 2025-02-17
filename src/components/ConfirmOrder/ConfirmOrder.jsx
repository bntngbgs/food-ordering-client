import axios from 'axios';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  setAddressInCheckout,
  setCheckoutAddress,
} from '../../app/features/deliveryAddressSlice';
import { setCurrentOrderId } from '../../app/features/userSlice';
import { toast } from 'react-toastify';
import './ConfirmOrder.scss';

const ConfirmOrder = () => {
  const { address, selectedAddress } = useSelector(
    (state) => state.deliveryAddress
  );
  const { token } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { totalPrice } = useSelector((state) => state.cart);
  const [finalAddress, setFinalAddress] = useState({
    name: '',
    id: '',
  });
  let navigate = useNavigate();
  let dispatch = useDispatch();

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
      let saveToCart = await axios.put(
        'https://goodfood-api.vercel.app/api/carts',
        cart,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (typeof saveToCart.data === 'string') {
        throw new Error('API Error');
      }

      let saveToOrder = await axios.post(
        'https://goodfood-api.vercel.app/api/orders',
        { delivery_fee: 20000, delivery_address: finalAddress.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (typeof saveToOrder.data === 'string') {
        throw new Error('API Error');
      }

      if (saveToOrder.status === 200) {
        dispatch(setCurrentOrderId(saveToOrder.data._id));
        dispatch(setCheckoutAddress(finalAddress.name));
        dispatch(setAddressInCheckout(false));
        navigate('/checkout/invoice');
      }
    } catch (error) {
      toast.error(`${error.message}: Can't save order data`);
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
