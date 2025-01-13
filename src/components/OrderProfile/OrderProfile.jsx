import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './OrderProfile.scss';

const OrderProfile = () => {
  const { token } = useSelector((state) => state.user);
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const getOrderData = async () => {
      const order = await axios.get(`http://localhost:3000/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let orderItems = await order.data.data.map((item) => item.order_items);

      let grandTotal = await orderItems.map((item) =>
        item.map((data) => data.price * data.qty)
      );

      let grandGrandTotal = await grandTotal.map(
        (item) => item.reduce((prev, curr) => prev + curr),
        0
      );

      let finalOrderData = order.data.data.map((item, index) => ({
        ...item,
        grand_total: grandGrandTotal[index],
      }));

      setOrderData(finalOrderData);
    };

    getOrderData();
  }, []);

  return (
    <div className="order-profile">
      {orderData.length > 0 ? (
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
            {orderData.map((item, index) => (
              <tr key={index}>
                <td>#{item.order_number}</td>
                <td>
                  Rp.{' '}
                  {Intl.NumberFormat('id-ID').format(
                    item.grand_total + item.delivery_fee
                  )}
                </td>
                <td>{item.status}</td>
                <td>
                  <button className="invoices-button">Invoices</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty-order">Anda belum memiliki pesanan</p>
      )}
    </div>
  );
};
export default OrderProfile;
