import { useState, useEffect } from "react";
import "./App.css";

function Header() {
  return (
    <div className="title">
      <h1>Produk Skincare</h1>
      <p className="subtitle">Produk Perawatan Wajah</p>
    </div>
  );
}

function ProductItem({ nama, brand, jenis, harga }) {
  return (
    <div className="card">
      <h2>{nama}</h2>

      <div className="info-box">
        <strong>Brand:</strong> {brand}
      </div>

      <div className="info-box">
        <strong>Jenis:</strong> {jenis}
      </div>

      <div className="info-box">
        <strong>Harga:</strong> {harga}
      </div>
    </div>
  );
}

export default function App() {
  // 🔥 Ambil data dari localStorage saat pertama kali load
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("skincareProducts");
    return savedProducts
      ? JSON.parse(savedProducts)
      : [
          {
            nama: "Serum",
            brand: "Somethinc",
            jenis: "Serum",
            harga: "Rp 75.000",
          },
          {
            nama: "Sunscreen",
            brand: "Azarine",
            jenis: "Sunscreen",
            harga: "Rp 65.000",
          },
        ];
  });

  const [form, setForm] = useState({
    nama: "",
    brand: "",
    jenis: "",
    harga: "",
  });

  const [showForm, setShowForm] = useState(false);

  // 🔥 Simpan ke localStorage setiap products berubah
  useEffect(() => {
    localStorage.setItem("skincareProducts", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setProducts([...products, form]);

    setForm({
      nama: "",
      brand: "",
      jenis: "",
      harga: "",
    });

    setShowForm(false);
  };

  return (
    <div className="container">
      <Header />

      <button className="btn-add" onClick={() => setShowForm(true)}>
        Tambah Produk
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Tambah Produk Skincare</h3>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nama"
                placeholder="Nama Produk"
                value={form.nama}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={form.brand}
                onChange={handleChange}
                required
              />

              <select
                name="jenis"
                value={form.jenis}
                onChange={handleChange}
                required
              >
                <option value="">-- Pilih Jenis --</option>
                <option value="Serum">Serum</option>
                <option value="Sunscreen">Sunscreen</option>
                <option value="Toner">Toner</option>
                <option value="Moisturizer">Moisturizer</option>
                <option value="Cleanser">Cleanser</option>
                <option value="Essence">Essence</option>
                <option value="Face Mist">Face Mist</option>
                <option value="Facial Wash">Facial Wash</option>
                <option value="Mask">Mask</option>
              </select>

              <input
                type="text"
                name="harga"
                placeholder="Harga (contoh: Rp 75.000)"
                value={form.harga}
                onChange={handleChange}
                required
              />

              <div className="modal-buttons">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Batal
                </button>

                <button type="submit" className="btn-save">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card-container">
        {products.map((item, index) => (
          <ProductItem
            key={index}
            nama={item.nama}
            brand={item.brand}
            jenis={item.jenis}
            harga={item.harga}
          />
        ))}
      </div>
    </div>
  );
}
