import './CheckoutAddress.scss';

const CheckoutAddress = () => {
  return (
    <div className="address-table-wrapper">
      <h1>Pilih Alamat Pengiriman</h1>
      <table className="address-table">
        <thead>
          <tr>
            <td></td>
            <td>Nama</td>
            <td>Detail</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" name="address" id="address" />
            </td>
            <td>Bandung</td>
            <td>
              Jawa Barat, Kota Bandung Bojongloa Kidul, Cibaduyut Wetan,
              Sukaraja
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" name="address" id="address" />
            </td>
            <td>Bandung</td>
            <td>
              Jawa Barat, Kota Bandung Bojongloa Kidul, Cibaduyut Wetan,
              Sukaraja
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default CheckoutAddress;
