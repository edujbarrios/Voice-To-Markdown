# Voice-To-Markdown

> 🌐 [Leer en Español](docs/README_ES.md)

A voice-controlled Markdown editor with Spanish and English commands and real-time preview.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)
![Flask](https://img.shields.io/badge/flask-3.x-green.svg)

## Features

- 🎙️ **Voice-to-text** — Dictate content using the Web Speech API
- 🗣️ **Bilingual voice commands** — Spanish and English support for Markdown formatting
- ✍️ **Live Markdown preview** — See rendered output as you type or speak
- 💾 **Download as `.md`** — Save your work as a Markdown file
- 🌙 **Dark theme** — Bootstrap 5 dark mode by default

## Prerequisites

- Python 3.8+
- Flask 3.x
- A web browser with SpeechRecognition support (Chrome recommended)

## Installation

1. Clone the repository

```bash
git clone https://github.com/edujbarrios/Voice-To-Markdown.git
cd Voice-To-Markdown
```

2. Create a virtual environment (recommended)

```bash
python -m venv venv
source venv/bin/activate   # Linux/macOS
venv\Scripts\activate      # Windows
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

## Running the Application

```bash
python main.py
```

Open in your browser: <http://localhost:5000>

## Voice Commands (English)

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

## Project Structure

```
.
├── main.py                             # Application entry point
├── requirements.txt                    # Python dependencies
├── app/
│   ├── __init__.py                     # Flask app factory
│   ├── routes.py                       # Route definitions (Blueprint)
│   ├── commands/
│   │   ├── __init__.py
│   │   ├── spanish_commands.py         # Spanish command definitions
│   │   └── english_commands.py         # English command definitions
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css              # Custom styles
│   │   ├── icons/
│   │   │   └── mic.svg               # Microphone icon
│   │   └── js/
│   │       ├── markdown_preview.js    # Debounced preview & save
│   │       └── voice_recognition.js   # Voice command controller
│   └── templates/
│       └── index.html                  # Main interface template
├── docs/
│   └── README_ES.md                    # Documentación en español
├── tests/                              # Test directory (future)
│   └── __init__.py
├── LICENSE
└── .gitignore
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

To report bugs or suggest new features, please create an issue in the repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
