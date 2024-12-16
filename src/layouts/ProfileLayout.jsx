import defaultAvatar from '../assets/default-avatar.png';
import { useNavigate, Outlet, NavLink } from 'react-router';
import { persistor } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../app/features/userSlice';
import { removeWhenLogout } from '../app/features/deliveryAddressSlice';
import { toast } from 'react-toastify';
import { FaChevronRight } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import './ProfileLayout.scss';

const ProfileLayout = () => {
  const { id } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.error('Logout berhasil!', {
      autoClose: 1000,
    });

    dispatch(userLogout());
    dispatch(removeWhenLogout());

    persistor.purge().then(() => {
      navigate('/');
    });
  };

  return (
    <div className="profile-page">
      <img src={defaultAvatar} className="avatar" />
      <h2>Account ID : {id}</h2>
      <div className="profile-details">
        <div className="side-bar">
          <NavLink className="profile-link" to="/user/profile">
            <p>Profil</p>
            <FaChevronRight />
          </NavLink>
          <NavLink className="profile-link" to="/user/order">
            <p>Pemesanan</p>
            <FaChevronRight />
          </NavLink>
          <NavLink className="profile-link" to="/user/address">
            <p>Alamat</p>
            <FaChevronRight />
          </NavLink>
          <button className="logout-btn" onClick={handleLogout}>
            <p>Logout</p>
            <TbLogout size={24} />
          </button>
        </div>
        <div className="expanded">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default ProfileLayout;
