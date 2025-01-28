import { useLocation } from 'react-router';
import './Breadcrumps.scss';
import { useEffect, useState } from 'react';
import { TiChevronRight } from 'react-icons/ti';

const Breadcrumbs = () => {
  const [crumbs, setCrumbs] = useState([]);
  // const routes = [
  //   { path: '/cart', name: 'Cart Items' },
  //   { path: '/checkout/address', name: 'Delivery Address' },
  //   { path: '/checkout/confirm', name: 'Confirm Order' },
  //   { path: '/checkout/invoice', name: 'Your Invoice' },
  // ];
  let location = useLocation();
  // let routePath = location.pathname.split('/').filter((x) => x);

  /* 
    All Path : 
      1: /cart
      2: /checkout/address
      3: /checkout/confirm
      4: /checkout/invoice
  */

  // routerPath.map()

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

    // setLocalCrumbData(breadcrumbs);
    // if (location.pathname === '/cart') {
    //   dispatch(setBreadcrumbs('Cart Items'));
    //   setLocalCrumbData(breadcrumbs);
    //   console.log(localCrumbData);
    //   if (breadcrumbs.length > 1) {
    //     let currentCrumb = breadcrumbs.slice(0, -1);
    //     setLocalCrumbData(currentCrumb);
    //   }
    // }
    // if (location.pathname === '/checkout/address') {
    //   dispatch(setBreadcrumbs('Delivery Address'));
    //   setLocalCrumbData(breadcrumbs);
    //   console.log(localCrumbData);
    //   if (breadcrumbs.length > 2) {
    //     let currentCrumb = breadcrumbs.slice(0, -1);
    //     setLocalCrumbData(currentCrumb);
    //   }
    // }
    // if (location.pathname === '/checkout/confirm') {
    //   dispatch(setBreadcrumbs('Confirm Order'));
    //   setLocalCrumbData(breadcrumbs);
    //   console.log(localCrumbData);
    //   if (breadcrumbs.length > 3) {
    //     let currentCrumb = breadcrumbs.slice(0, -1);
    //     setLocalCrumbData(currentCrumb);
    //   }
    // }
    // if (location.pathname === '/checkout/invoice') {
    //   dispatch(setBreadcrumbs('Invoice'));
    //   setLocalCrumbData(breadcrumbs);
    //   console.log(localCrumbData);
    //   if (breadcrumbs.length > 4) {
    //     let currentCrumb = breadcrumbs.slice(0, -1);
    //     setLocalCrumbData(currentCrumb);
    //   }
    // }
  }, [location]);

  // if (location.pathname === '/checkout/address') {
  //   setCrumbs((prevState) => [...prevState, 'Delivery Address']);
  // }

  // console.log(crumbs);

  return (
    <div className="breadcrumbs-wrapper">
      {/* {routePath.map((value, index) => {
        const last = index === routePath.length - 1;
        const to = `/${routePath.slice(0, index + 1).join('/')}`;
        const routeName = routes.find((route) => route.path === to)?.name;

        return (
          <li key={to}>
            {last ? <span>{routeName}</span> : <Link to={to}>{routeName}</Link>}
          </li>
        );
      })} */}
      {/* {localCrumbData.length < 1 && <p>loading...</p>} */}

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
