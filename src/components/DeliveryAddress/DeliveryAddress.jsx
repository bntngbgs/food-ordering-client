import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWhenLogin } from '../../app/features/deliveryAddressSlice';
import { toast } from 'react-toastify';
import './DeliveryAddress.scss';

const DeliveryAddress = () => {
  const { address } = useSelector((state) => state.deliveryAddress);
  const { token } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    const getDeliveryAddress = async () => {
      try {
        let response = await axios.get(
          `https://goodfood-api.vercel.app/api/delivery-address`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (typeof response.data === 'string') {
          throw Error('API Error');
        }

        dispatch(fetchWhenLogin(response.data));

        setIsLoading(false);
      } catch (error) {
        toast.error(`${error.message}: Can't fetch address data`);
      }
    };

    getDeliveryAddress();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="profile-address-loader">
          <div className="loader loader-small"></div>
        </div>
      )}

      {address.length > 0 && !isLoading && (
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
      )}
      {address.length < 1 && !isLoading && (
        <p className="empty-address">Anda belum memiliki alamat pengiriman.</p>
      )}
    </>
  );
};
export default DeliveryAddress;
