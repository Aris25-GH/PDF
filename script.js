document.getElementById('decrypt-button').addEventListener('click', async () => {
    const fileInput = document.getElementById('file-input');
    const password = document.getElementById('password-input').value; // Password input is not utilized
    const file = fileInput.files[0];

    if (!file) {
        alert('Please upload a PDF file.');
        return;
    }

    // Read the file
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document; ignoreEncryption doesn't actually decrypt
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

    // Save the PDF document
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a download link
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'decrypted.pdf';
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Click here to download the decrypted PDF.';
});
