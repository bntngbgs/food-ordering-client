import './AddressForm.scss';

const AddressForm = () => {
  return (
    <form>
      <div className="address-form-wrapper">
        <div className="address-name">
          <div className="input-group">
            <label htmlFor="nama-alamat">Nama :</label>
            <input
              type="text"
              name="nama-alamat"
              id="nama-alamat"
              placeholder="Masukkan nama alamat"
            />
          </div>
          <div className="input-group">
            <label htmlFor="detail-alamat">Detail alamat :</label>
            <textarea
              name="detail-alamat"
              id="detail-alamat"
              rows={6}
              placeholder="Masukkan detail alamat"
            ></textarea>
          </div>
        </div>
        <div className="address-details">
          <div className="input-group">
            <label htmlFor="provinsi">Provinsi</label>
            <select name="provinsi" id="provinsi">
              <option>Pilih Provinsi...</option>
              <option value="Aceh">ACEH</option>
              <option value="Jambi">JAMBI</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="kabupaten">Kabupaten</label>
            <select name="kabupaten" id="kabupaten">
              <option>Pilih Kabupaten...</option>
              <option value="Aceh">ACEH</option>
              <option value="Jambi">JAMBI</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="kecamatan">Kecamatan</label>
            <select name="kecamatan" id="kecamatan">
              <option>Pilih Kecamatan...</option>
              <option value="Aceh">ACEH</option>
              <option value="Jambi">JAMBI</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="kelurahan">Kelurahan</label>
            <select name="kelurahan" id="kelurahan">
              <option>Pilih Kelurahan...</option>
              <option value="Aceh">ACEH</option>
              <option value="Jambi">JAMBI</option>
            </select>
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
