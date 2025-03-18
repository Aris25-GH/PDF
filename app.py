from flask import Flask, request, send_file
from PyPDF2 import PdfReader, PdfWriter
import os

app = Flask(__name__)

@app.route('/decrypt-pdf', methods=['POST'])
def decrypt_pdf():
    if 'file' not in request.files:
        return "No file uploaded", 400

    file = request.files['file']
    if file.filename == '':
        return "No file selected", 400

    try:
        reader = PdfReader(file)
        writer = PdfWriter()

        if reader.is_encrypted:
            reader.decrypt('')  # Remove password

        for page in reader.pages:
            writer.add_page(page)

        output_path = 'decrypted.pdf'
        with open(output_path, 'wb') as output_pdf:
            writer.write(output_pdf)

        return send_file(output_path, as_attachment=True, download_name='decrypted.pdf')
    except Exception as e:
        return f"An error occurred: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)
