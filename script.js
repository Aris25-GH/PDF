document.getElementById('display-button').addEventListener('click', async () => {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    const displayDiv = document.getElementById('document-display');
    const printButton = document.getElementById('print-button');

    if (!file) {
        alert('Please upload a document.');
        return;
    }

    // Clear previous display content
    displayDiv.innerHTML = '';

    // Read the file content
    const reader = new FileReader();
    
    reader.onload = (e) => {
        // Display the document content
        displayDiv.innerHTML = `<pre>${e.target.result}</pre>`;
        displayDiv.classList.remove('hidden');
        printButton.classList.remove('hidden');
    };

    reader.readAsText(file); // For simplicity, reading as text
});

document.getElementById('print-button').addEventListener('click', () => {
    const documentDisplay = document.getElementById('document-display');
    
    if (documentDisplay.innerHTML) {
        // Open a new window for printing
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(documentDisplay.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close(); // Close the document for writing
        printWindow.print(); // Open the print dialog
        printWindow.close(); // Close the print window
    } else {
        alert('Nothing to print.');
    }
});
