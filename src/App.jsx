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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
