import { useDispatch } from 'react-redux';
import './NotAuthModal.scss';
import { IoClose } from 'react-icons/io5';
import { IoWarning } from 'react-icons/io5';
import { toogleModal } from '../../app/features/cartSlice';
import Button from '../Button/Button';
import { NavLink } from 'react-router';

const NotAuthModal = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toogleModal(false));
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-description">
        <IoWarning size={96} color="#ffaa22" />
        <p>Please login first to add product!</p>
        <button type="button" className="close-modal" onClick={handleClick}>
          <IoClose size={24} />
        </button>
        <div className="button-modal-wrapper">
          <Button
            variant="outline-reversed"
            text="Close"
            handleClick={handleClick}
          />
          <NavLink to="/login">
            <Button
              variant="filled-reversed"
              text="Login"
              handleClick={handleClick}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default NotAuthModal;
