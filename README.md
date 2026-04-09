# Voice-To-Markdown

> 🌐 [Leer en Español](docs/README_ES.md)

A voice-controlled Markdown editor with Spanish and English commands and real-time preview.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-18%2B-green.svg)

## Features

- 🎙️ **Voice-to-text** — Dictate content using the Web Speech API
- 🗣️ **Bilingual voice commands** — Spanish and English support for Markdown formatting
- ✍️ **Live Markdown preview** — See rendered output as you type or speak
- 💾 **Download as `.md`** — Save your work as a Markdown file
- 🌙 **Dark theme** — Bootstrap 5 dark mode by default

## Prerequisites

- Node.js 18+
- npm or yarn
- A web browser with SpeechRecognition support (Chrome recommended)

## Installation

1. Clone the repository

```bash
git clone https://github.com/edujbarrios/Voice-To-Markdown.git
cd Voice-To-Markdown
```

2. Install dependencies

```bash
npm install
```

3. Build the project

```bash
npm run build
```

## Running the Application

### Production

```bash
npm start
```

### Development

```bash
npm run dev
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
├── package.json                        # Node.js dependencies
├── tsconfig.json                       # TypeScript config (server)
├── tsconfig.client.json                # TypeScript config (client)
├── src/
│   ├── server/
│   │   ├── index.ts                    # Express server entry point
│   │   ├── routes.ts                   # API route definitions
│   │   └── commands/
│   │       ├── index.ts                # Commands barrel export
│   │       ├── englishCommands.ts      # English command definitions
│   │       └── spanishCommands.ts      # Spanish command definitions
│   ├── client/
│   │   ├── main.ts                     # Client entry point
│   │   ├── markdownPreview.ts          # Preview & save functions
│   │   └── voiceRecognition.ts         # Voice command controller
│   └── public/
│       ├── index.html                  # Main interface
│       ├── css/
│       │   └── style.css               # Custom styles
│       └── icons/
│           └── mic.svg                 # Microphone icon
├── dist/                               # Compiled output (gitignored)
├── docs/
│   └── README_ES.md                    # Documentación en español
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
