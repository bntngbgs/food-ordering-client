import defaultAvatar from '../assets/default-avatar.png';
import { useNavigate, Outlet, NavLink } from 'react-router';
import { persistor } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../app/features/userSlice';
import { removeWhenLogout } from '../app/features/deliveryAddressSlice';
import { toast } from 'react-toastify';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import { clearCart } from '../app/features/cartSlice';
import './ProfileLayout.scss';
import { useEffect, useState } from 'react';

const ProfileLayout = () => {
  const { id } = useSelector((state) => state.user);
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  const handleLogout = () => {
    toast.error('Logout berhasil!', {
      autoClose: 1000,
    });

    dispatch(clearCart());
    dispatch(userLogout());
    dispatch(removeWhenLogout());

    persistor.purge().then(() => {
      navigate('/');
    });
  };

  return (
    <div className="profile-page">
      <img src={defaultAvatar} className="avatar" />
      <h2>
        Account ID : <span>{id}</span>
      </h2>
      {width < 551 && (
        <button className="logout-btn" onClick={handleLogout}>
          <p>Logout</p>
          <TbLogout size={24} />
        </button>
      )}

      <div className="profile-details">
        <div className="side-bar">
          <NavLink className="profile-link" to="/user/profile">
            <p>Profil</p>
            {width > 550 ? <FaChevronRight /> : <FaChevronDown />}
          </NavLink>
          <NavLink className="profile-link" to="/user/order">
            <p>Pemesanan</p>
            {width > 550 ? <FaChevronRight /> : <FaChevronDown />}
          </NavLink>
          <NavLink className="profile-link" to="/user/address">
            <p>Alamat</p>
            {width > 550 ? <FaChevronRight /> : <FaChevronDown />}
          </NavLink>
          {width > 550 && (
            <button className="logout-btn" onClick={handleLogout}>
              <p>Logout</p>
              <TbLogout size={24} />
            </button>
          )}
        </div>

        <div className="expanded">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
