# Voice-To-Markdown

> 🌐 [Español](#español) | [English](#english)

---

## Español

### Editor Markdown por Voz

Editor de Markdown controlado por voz con comandos en español e inglés y vista previa en tiempo real.

### Prerrequisitos

- Python 3.8+
- Flask
- Navegador web con soporte de SpeechRecognition (se recomienda Chrome)

### Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/edujbarrios/Voice-To-Markdown.git
cd Voice-To-Markdown
```

2. Instalar dependencias
```bash
pip install -r requirements.txt
```

### Ejecución

```bash
python main.py
```

Abrir en el navegador: http://localhost:5000

### Comandos de Voz (Español)

| Comando | Descripción |
|---------|-------------|
| "título 1-6" | Crear encabezado del nivel indicado |
| "subtítulo" / "título dos" | Crear encabezado nivel 2 |
| "apartado" / "título tres" | Crear encabezado nivel 3 |
| "punto y aparte" / "nuevo párrafo" | Crear nuevo párrafo |
| "bloque de código" / "código [lenguaje]" | Insertar bloque de código |
| "negrita" | Texto en negrita |
| "cursiva" | Texto en cursiva |
| "lista" | Crear elemento de lista |
| "enlace" | Insertar enlace |
| "cita" | Crear bloque de cita |
| "tabla" | Crear tabla |
| "fila" | Añadir fila a la tabla |

### Estructura del Proyecto

```
.
├── app.py                          # Aplicación Flask
├── main.py                         # Punto de entrada
├── requirements.txt                # Dependencias de Python
├── commands/
│   ├── __init__.py
│   ├── spanish_commands.py         # Definiciones de comandos en español
│   └── english_commands.py         # Definiciones de comandos en inglés
├── static/
│   ├── css/
│   │   └── style.css               # Estilos personalizados
│   ├── icons/
│   │   └── mic.svg                 # Ícono del micrófono
│   └── js/
│       ├── markdown_preview.js     # Vista previa con debounce
│       └── voice_recognition.js    # Control de comandos de voz
└── templates/
    └── index.html                  # Plantilla principal
```

### Contribuir

1. Hacer fork del repositorio
2. Crear una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Hacer commit de tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Hacer push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

Para reportar bugs o sugerir nuevas funcionalidades, por favor crear un issue en el repositorio.

---

## English

### Voice-Controlled Markdown Editor

A voice-controlled Markdown editor with Spanish and English commands and real-time preview.

### Prerequisites

- Python 3.8+
- Flask
- Web browser with SpeechRecognition support (Chrome recommended)

### Installation

1. Clone the repository
```bash
git clone https://github.com/edujbarrios/Voice-To-Markdown.git
cd Voice-To-Markdown
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

### Running the Application

```bash
python main.py
```

Open in browser: http://localhost:5000

### Voice Commands (English)

| Command | Description |
|---------|-------------|
| "title 1-6" | Create heading at the specified level |
| "subtitle" / "heading two" | Create heading level 2 |
| "section" / "heading three" | Create heading level 3 |
| "new paragraph" | Create new paragraph |
| "code block [language]" | Insert code block |
| "bold" | Bold text |
| "italic" | Italic text |
| "list" | Create list item |
| "link" | Insert link |
| "quote" | Create quote block |
| "table" | Create table |
| "row" | Add table row |

### Project Structure

```
.
├── app.py                          # Flask application
├── main.py                         # Entry point
├── requirements.txt                # Python dependencies
├── commands/
│   ├── __init__.py
│   ├── spanish_commands.py         # Spanish command definitions
│   └── english_commands.py         # English command definitions
├── static/
│   ├── css/
│   │   └── style.css               # Custom styles
│   ├── icons/
│   │   └── mic.svg                 # Microphone icon
│   └── js/
│       ├── markdown_preview.js     # Debounced preview functionality
│       └── voice_recognition.js    # Voice command control
└── templates/
    └── index.html                  # Main interface template
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

To report bugs or suggest new features, please create an issue in the repository.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
