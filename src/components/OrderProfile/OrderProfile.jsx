import './OrderProfile.scss';

const OrderProfile = () => {
  const state = true;

  return (
    <div className="order-profile">
      {state ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#4</td>
              <td>Rp. 230.000</td>
              <td>waiting_payment</td>
              <td>Invoices</td>
            </tr>
            <tr>
              <td>#4</td>
              <td>Rp. 230.000</td>
              <td>waiting_payment</td>
              <td>Invoices</td>
            </tr>
            <tr>
              <td>#4</td>
              <td>Rp. 230.000</td>
              <td>waiting_payment</td>
              <td>Invoices</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="empty-order">Anda belum memiliki pesanan</p>
      )}
    </div>
  );
};
export default OrderProfile;
