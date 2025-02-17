import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { TiChevronRight } from 'react-icons/ti';
import './Breadcrumps.scss';

const Breadcrumbs = () => {
  const [crumbs, setCrumbs] = useState([]);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === '/cart') {
      setCrumbs(['Cart Items']);
    }
    if (location.pathname === '/checkout/address') {
      setCrumbs(['Cart Items', 'Delivery Address']);
    }

    if (location.pathname === '/checkout/confirm') {
      setCrumbs(['Cart Items', 'Delivery Address', 'Confirm Order']);
    }

    if (location.pathname === '/checkout/invoice') {
      setCrumbs([
        'Cart Items',
        'Delivery Address',
        'Confirm Order',
        'Your Invoice',
      ]);
    }
  }, [location]);

  return (
    <div className="breadcrumbs-wrapper">
      {crumbs.map((item, index) => {
        let lastEl = crumbs.length - 1;

        return lastEl === index ? (
          <span className="breadcrumbs-items active-crumbs" key={index}>
            {item}
          </span>
        ) : (
          <span className="breadcrumbs-items" key={index}>
            {item} <TiChevronRight />
          </span>
        );
      })}
    </div>
  );
};
export default Breadcrumbs;
