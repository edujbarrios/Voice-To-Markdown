# Voice-To-Markdown

> 🌐 [Read in English](../README.md)

Editor de Markdown controlado por voz con comandos en español e inglés y vista previa en tiempo real.

![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)
![Flask](https://img.shields.io/badge/flask-3.x-green.svg)

## Características

- 🎙️ **Voz a texto** — Dicta contenido usando la Web Speech API
- 🗣️ **Comandos de voz bilingües** — Soporte en español e inglés para formato Markdown
- ✍️ **Vista previa en tiempo real** — Visualiza el resultado renderizado mientras escribes o hablas
- 💾 **Descargar como `.md`** — Guarda tu trabajo como archivo Markdown
- 🌙 **Tema oscuro** — Bootstrap 5 en modo oscuro por defecto

## Prerrequisitos

- Python 3.8+
- Flask 3.x
- Navegador web con soporte de SpeechRecognition (se recomienda Chrome)

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/edujbarrios/Voice-To-Markdown.git
cd Voice-To-Markdown
```

2. Crear un entorno virtual (recomendado)

```bash
python -m venv venv
source venv/bin/activate   # Linux/macOS
venv\Scripts\activate      # Windows
```

3. Instalar dependencias

```bash
pip install -r requirements.txt
```

## Ejecución

```bash
python main.py
```

Abrir en el navegador: <http://localhost:5000>

## Comandos de Voz (Español)

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

## Estructura del Proyecto

```
.
├── main.py                             # Punto de entrada de la aplicación
├── requirements.txt                    # Dependencias de Python
├── app/
│   ├── __init__.py                     # Fábrica de la aplicación Flask
│   ├── routes.py                       # Definiciones de rutas (Blueprint)
│   ├── commands/
│   │   ├── __init__.py
│   │   ├── spanish_commands.py         # Definiciones de comandos en español
│   │   └── english_commands.py         # Definiciones de comandos en inglés
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css              # Estilos personalizados
│   │   ├── icons/
│   │   │   └── mic.svg               # Ícono del micrófono
│   │   └── js/
│   │       ├── markdown_preview.js    # Vista previa con debounce y guardado
│   │       └── voice_recognition.js   # Controlador de comandos de voz
│   └── templates/
│       └── index.html                  # Plantilla principal de la interfaz
├── docs/
│   └── README_ES.md                    # Esta documentación en español
├── tests/                              # Directorio de pruebas (futuro)
│   └── __init__.py
├── LICENSE
└── .gitignore
```

## Contribuir

1. Hacer fork del repositorio
2. Crear una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Hacer commit de tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Hacer push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

Para reportar bugs o sugerir nuevas funcionalidades, por favor crear un issue en el repositorio.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](../LICENSE) para más detalles.
