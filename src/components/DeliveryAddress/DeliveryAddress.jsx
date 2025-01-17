import axios from 'axios';
import AddressForm from '../AddressForm/AddressForm';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { toggleAddressForm } from '../../app/features/deliveryAddressSlice';
import {
  fetchWhenLogin,
  toggleAddressForm,
} from '../../app/features/deliveryAddressSlice';
import './DeliveryAddress.scss';

const DeliveryAddress = () => {
  const { address, toggleForm } = useSelector((state) => state.deliveryAddress);
  const { token } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);
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

        if (toggleForm) {
          setShowForm(true);
        } else {
          setShowForm(false);
        }

        dispatch(fetchWhenLogin(response.data));
        dispatch(toggleAddressForm(false));
      } catch (error) {
        console.log(error);
      }
    };

    getDeliveryAddress();
  }, [token, dispatch]);

  return (
    <div className="address-profile">
      <button className="add-address" onClick={() => setShowForm(!showForm)}>
        Tambah Alamat
      </button>
      {address.length > 0 && !showForm && (
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
      {address.length < 1 && !showForm && (
        <p className="empty-address">Anda belum memiliki alamat pengiriman.</p>
      )}
      {showForm && <AddressForm />}
    </div>
  );
};
export default DeliveryAddress;
