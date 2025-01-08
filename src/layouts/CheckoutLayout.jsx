import { Outlet } from 'react-router';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
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
