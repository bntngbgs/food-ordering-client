import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAddress,
  toggleAddressForm,
} from '../../app/features/deliveryAddressSlice';
import { PiWarningCircleLight } from 'react-icons/pi';
import { toast } from 'react-toastify';
import './AddressForm.scss';
import { useNavigate } from 'react-router';

const AddressForm = ({ handleChangeShowForm }) => {
  const { token } = useSelector((state) => state.user);
  const { isFromCheckoutAddress, toggleForm } = useSelector(
    (state) => state.deliveryAddress
  );
  const [validationError, setValidationError] = useState({});
  const [wilayah, setWilayah] = useState({
    provinsi: [],
    kabupaten: [],
    kecamatan: [],
    kelurahan: [],
  });
  const [id, setId] = useState({
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    kelurahan: '',
  });
  const [formData, setFormData] = useState({
    nama: '',
    detail: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    kelurahan: '',
  });
  let dispatch = useDispatch();
  let navigate = useNavigate();

  // fetch data provinsi dari api
  useEffect(() => {
    const getWilayahApi = async () => {
      try {
        let response = await axios.get(
          `https://bntngbgs.github.io/api-wilayah-indonesia/api/provinces.json`
        );

        setWilayah((prev) => ({ ...prev, provinsi: response.data }));
      } catch (error) {
        toast.error(`${error.message}: Tidak dapat terhubung ke API wilayah`);
      }
    };

    getWilayahApi();
  }, []);

  // fetch data kabupaten dari api setelah id.provinsi ter-set
  useEffect(() => {
    const getWilayahApi = async () => {
      try {
        let response = await axios.get(
          `https://bntngbgs.github.io/api-wilayah-indonesia/api/regencies/${id.provinsi}.json`
        );

        setWilayah((prev) => ({ ...prev, kabupaten: response.data }));
      } catch (error) {
        toast.error(`${error.message} 1: Tidak dapat terhubung ke API wilayah`);
      }
    };

    getWilayahApi();
  }, [id.provinsi]);

  // fetch data kecamatan dari api setelah id.kabupaten ter-set
  useEffect(() => {
    const getWilayahApi = async () => {
      try {
        let response = await axios.get(
          `https://bntngbgs.github.io/api-wilayah-indonesia/api/districts/${id.kabupaten}.json`
        );

        setWilayah((prev) => ({ ...prev, kecamatan: response.data }));
      } catch (error) {
        toast.error(`${error.message} 2: Tidak dapat terhubung ke API wilayah`);
      }
    };

    getWilayahApi();
  }, [id.kabupaten]);

  // fetch data kelurahan dari api setelah id.kecamatan ter-set
  useEffect(() => {
    const getWilayahApi = async () => {
      try {
        let response = await axios.get(
          `https://bntngbgs.github.io/api-wilayah-indonesia/api/villages/${id.kecamatan}.json`
        );

        setWilayah((prev) => ({ ...prev, kelurahan: response.data }));
      } catch (error) {
        toast.error(`${error.message} 3: Tidak dapat terhubung ke API wilayah`);
      }
    };

    getWilayahApi();
  }, [id.kecamatan]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [e.target.name]: '',
    }));

    if (e.target.type == 'select-one') {
      setId((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.options[e.target.selectedIndex].id,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.nama == '') {
      setValidationError((prevState) => ({
        ...prevState,
        nama: 'Nama alamat harus diisi',
      }));
    }
    if (formData.detail == '') {
      setValidationError((prevState) => ({
        ...prevState,
        detail: 'Detail alamat harus diisi',
      }));
    }
    if (formData.provinsi == '') {
      setValidationError((prevState) => ({
        ...prevState,
        provinsi: 'Provinsi harus diisi',
      }));
    }
    if (formData.kabupaten == '') {
      setValidationError((prevState) => ({
        ...prevState,
        kabupaten: 'Kabupaten harus diisi',
      }));
    }
    if (formData.kecamatan == '') {
      setValidationError((prevState) => ({
        ...prevState,
        kecamatan: 'Kecamatan harus diisi',
      }));
    }
    if (formData.kelurahan == '') {
      setValidationError((prevState) => ({
        ...prevState,
        kelurahan: 'Kelurahan harus diisi',
      }));
    }

    if (Object.values(formData).some((item) => item === '')) {
      return;
    }

    const validAddressData = {
      nama: formData.nama,
      detail: formData.detail,
      provinsi: formData.provinsi,
      kabupaten: formData.kabupaten,
      kecamatan: formData.kecamatan,
      kelurahan: formData.kelurahan,
    };

    try {
      let response = await axios.post(
        'http://localhost:3000/api/delivery-address',
        validAddressData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (typeof response.data !== 'object') {
        throw Error('API Error');
      }

      toast.success('Alamat berhasil ditambahkan', {
        autoClose: 1000,
      });

      dispatch(addAddress(response.data));
      dispatch(toggleAddressForm(!toggleForm));
      handleChangeShowForm();

      if (isFromCheckoutAddress) {
        setTimeout(() => {
          navigate('/checkout/address');
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="address-form-wrapper">
        <div className="address-name">
          <div className="input-group">
            <label htmlFor="nama-alamat">Nama :</label>
            <input
              type="text"
              name="nama"
              id="nama"
              placeholder="Masukkan nama alamat"
              value={formData['nama-alamat']}
              onChange={handleChange}
              className={validationError.nama ? 'input-error' : ''}
            />
            {validationError.nama && (
              <div className="error-wrapper">
                <PiWarningCircleLight color="red" size={24} />{' '}
                <p>{validationError.nama}</p>
              </div>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="detail-alamat">Detail alamat :</label>
            <textarea
              name="detail"
              id="detail"
              rows={6}
              placeholder="Masukkan detail alamat"
              value={formData.detail}
              className={validationError.detail ? 'input-error' : ''}
              onChange={handleChange}
            ></textarea>
            {validationError.detail && (
              <div className="error-wrapper">
                <PiWarningCircleLight color="red" size={24} />{' '}
                <p>{validationError.detail}</p>
              </div>
            )}
          </div>
        </div>

        <div className="address-details">
          <div className="input-group">
            <label htmlFor="provinsi">Provinsi</label>
            <select
              name="provinsi"
              id="provinsi"
              onChange={handleChange}
              className={validationError.provinsi ? 'input-error' : ''}
              value={formData.provinsi}
            >
              <option value="">Pilih Provinsi...</option>
              {wilayah.provinsi.map((item) => (
                <option value={item.name} key={item.id} id={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {validationError.provinsi && (
              <div className="error-wrapper">
                <PiWarningCircleLight color="red" size={24} />{' '}
                <p>{validationError.provinsi}</p>
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="kabupaten">Kabupaten</label>
            <select
              name="kabupaten"
              id="kabupaten"
              className={validationError.kabupaten ? 'input-error' : ''}
              onChange={handleChange}
              value={formData.kabupaten}
              disabled={!formData.provinsi}
            >
              <option value="">Pilih Kabupaten...</option>
              {wilayah.kabupaten.map((item) => (
                <option value={item.name} key={item.id} id={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {validationError.kabupaten && (
              <div className="error-wrapper">
                <PiWarningCircleLight color="red" size={24} />{' '}
                <p>{validationError.kabupaten}</p>
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="kecamatan">Kecamatan</label>
            <select
              name="kecamatan"
              id="kecamatan"
              className={validationError.kecamatan ? 'input-error' : ''}
              onChange={handleChange}
              value={formData.kecamatan}
              disabled={!formData.kabupaten}
            >
              <option value="">Pilih Kecamatan...</option>
              {wilayah.kecamatan.map((item) => (
                <option value={item.name} key={item.id} id={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {validationError.kecamatan && (
              <div className="error-wrapper">
                <PiWarningCircleLight color="red" size={24} />{' '}
                <p>{validationError.kecamatan}</p>
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="kelurahan">Kelurahan</label>
            <select
              name="kelurahan"
              id="kelurahan"
              className={validationError.kelurahan ? 'input-error' : ''}
              onChange={handleChange}
              value={formData.kelurahan}
              disabled={!formData.kecamatan}
            >
              <option value="">Pilih Kelurahan...</option>
              {wilayah.kelurahan.map((item) => (
                <option value={item.name} key={item.id} id={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {validationError.kelurahan && (
              <div className="error-wrapper">
                <PiWarningCircleLight color="red" size={24} />{' '}
                <p>{validationError.kelurahan}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <button type="submit" className="btn-submit">
        Simpan
      </button>
    </form>
  );
};
export default AddressForm;
