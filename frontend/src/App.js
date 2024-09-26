import React, { useState, useRef } from "react";
import axios from "axios";
import "./App.css"; // CSS dosyasını bağlayalım

function App() {
  const [dpi, setDpi] = useState(72);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Canvas boyutlarını ayarla
        canvas.width = img.width;
        canvas.height = img.height;

        // Resmi canvas'a çiz
        ctx.drawImage(img, 0, 0);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
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
    handleImageUpload({ target: { files: [fileDropped] } });
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="app-container">
      <div className="card">
        <h2>DPI Ayarlayıcı</h2>
        <div
          className={`drop-area ${dragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {file ? <p>{file.name} yüklendi!</p> : <p>Dosyayı buraya sürükleyin veya seçmek için tıklayın</p>}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>
        <canvas ref={canvasRef} style={{ display: file ? "block" : "none", marginTop: "10px", maxWidth: "100%" }} />
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
