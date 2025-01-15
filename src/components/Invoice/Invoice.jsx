import InvoiceDetails from '../InvoiceDetails/InvoiceDetails';
import Button from '../Button/Button';
import './Invoice.scss';

const Invoice = () => {
  return (
    <div className="invoice-wrapper">
      <h1>Invoice</h1>
      <InvoiceDetails />

      <div className="checkout-button-wrapper">
        <a href="/">
          <Button variant="outline-reversed" text="Back to home" />
        </a>
      </div>
    </div>
  );
};
export default Invoice;
