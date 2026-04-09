// Type definitions for Web Speech API (not fully typed in lib.dom.d.ts)
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

type Language = 'es' | 'en';

interface LocalizedStrings {
  voiceOn: string;
  voiceOff: string;
  error: string;
  detected: string;
  executed: string;
  unsupported: string;
}

type Strings = Record<Language, LocalizedStrings>;

interface CommandPattern {
  regex: RegExp;
  template?: string;
  process?: (match: RegExpMatchArray) => string;
}

type CommandPatterns = Record<string, CommandPattern>;

// Import updatePreview from markdownPreview
import { updatePreview } from './markdownPreview';

export class VoiceController {
  private supported: boolean = false;
  private recognition: SpeechRecognition | null = null;
  private isRecording: boolean = false;
  private isRestarting: boolean = false;
  private currentLanguage: Language = 'es';
  private commandFeedback: HTMLDivElement;

  private static readonly strings: Strings = {
    es: {
      voiceOn: 'Reconocimiento de voz activado',
      voiceOff: 'Reconocimiento de voz desactivado',
      error: 'Error en reconocimiento',
      detected: 'Comando detectado',
      executed: 'Comando ejecutado',
      unsupported:
        'El reconocimiento de voz no es compatible con este navegador',
    },
    en: {
      voiceOn: 'Voice recognition activated',
      voiceOff: 'Voice recognition deactivated',
      error: 'Recognition error',
      detected: 'Command detected',
      executed: 'Command executed',
      unsupported: 'Voice recognition is not supported in this browser',
    },
  };

  constructor() {
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    this.commandFeedback = document.createElement('div');

    if (!SpeechRecognitionClass) {
      console.warn('SpeechRecognition API is not supported in this browser.');
      this.supported = false;
      return;
    }

    this.supported = true;
    this.recognition = new SpeechRecognitionClass();
    this.recognition.lang = 'es-ES';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.setupFeedback();
    this.setupRecognition();
  }

  /** Get localized string by key */
  private t(key: keyof LocalizedStrings): string {
    return VoiceController.strings[this.currentLanguage][key] ?? key;
  }

  private setupFeedback(): void {
    this.commandFeedback.className =
      'position-fixed bottom-0 start-50 translate-middle-x p-3';
    this.commandFeedback.style.zIndex = '1000';
    document.body.appendChild(this.commandFeedback);
  }

  /** Display a feedback toast. Uses textContent to prevent XSS. */
  private showFeedback(message: string, isCommand: boolean = false): void {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${isCommand ? 'alert-success' : 'alert-info'} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn-close';
    closeBtn.setAttribute('data-bs-dismiss', 'alert');
    closeBtn.setAttribute('aria-label', 'Close');
    alertDiv.appendChild(closeBtn);

    this.commandFeedback.innerHTML = '';
    this.commandFeedback.appendChild(alertDiv);

    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 3000);
  }

  private setupRecognition(): void {
    if (!this.recognition) return;

    this.recognition.onresult = (event: SpeechRecognitionEvent): void => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        const command = result[0].transcript.toLowerCase().trim();
        this.showFeedback(`${this.t('detected')}: "${command}"`, false);
        this.processCommand(command);
      }
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent): void => {
      console.error('Recognition error:', event.error);
      this.showFeedback(`${this.t('error')}: ${event.error}`, false);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        this.isRecording = false;
        const micButton = document.getElementById('mic-button');
        micButton?.classList.remove('active');
      }
    };

    this.recognition.onstart = (): void => {
      this.isRestarting = false;
      this.showFeedback(this.t('voiceOn'), true);
    };

    this.recognition.onend = (): void => {
      if (!this.recognition) return;

      if (this.isRestarting) {
        // Language switch restart — start with new language
        this.isRestarting = false;
        try {
          this.recognition.start();
        } catch {
          /* already running */
        }
      } else if (this.isRecording) {
        // Auto-restart continuous recognition
        try {
          this.recognition.start();
        } catch {
          /* already running */
        }
      } else {
        this.showFeedback(this.t('voiceOff'), true);
      }
    };
  }

  private processCommand(command: string): void {
    const editor = document.getElementById(
      'markdown-editor'
    ) as HTMLTextAreaElement | null;
    if (!editor) return;

    const cursorPos = editor.selectionStart;
    let text = editor.value;
    let commandFound = false;

    const commandPatterns: CommandPatterns =
      this.currentLanguage === 'es'
        ? this.getSpanishPatterns()
        : this.getEnglishPatterns();

    for (const [key, pattern] of Object.entries(commandPatterns)) {
      const match = command.match(pattern.regex);
      if (match) {
        commandFound = true;
        const insertion = pattern.process
          ? pattern.process(match)
          : pattern.template ?? '';
        text = this.insertAtCursor(text, cursorPos, insertion);
        this.showFeedback(`${this.t('executed')}: ${key}`, true);
        break;
      }
    }

    // If not a known command, insert as normal text
    if (!commandFound) {
      text = this.insertAtCursor(text, cursorPos, ` ${command} `);
    }

    editor.value = text;
    editor.focus();
    updatePreview();
  }

  /** Clamp heading level to valid Markdown range 1–6. */
  private clampLevel(value: string): number {
    const n = parseInt(value, 10);
    if (isNaN(n) || n < 1) return 1;
    if (n > 6) return 6;
    return n;
  }

  private getSpanishPatterns(): CommandPatterns {
    return {
      subtitulo: {
        regex: /^(?:subtítulo|subtitulo|título dos|titulo dos|título 2|titulo 2)$/,
        template: '## ',
      },
      apartado: {
        regex: /^(?:apartado|título tres|titulo tres|título 3|titulo 3)$/,
        template: '### ',
      },
      titulo: {
        regex: /^(?:t[ií]tulo|encabezado|header)(?:\s+([1-6]))?$/,
        process: (match: RegExpMatchArray): string => {
          const level = this.clampLevel(match[1] ?? '1');
          return '#'.repeat(level) + ' ';
        },
      },
      parrafo: {
        regex: /^(?:punto y aparte|nuevo párrafo|nuevo parrafo|párrafo nuevo|parrafo nuevo)$/,
        template: '\n\n',
      },
      codigo: {
        regex: /^(?:bloque de c[oó]digo|c[oó]digo)(?:\s+(?:en\s+)?(\w+))?$/,
        process: (match: RegExpMatchArray): string => {
          const lang = match[1] ?? '';
          return `\n\`\`\`${lang}\n\n\`\`\`\n`;
        },
      },
      tabla: {
        regex: /^(?:tabla|crear tabla|insertar tabla)$/,
        template:
          '\n| Columna 1 | Columna 2 | Columna 3 |\n|-----------|-----------|------------|\n| Celda 1   | Celda 2   | Celda 3    |\n',
      },
      fila: {
        regex: /^(?:fila|nueva fila|agregar fila)$/,
        template: '\n| Celda 1   | Celda 2   | Celda 3    |',
      },
      negrita: {
        regex: /^(?:negrita|texto en negrita|resaltar)$/,
        template: '**texto en negrita**',
      },
      cursiva: {
        regex: /^(?:cursiva|texto en cursiva|it[aá]lica)$/,
        template: '*texto en cursiva*',
      },
      lista: {
        regex: /^(?:lista|elemento de lista|viñeta)$/,
        template: '\n- ',
      },
      enlace: {
        regex: /^(?:enlace|link|hipervínculo)$/,
        template: '[texto del enlace](url)',
      },
      cita: {
        regex: /^(?:cita|citar|bloque de cita)$/,
        template: '\n> ',
      },
    };
  }

  private getEnglishPatterns(): CommandPatterns {
    return {
      subtitle: {
        regex: /^(?:subtitle|heading two|header 2|title two)$/,
        template: '## ',
      },
      section: {
        regex: /^(?:section|heading three|header 3|title three)$/,
        template: '### ',
      },
      title: {
        regex: /^(?:title|heading|header)(?:\s+([1-6]))?$/,
        process: (match: RegExpMatchArray): string => {
          const level = this.clampLevel(match[1] ?? '1');
          return '#'.repeat(level) + ' ';
        },
      },
      paragraph: {
        regex: /^(?:paragraph|new paragraph|line break)$/,
        template: '\n\n',
      },
      code: {
        regex: /^(?:code block|code)(?:\s+(?:in\s+)?(\w+))?$/,
        process: (match: RegExpMatchArray): string => {
          const lang = match[1] ?? '';
          return `\n\`\`\`${lang}\n\n\`\`\`\n`;
        },
      },
      table: {
        regex: /^(?:table|create table|insert table)$/,
        template:
          '\n| Column 1 | Column 2 | Column 3 |\n|-----------|-----------|------------|\n| Cell 1   | Cell 2   | Cell 3    |\n',
      },
      row: {
        regex: /^(?:row|new row|table row)$/,
        template: '\n| Cell 1   | Cell 2   | Cell 3    |',
      },
      bold: {
        regex: /^(?:bold|strong|bold text)$/,
        template: '**bold text**',
      },
      italic: {
        regex: /^(?:italic|italics|em|emphasized)$/,
        template: '*italic text*',
      },
      list: {
        regex: /^(?:list|bullet|list item)$/,
        template: '\n- ',
      },
      link: {
        regex: /^(?:link|hyperlink)$/,
        template: '[link text](url)',
      },
      quote: {
        regex: /^(?:quote|blockquote|citation)$/,
        template: '\n> ',
      },
    };
  }

  private insertAtCursor(text: string, pos: number, insertion: string): string {
    return text.slice(0, pos) + insertion + text.slice(pos);
  }

  public toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';

    if (this.recognition) {
      this.recognition.lang = this.currentLanguage === 'es' ? 'es-ES' : 'en-US';
    }

    // Update UI elements
    const currentLang = document.querySelector('.current-lang');
    if (currentLang) {
      currentLang.textContent = this.currentLanguage.toUpperCase();
    }

    const spanishCommands = document.getElementById('spanish-commands');
    const englishCommands = document.getElementById('english-commands');
    spanishCommands?.classList.toggle('d-none');
    englishCommands?.classList.toggle('d-none');

    // Update bilingual UI text
    const commandsTitle = document.querySelector('.commands-title');
    if (commandsTitle) {
      commandsTitle.textContent =
        this.currentLanguage === 'es'
          ? 'Comandos de voz disponibles:'
          : 'Available voice commands:';
    }

    const navTitle = document.querySelector('.navbar-brand');
    if (navTitle) {
      navTitle.textContent =
        this.currentLanguage === 'es'
          ? 'Editor Markdown por Voz'
          : 'Voice Markdown Editor';
    }

    const saveBtn = document.querySelector('#save-button');
    if (saveBtn) {
      saveBtn.textContent = this.currentLanguage === 'es' ? 'Guardar' : 'Save';
    }

    const editor = document.getElementById(
      'markdown-editor'
    ) as HTMLTextAreaElement | null;
    if (editor) {
      editor.placeholder =
        this.currentLanguage === 'es'
          ? 'Comienza a escribir o usa comandos de voz...'
          : 'Start typing or use voice commands...';
    }

    // Restart recognition if it's running, using flag to avoid double-start
    if (this.isRecording && this.recognition) {
      this.isRestarting = true;
      this.recognition.stop();
    }
  }

  public toggleRecording(): void {
    if (!this.supported || !this.recognition) {
      this.showFeedback(this.t('unsupported'), false);
      return;
    }

    const micButton = document.getElementById('mic-button');

    if (this.isRecording) {
      this.isRecording = false;
      try {
        this.recognition.stop();
      } catch {
        /* not running */
      }
      micButton?.classList.remove('active');
    } else {
      try {
        this.recognition.start();
        this.isRecording = true;
        micButton?.classList.add('active');
      } catch (e) {
        this.isRecording = false;
        console.error('Failed to start recognition:', e);
        const error = e instanceof Error ? e.message : String(e);
        this.showFeedback(`${this.t('error')}: ${error}`, false);
      }
    }
  }

  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }
}
