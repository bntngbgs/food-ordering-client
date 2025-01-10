import { useSelector } from 'react-redux';
import Button from '../Button/Button';
import './ConfirmOrder.scss';

const ConfirmOrder = () => {
  const { address, selectedAddress } = useSelector(
    (state) => state.deliveryAddress
  );

  const { totalPrice } = useSelector((state) => state.cart);

  let finalAddress = address.filter((item) => item._id === selectedAddress);

  let [{ detail, provinsi, kabupaten, kecamatan, kelurahan }] = finalAddress;
  console.log(finalAddress);

  return (
    <div>
      <h1>Konfirmasi Pemesanan</h1>
      <table className="confirm-order-table">
        <tbody>
          <tr>
            <td>Alamat</td>
            <td>{`${provinsi}, ${kabupaten}, ${kecamatan}, ${kelurahan}, ${detail}`}</td>
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
        <Button variant="filled-reversed" text="Sebelumnya" />
        <Button variant="green-filled" text="BAYAR" />
      </div>
    </div>
  );
};
export default ConfirmOrder;
