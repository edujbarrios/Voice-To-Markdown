# Editor Markdown por Voz
# Voice-Controlled Markdown Editor

Editor de markdown controlado por voz con comandos en español y vista previa en tiempo real.
A voice-controlled Markdown editor with Spanish and English commands and real-time preview.

## Prerrequisitos / Prerequisites
- Python 3.8+
- Flask
- Web browser with SpeechRecognition support (Chrome recommended)

## Instalación / Installation
1. Clonar el repositorio / Clone the repository
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias / Install dependencies
```bash
pip install -r requirements.txt
```

## Ejecución / Running the Application
1. Iniciar el servidor Flask / Start the Flask server:
```bash
python main.py
```
2. Abrir en el navegador / Open in browser: http://localhost:5000

## Comandos de Voz Disponibles / Available Voice Commands

### Español / Spanish
- "título" - Crear encabezado nivel 1
- "subtítulo" o "título dos" - Crear encabezado nivel 2
- "apartado" o "título tres" - Crear encabezado nivel 3
- "punto y aparte" - Crear nuevo párrafo
- "bloque de código" - Insertar bloque de código
- "negrita" - Texto en negrita
- "cursiva" - Texto en cursiva
- "lista" - Crear elemento de lista
- "enlace" - Insertar enlace
- "cita" - Crear bloque de cita
- "tabla" - Crear tabla
- "fila" - Añadir fila a la tabla

### English
- "title" - Create heading level 1
- "subtitle" or "heading two" - Create heading level 2
- "section" or "heading three" - Create heading level 3
- "new paragraph" - Create new paragraph
- "code block" - Insert code block
- "bold" - Bold text
- "italic" - Italic text
- "list" - Create list item
- "link" - Insert link
- "quote" - Create quote block
- "table" - Create table
- "row" - Add table row

## Estructura del Proyecto / Project Structure
```
.
├── app.py              # Flask application / Aplicación Flask
├── main.py            # Entry point / Punto de entrada
├── commands/
│   ├── spanish_commands.py  # Spanish command definitions / Definiciones de comandos en español
│   └── english_commands.py  # English command definitions / Definiciones de comandos en inglés
├── static/
│   ├── css/
│   │   └── style.css       # Custom styles / Estilos personalizados
│   ├── icons/
│   │   └── mic.svg         # Microphone icon / Ícono del micrófono
│   └── js/
│       ├── markdown_preview.js    # Preview functionality / Funcionalidad de vista previa
│       └── voice_recognition.js   # Voice command control / Control de comandos de voz
└── templates/
    └── index.html     # Main interface template / Plantilla principal de la interfaz
```

## Contribuir / Contributing
1. Hacer fork del repositorio / Fork the repository
2. Crear una rama para tu funcionalidad / Create a feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Hacer commit de tus cambios / Commit your changes (`git commit -am 'Añade nueva funcionalidad'`)
4. Hacer push a la rama / Push to the branch (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request / Create a Pull Request

Para reportar bugs o sugerir nuevas funcionalidades, por favor crear un issue en el repositorio.
To report bugs or suggest new features, please create an issue in the repository.
