import InvoiceDetails from '../InvoiceDetails/InvoiceDetails';
import Button from '../Button/Button';
import './Invoice.scss';
import { useDispatch } from 'react-redux';
import { clearCart, resetCartState } from '../../app/features/cartSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Invoice = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());

    const cleanUp = () => {
      dispatch(resetCartState());
    };

    window.addEventListener('beforeunload', cleanUp);

    return () => {
      dispatch(resetCartState());
      window.removeEventListener('beforeunload', cleanUp);
    };
  }, []);

  const handleClick = () => {
    navigate('/');
    dispatch(clearCart());
  };

  return (
    <div className="invoice-wrapper">
      <InvoiceDetails />

      <div className="checkout-button-wrapper">
        {/* <a href="/"> */}
        <Button
          variant="outline-reversed"
          text="Back to home"
          handleClick={handleClick}
        />
        {/* </a> */}
      </div>
    </div>
  );
};
export default Invoice;
