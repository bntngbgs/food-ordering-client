import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/Profile';
import ProtectedRoutes from './components/utils/ProtectedRoutes';
import ProfileLayout from './layouts/ProfileLayout';
import OrderProfile from './components/OrderProfile/OrderProfile';
import CheckoutLayout from './layouts/CheckoutLayout';
import CheckoutAddress from './components/CheckoutAddress/CheckoutAddress';
import ConfirmOrder from './components/ConfirmOrder/ConfirmOrder';
import Invoice from './components/Invoice/Invoice';
import NotFound from './pages/NotFound/NotFound';
import Address from './pages/Address/Address';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutLayout />}>
            <Route path="address" element={<CheckoutAddress />} />
            <Route path="confirm" element={<ConfirmOrder />} />
            <Route path="invoice" element={<Invoice />} />
          </Route>
          <Route path="/user" element={<ProfileLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="order" element={<OrderProfile />} />
            <Route path="address" element={<Address />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
