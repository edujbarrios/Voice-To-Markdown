let previewTimer = null;

function updatePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => {
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
        .catch(error => console.error('Preview error:', error));
    }, 300);
}

function saveDocument() {
    const markdownText = document.getElementById('markdown-editor').value;
    const lang = typeof voiceController !== 'undefined' ? voiceController.currentLanguage : 'en';
    const defaultName = lang === 'es' ? 'documento.md' : 'document.md';
    const promptLabel = lang === 'es' ? 'Nombre del archivo:' : 'File name:';
    const filename = prompt(promptLabel, defaultName);

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
        .then(response => {
            if (!response.ok) {
                throw new Error('Save failed');
            }
            return response.blob();
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Save error:', error));
    }
}
