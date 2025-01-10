import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAddressForm } from '../../app/features/deliveryAddressSlice';
import { fetchWhenLogin } from '../../app/features/deliveryAddressSlice';
import AddressForm from '../AddressForm/AddressForm';
import './DeliveryAddress.scss';
import axios from 'axios';

const DeliveryAddress = () => {
  const { address, toggleForm } = useSelector((state) => state.deliveryAddress);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDeliveryAddress = async () => {
      try {
        let response = await axios.get(
          `http://localhost:3000/api/delivery-address`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        dispatch(fetchWhenLogin(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    getDeliveryAddress();
  }, [token, dispatch]);

  return (
    <div className="address-profile">
      <button
        className="add-address"
        onClick={() => dispatch(toggleAddressForm(!toggleForm))}
      >
        Tambah Alamat
      </button>
      {address.length > 0 && !toggleForm && (
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Detail</th>
            </tr>
          </thead>

          <tbody>
            {address.length > 0 &&
              address.map((item, index) => (
                <tr key={index}>
                  <td>{item.nama}</td>
                  <td>{`${item.provinsi}, ${item.kabupaten}, ${item.kecamatan}, ${item.kelurahan}, ${item.detail}`}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}{' '}
      {address.length < 1 && !toggleForm && (
        <p className="empty-address">Anda belum memiliki alamat pengiriman.</p>
      )}
      {toggleForm && <AddressForm />}
    </div>
  );
};
export default DeliveryAddress;
