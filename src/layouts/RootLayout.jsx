import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
