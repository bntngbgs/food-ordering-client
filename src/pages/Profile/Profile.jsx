import { useSelector } from 'react-redux';
import './Profile.scss';

const Profile = () => {
  const { customer_id, full_name, email } = useSelector((state) => state.user);

  return (
    <div className="user-profile">
      <table>
        <thead>
          <tr>
            <th colSpan={2}>User Profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Customer ID</td>
            <td>: {customer_id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {full_name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>: {email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Profile;
