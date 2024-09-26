from flask import Flask, request, send_file
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # CORS politikalarını izin vermek için ekliyoruz

@app.route("/upload", methods=["POST"])
def upload_image():
    dpi = int(request.form.get("dpi"))
    file = request.files['image']
    image = Image.open(file)

    # DPI'yi değiştir ve görüntüyü belleğe kaydet
    output = io.BytesIO()
    image.save(output, format='PNG', dpi=(dpi, dpi))
    output.seek(0)
    
    return send_file(output, mimetype='image/png', as_attachment=True, download_name="image_with_new_dpi.png")


if __name__ == "__main__":
    app.run(debug=True)
