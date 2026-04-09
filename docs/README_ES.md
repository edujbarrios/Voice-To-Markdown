# Voice-To-Markdown

> 🌐 [Read in English](../README.md)

Editor de Markdown controlado por voz con comandos en español e inglés y vista previa en tiempo real.

![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-18%2B-green.svg)

## Características

- 🎙️ **Voz a texto** — Dicta contenido usando la Web Speech API
- 🗣️ **Comandos de voz bilingües** — Soporte en español e inglés para formato Markdown
- ✍️ **Vista previa en tiempo real** — Visualiza el resultado renderizado mientras escribes o hablas
- 💾 **Descargar como `.md`** — Guarda tu trabajo como archivo Markdown
- 🌙 **Tema oscuro** — Bootstrap 5 en modo oscuro por defecto

## Prerrequisitos

- Node.js 18+
- npm o yarn
- Navegador web con soporte de SpeechRecognition (se recomienda Chrome)

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/edujbarrios/Voice-To-Markdown.git
cd Voice-To-Markdown
```

2. Instalar dependencias

```bash
npm install
```

3. Compilar el proyecto

```bash
npm run build
```

## Ejecución

### Producción

```bash
npm start
```

### Desarrollo

```bash
npm run dev
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
├── package.json                        # Dependencias de Node.js
├── tsconfig.json                       # Configuración TypeScript (servidor)
├── tsconfig.client.json                # Configuración TypeScript (cliente)
├── src/
│   ├── server/
│   │   ├── index.ts                    # Punto de entrada del servidor Express
│   │   ├── routes.ts                   # Definiciones de rutas API
│   │   └── commands/
│   │       ├── index.ts                # Exportación barrel de comandos
│   │       ├── englishCommands.ts      # Definiciones de comandos en inglés
│   │       └── spanishCommands.ts      # Definiciones de comandos en español
│   ├── client/
│   │   ├── main.ts                     # Punto de entrada del cliente
│   │   ├── markdownPreview.ts          # Funciones de vista previa y guardado
│   │   └── voiceRecognition.ts         # Controlador de comandos de voz
│   └── public/
│       ├── index.html                  # Interfaz principal
│       ├── css/
│       │   └── style.css               # Estilos personalizados
│       └── icons/
│           └── mic.svg                 # Ícono del micrófono
├── dist/                               # Salida compilada (ignorada en git)
├── docs/
│   └── README_ES.md                    # Esta documentación en español
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
