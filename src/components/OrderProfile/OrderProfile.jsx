import axios from 'axios';
import InvoiceDetails from '../InvoiceDetails/InvoiceDetails';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { TbSquareRoundedChevronRightFilled } from 'react-icons/tb';
import './OrderProfile.scss';
import { setCurrentOrderId } from '../../app/features/userSlice';
import { toast } from 'react-toastify';

const OrderProfile = () => {
  const { token } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [showInvoice, setShowInvoice] = useState(false);
  const [showDetails, setShowDetails] = useState({
    id: '',
    isShowing: false,
  });
  let dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    const getOrderData = async () => {
      try {
        const order = await axios.get(`http://localhost:3000/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (typeof order.data === 'string') {
          throw Error('API Error');
        }

        let orderItems = await order.data.data.map((item) => item.order_items);

        let total = await orderItems.map((item) =>
          item.map((data) => data.price * data.qty)
        );

        let grandTotal = await total.map(
          (item) => item.reduce((prev, curr) => prev + curr),
          0
        );

        let finalOrderData = order.data.data.map((item, index) => ({
          ...item,
          grand_total: grandTotal[index],
        }));

        setOrderData(finalOrderData);
        setIsLoading(false);
      } catch (error) {
        toast.error(`${error.message}: Can't fetch order data`);
      }
    };

    getOrderData();
  }, []);

  const handleExpand = (_id) => {
    if (showDetails.id === _id) {
      return setShowDetails({
        id: '',
      });
    }
    setShowDetails({
      id: _id,
    });
  };

  const handleClickInvoice = (id) => {
    dispatch(setCurrentOrderId(id));
    setShowInvoice(!showInvoice);
  };

  return (
    <div className="order-profile">
      {isLoading && (
        <div className="order-loader">
          <div className="loader loader-small"></div>
        </div>
      )}

      {orderData.length > 0 && !isLoading && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Order ID</th>
              <th>Total</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>

          <tbody>
            {orderData.map((item, index) => (
              <>
                <tr key={index}>
                  <td
                    onClick={() => {
                      handleExpand(item._id);
                    }}
                    className="expand-button"
                  >
                    <TbSquareRoundedChevronRightFilled
                      size={28}
                      color={'#fa4032'}
                      className={showDetails.id === item._id ? 'rotate' : ''}
                    />
                  </td>
                  <td>#{item.order_number}</td>
                  <td>
                    Rp.{' '}
                    {Intl.NumberFormat('id-ID').format(
                      item.grand_total + item.delivery_fee
                    )}
                  </td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="invoices-button"
                      onClick={() => handleClickInvoice(item._id)}
                    >
                      Invoices
                    </button>
                  </td>
                </tr>
                {showDetails.id === item._id && (
                  <>
                    <tr className="order-details">
                      <th colSpan={2}>Barang</th>
                      <th>Jumlah</th>
                      <th colSpan={2}>Total Harga</th>
                    </tr>
                    {item.order_items.map((order, index) => (
                      <tr className="order-details-value" key={index}>
                        <td colSpan={2}>{order.name}</td>
                        <td>{order.qty}</td>
                        <td colSpan={2}>
                          Rp. {Intl.NumberFormat('id-ID').format(order.price)}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </>
            ))}
          </tbody>
        </table>
      )}

      {orderData.length < 1 && !isLoading && (
        <p className="empty-order">Anda belum memiliki pesanan.</p>
      )}

      {showInvoice && (
        <div className="invoice-modal-wrapper">
          <div className="invoice-modal">
            <div className="close-button-wrapper">
              <IoClose
                color={'#ffb200'}
                onClick={() => handleClickInvoice()}
                className="close-button"
              />
            </div>
            <InvoiceDetails />
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderProfile;
