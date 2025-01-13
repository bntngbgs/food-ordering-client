// import { useSelector } from 'react-redux';
import axios from 'axios';
import Button from '../Button/Button';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './Invoice.scss';

const Invoice = () => {
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentOrderId, token } = useSelector((state) => state.user);
  const { selectedAddress } = useSelector((state) => state.deliveryAddress);

  useEffect(() => {
    const getData = async () => {
      let invoiceData = await axios.get(
        `http://localhost:3000/api/invoices/${currentOrderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setInvoice(invoiceData.data);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Invoice</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="invoice-table">
          <thead>
            <tr>
              <th>
                <img src={logo} alt="" />
              </th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Status</td>
              <td>waiting_payment</td>
            </tr>
            <tr>
              <td>Order ID</td>
              <td>#{invoice.order.order_number}</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td>Rp. {invoice.total}</td>
            </tr>
            <tr>
              <td>Billed to</td>
              <td>
                <h4>{invoice.user.full_name}</h4>
                <p>{invoice.user.email}</p>
                <p>{selectedAddress}</p>
              </td>
            </tr>
            <tr>
              <td>Payment to</td>
              <td>
                <p>Admin GoodFood</p>
                <p>admin.goodfood@gmail.com</p>
                <p>BCA</p>
                <p>xxxxx-xxxxxx-123-45</p>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="checkout-button-wrapper">
        <Link to="/">
          <Button variant="outline-reversed" text="Back to home" />
        </Link>
      </div>
    </div>
  );
};
export default Invoice;
