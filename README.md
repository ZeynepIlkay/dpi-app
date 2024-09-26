# DPI Ayarlayıcı Uygulaması

Bu proje, kullanıcıların yükledikleri görsellerin DPI (Dots Per Inch) değerini değiştirmelerini sağlar. Kullanıcı, görseli yükledikten sonra istediği DPI değerini seçer ve güncellenmiş görseli indirebilir. Görsellerin önizlemesi ve işlenmesi için `canvas` teknolojisi kullanılmıştır.
![image](https://github.com/user-attachments/assets/b97f220c-894e-426d-a5df-0974160d341d)

## Özellikler

- Kullanıcı, bir görsel dosyasını yükleyebilir.
- DPI değeri belirlenerek, yüklenen görselin DPI'sı değiştirilebilir.
- Görsel, güncellenmiş DPI değeri ile indirilebilir.
- Drag & Drop özelliği ile kullanıcılar dosyalarını sürükleyip bırakabilir.
- **Canvas** kullanarak yüklenen görselin önizlemesi yapılır ve işleme sırasında geçici olarak canvas üzerine çizilir.

## Teknolojiler

- **Frontend**: React (JavaScript), Canvas (HTML5)
- **Backend**: Flask (Python)
- **Görsel İşleme**: Pillow (Python Kütüphanesi)
- **Styling**: CSS (Responsive tasarım için Media Queries kullanıldı)


