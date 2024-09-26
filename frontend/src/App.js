import React, { useState, useRef } from "react";
import axios from "axios";
import "./App.css"; // CSS dosyasını bağlayalım

function App() {
  const [dpi, setDpi] = useState(72);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null); // Dosya inputu referansı oluşturuyoruz

  const handleImageUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDpiChange = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("dpi", dpi);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        responseType: 'blob',
      });

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

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const fileDropped = e.dataTransfer.files[0];
    setFile(fileDropped);
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Tıklamada dosya seçme penceresini açıyoruz
  };

  return (
    <div className="app-container">
      <div className="card">
        <h2>DPI Ayarlayıcı</h2>
        <div 
          className={`drop-area ${dragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick} // Tıklamada dosya seçme penceresini aç
        >
          {file ? (
            <p>{file.name} yüklendi!</p>
          ) : (
            <p>Dosyayı buraya sürükleyin veya seçmek için tıklayın</p>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            ref={fileInputRef} // input referansı
            style={{ display: 'none' }} // Input'u gizli tutuyoruz
          />
        </div>
        <label htmlFor="dpi">DPI Değeri:</label>
        <input
          type="number"
          value={dpi}
          onChange={(e) => setDpi(e.target.value)}
        />
        <button className="apply-btn" onClick={handleDpiChange}>DPI Uygula ve İndir</button>
      </div>
    </div>
  );
}

export default App;
