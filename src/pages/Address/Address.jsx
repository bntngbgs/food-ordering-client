import { useEffect, useState } from 'react';
import DeliveryAddress from '../../components/DeliveryAddress/DeliveryAddress';
import AddressForm from '../../components/AddressForm/AddressForm';
import './Address.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddressForm } from '../../app/features/deliveryAddressSlice';

const Address = () => {
  const { toggleForm } = useSelector((state) => state.deliveryAddress);
  const [showForm, setShowForm] = useState(false);
  let dispatch = useDispatch();

  useEffect(() => {
    if (toggleForm) {
      setShowForm(true);
    }

    return () => {
      dispatch(toggleAddressForm(false));
    };
  }, [toggleForm, dispatch]);

  const handleChangeShowForm = () => {
    setShowForm(false);
    dispatch(toggleAddressForm(false));
  };

  return (
    <div className="address-profile">
      <button
        className="add-address"
        onClick={() => {
          setShowForm(!showForm);
          dispatch(toggleAddressForm(!showForm));
        }}
      >
        Tambah Alamat
      </button>
      {showForm ? (
        <AddressForm handleChangeShowForm={handleChangeShowForm} />
      ) : (
        <DeliveryAddress />
      )}
    </div>
  );
};
export default Address;
