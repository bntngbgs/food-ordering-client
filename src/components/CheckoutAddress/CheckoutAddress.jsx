import axios from 'axios';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  toggleAddressForm,
  setCheckoutAddress,
  fetchWhenLogin,
  setAddressInCheckout,
} from '../../app/features/deliveryAddressSlice';
import './CheckoutAddress.scss';

const CheckoutAddress = () => {
  let { address } = useSelector((state) => state.deliveryAddress);
  let { token } = useSelector((state) => state.user);
  const [selectedAddress, setSelectedAddress] = useState('');
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    const getAddressFromDB = async () => {
      try {
        let addressData = await axios.get(
          'http://localhost:3000/api/delivery-address',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        dispatch(fetchWhenLogin(addressData.data));
      } catch (error) {
        console.log(error);
      }
    };

    getAddressFromDB();
  }, [dispatch]);

  const handleChange = (e) => {
    setSelectedAddress(e.target.id);
  };

  const handleClick = () => {
    dispatch(setCheckoutAddress(selectedAddress));
    navigate('/checkout/confirm');
  };

  const handleClickPrevious = () => {
    navigate('/cart');
  };

  const handleAddAddress = () => {
    dispatch(toggleAddressForm(true));
    dispatch(setAddressInCheckout(true));
  };

  return (
    <div className="address-table-wrapper">
      <h1>Pilih Alamat Pengiriman</h1>
      {address.length > 0 ? (
        <table className="address-table">
          <thead>
            <tr>
              <td></td>
              <td>Nama</td>
              <td>Detail</td>
            </tr>
          </thead>
          <tbody>
            {address.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    name="address"
                    id={item._id}
                    onChange={handleChange}
                    checked={selectedAddress === item._id}
                  />
                </td>
                <td>{item.nama}</td>
                <td>{`${item.provinsi}, ${item.kabupaten}, ${item.kecamatan}, ${item.kelurahan}, ${item.detail}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="checkout-address-empty">
          <h2>Anda belum memiliki alamat pengiriman.</h2>
          <Link to="/user/address" onClick={handleAddAddress}>
            Tambah alamat
          </Link>
        </div>
      )}
      {address.length > 0 && (
        <div className="checkout-button-wrapper">
          <Button
            variant="filled-reversed"
            text="Sebelumnya"
            handleClick={handleClickPrevious}
          />
          <Button
            variant="outline-reversed"
            text="Selanjutnya"
            handleClick={handleClick}
            disabled={selectedAddress === ''}
          />
        </div>
      )}
    </div>
  );
};
export default CheckoutAddress;
