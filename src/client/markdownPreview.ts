let previewTimer: ReturnType<typeof setTimeout> | null = null;

export function updatePreview(): void {
  if (previewTimer !== null) {
    clearTimeout(previewTimer);
  }

  previewTimer = setTimeout(async () => {
    const editor = document.getElementById(
      'markdown-editor'
    ) as HTMLTextAreaElement | null;
    const preview = document.getElementById('preview');

    if (!editor || !preview) return;

    const markdownText = editor.value;

    try {
      const response = await fetch('/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdown: markdownText }),
      });

      const data = (await response.json()) as { html: string };
      preview.innerHTML = data.html;
    } catch (error) {
      console.error('Preview error:', error);
    }
  }, 300);
}

export function saveDocument(getCurrentLanguage: () => 'es' | 'en'): void {
  const editor = document.getElementById(
    'markdown-editor'
  ) as HTMLTextAreaElement | null;

  if (!editor) return;

  const markdownText = editor.value;
  const lang = getCurrentLanguage();
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
        filename: filename,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Save failed');
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      })
      .catch((error) => console.error('Save error:', error));
  }
}
