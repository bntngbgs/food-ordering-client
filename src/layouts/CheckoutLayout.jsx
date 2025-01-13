import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { Outlet } from 'react-router';
import './CheckoutLayout.scss';

const CheckoutLayout = () => {
  return (
    <div className="checkout-wrapper">
      <Breadcrumbs />
      <Outlet />
    </div>
  );
};
export default CheckoutLayout;
