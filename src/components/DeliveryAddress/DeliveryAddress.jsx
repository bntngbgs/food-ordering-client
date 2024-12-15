import { useState } from 'react';
import AddressForm from '../AddressForm/AddressForm';
import './DeliveryAddress.scss';

const DeliveryAddress = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const state = true;

  return (
    <div className="address-profile">
      <button
        className="add-address"
        onClick={() => setToggleForm(!toggleForm)}
      >
        Tambah Alamat
      </button>
      {state && !toggleForm && (
        <table>
          <thead></thead>
          <tr>
            <th>Nama</th>
            <th>Detail</th>
          </tr>
          <tbody>
            <tr>
              <td>Bandung</td>
              <td>
                JAWA BARAT, KOTA BANDUNG, BOJONGLOA KIDUNG, CIBADUYUT WETAN,
                Sukaraja
              </td>
            </tr>
          </tbody>
        </table>
      )}{' '}
      {!state && !toggleForm && (
        <p className="empty-address">Anda belum memiliki alamat</p>
      )}
      {toggleForm && <AddressForm />}
    </div>
  );
};
export default DeliveryAddress;
