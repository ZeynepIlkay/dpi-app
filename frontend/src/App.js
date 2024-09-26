import React, { useState } from "react";
import axios from "axios";

function App() {
  const [dpi, setDpi] = useState(72);
  const [file, setFile] = useState(null);

  const handleImageUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDpiChange = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("dpi", dpi);

    // Görüntüyü sunucuya gönder
    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        responseType: 'blob', // BLOB olarak yanıt alıyoruz
      });

      // İndirilebilir dosya oluştur
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "image_with_new_dpi.png");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("DPI değiştirirken bir hata oluştu:", error);
    }
  };

  return (
    <div className="App">
      <h2>DPI Ayarlayıcı</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />
      <label htmlFor="dpi">DPI Değeri:</label>
      <input
        type="number"
        value={dpi}
        onChange={(e) => setDpi(e.target.value)}
      />
      <br />
      <button onClick={handleDpiChange}>DPI Uygula ve İndir</button>
    </div>
  );
}

export default App;
