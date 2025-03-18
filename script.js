document.getElementById('remove-security').addEventListener('click', async function () {
  const fileInput = document.getElementById('pdf-file');
  const file = fileInput.files[0];

  if (!file) {
    showError('Please select a PDF file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    // Show progress bar
    document.getElementById('progress-section').style.display = 'block';
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    // Update this URL to point to your Render backend
    const response = await fetch('https://pdf-xl6f.onrender.com/decrypt-pdf', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to process the file.');
    }

    const result = await response.blob();
    const processedFileSize = (result.size / (1024 * 1024)).toFixed(2); // Convert to MB
    document.getElementById('processed-size').textContent = `${processedFileSize} MB`;

    const downloadLink = document.getElementById('download-link');
    downloadLink.href = URL.createObjectURL(result);
    downloadLink.textContent = 'Download Decrypted PDF';
    document.getElementById('download-section').style.display = 'block';
    document.getElementById('progress-section').style.display = 'none';
  } catch (error) {
    console.error('Error:', error);
    showError('An error occurred while processing the file.');
    document.getElementById('progress-section').style.display = 'none';
  }
});

function showError(message) {
  const errorSection = document.getElementById('error-section');
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorSection.style.display = 'block';
}
