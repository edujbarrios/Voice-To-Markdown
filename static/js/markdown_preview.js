function updatePreview() {
    const markdownText = document.getElementById('markdown-editor').value;
    
    fetch('/preview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdown: markdownText })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('preview').innerHTML = data.html;
    })
    .catch(error => console.error('Error:', error));
}

function saveDocument() {
    const markdownText = document.getElementById('markdown-editor').value;
    const filename = prompt('Nombre del archivo:', 'documento.md');
    
    if (filename) {
        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                markdown: markdownText,
                filename: filename
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Documento guardado exitosamente');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}
