import defaultAvatar from '../../assets/default-avatar.png';
import logoutIcon from '../../assets/logout.png';
import { useNavigate } from 'react-router';
// import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router';
import { persistor } from '../../app/store';
import './Profile.scss';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../app/features/userSlice';
import { toast } from 'react-toastify';

const Profile = () => {
  // const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.error('Logout berhasil!');
    localStorage.removeItem('user');
    dispatch(userLogout());

    persistor.purge().then(() => {
      navigate('/');
    });
  };

  return (
    <div className="profile-page">
      <img src={defaultAvatar} className="avatar" />
      <h1>Account ID : 2kf784n17e8e98l</h1>
      <div className="profile-details">
        <div className="side-bar">
          <div className="profile-link active">
            <p>Profil</p>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.5293 7.46957L15.0617 12L10.5293 16.5305L9.46887 15.4696L12.9399 12L9.46887 8.53046L10.5293 7.46957Z"
                  fill="#1F2328"
                  className="active"
                ></path>
              </g>
            </svg>
          </div>
          <div className="profile-link">
            <p>Pemesanan</p>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.5293 7.46957L15.0617 12L10.5293 16.5305L9.46887 15.4696L12.9399 12L9.46887 8.53046L10.5293 7.46957Z"
                  fill="#1F2328"
                ></path>
              </g>
            </svg>
          </div>
          <div className="profile-link">
            <p>Alamat</p>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.5293 7.46957L15.0617 12L10.5293 16.5305L9.46887 15.4696L12.9399 12L9.46887 8.53046L10.5293 7.46957Z"
                  fill="#1F2328"
                ></path>
              </g>
            </svg>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <p>Logout</p>
            <img src={logoutIcon} />
          </button>
        </div>
        <div className="expanded"></div>
      </div>
    </div>
  );
};

export default Profile;
