class VoiceController {
    constructor() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('SpeechRecognition API is not supported in this browser.');
            this.supported = false;
            return;
        }
        this.supported = true;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'es-ES';
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.isRecording = false;
        this.isRestarting = false;
        this.currentLanguage = 'es';
        this.commandFeedback = document.createElement('div');
        this.setupFeedback();
        this.setupRecognition();
    }

    /** Localized UI strings keyed by language. */
    t(key) {
        const strings = {
            es: {
                voiceOn: 'Reconocimiento de voz activado',
                voiceOff: 'Reconocimiento de voz desactivado',
                error: 'Error en reconocimiento',
                detected: 'Comando detectado',
                executed: 'Comando ejecutado',
                unsupported: 'El reconocimiento de voz no es compatible con este navegador',
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
        return (strings[this.currentLanguage] || strings.en)[key] || key;
    }

    setupFeedback() {
        this.commandFeedback.className = 'position-fixed bottom-0 start-50 translate-middle-x p-3';
        this.commandFeedback.style.zIndex = '1000';
        document.body.appendChild(this.commandFeedback);
    }

    /** Display a feedback toast. Uses textContent to prevent XSS. */
    showFeedback(message, isCommand = false) {
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

    setupRecognition() {
        this.recognition.onresult = (event) => {
            const result = event.results[event.results.length - 1];
            if (result.isFinal) {
                const command = result[0].transcript.toLowerCase().trim();
                this.showFeedback(`${this.t('detected')}: "${command}"`, false);
                this.processCommand(command);
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Recognition error:', event.error);
            this.showFeedback(`${this.t('error')}: ${event.error}`, false);
            if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                this.isRecording = false;
                document.getElementById('mic-button').classList.remove('active');
            }
        };

        this.recognition.onstart = () => {
            this.isRestarting = false;
            this.showFeedback(this.t('voiceOn'), true);
        };

        this.recognition.onend = () => {
            if (this.isRestarting) {
                // Language switch restart — start with new language
                this.isRestarting = false;
                try { this.recognition.start(); } catch (_) { /* already running */ }
            } else if (this.isRecording) {
                // Auto-restart continuous recognition
                try { this.recognition.start(); } catch (_) { /* already running */ }
            } else {
                this.showFeedback(this.t('voiceOff'), true);
            }
        };
    }

    processCommand(command) {
        const editor = document.getElementById('markdown-editor');
        const cursorPos = editor.selectionStart;
        let text = editor.value;
        let commandFound = false;

        const commandPatterns = this.currentLanguage === 'es'
            ? this.getSpanishPatterns()
            : this.getEnglishPatterns();

        for (const [key, pattern] of Object.entries(commandPatterns)) {
            const match = command.match(pattern.regex);
            if (match) {
                commandFound = true;
                const insertion = pattern.process ? pattern.process(match) : pattern.template;
                text = this.insertAtCursor(text, cursorPos, insertion);
                this.showFeedback(`${this.t('executed')}: ${key}`, true);
                break;
            }
        }

        // If not a known command, insert as normal text
        if (!commandFound) {
            text = this.insertAtCursor(text, cursorPos, ' ' + command + ' ');
        }

        editor.value = text;
        editor.focus();
        updatePreview();
    }

    /** Clamp heading level to valid Markdown range 1–6. */
    clampLevel(value) {
        const n = parseInt(value, 10);
        if (isNaN(n) || n < 1) return 1;
        if (n > 6) return 6;
        return n;
    }

    getSpanishPatterns() {
        return {
            subtitulo: {
                regex: /^(?:subtítulo|subtitulo|título dos|titulo dos|título 2|titulo 2)$/,
                template: '## '
            },
            apartado: {
                regex: /^(?:apartado|título tres|titulo tres|título 3|titulo 3)$/,
                template: '### '
            },
            titulo: {
                regex: /^(?:t[ií]tulo|encabezado|header)(?:\s+([1-6]))?$/,
                process: (match) => {
                    const level = this.clampLevel(match[1] || '1');
                    return '#'.repeat(level) + ' ';
                }
            },
            parrafo: {
                regex: /^(?:punto y aparte|nuevo párrafo|nuevo parrafo|párrafo nuevo|parrafo nuevo)$/,
                template: '\n\n'
            },
            codigo: {
                regex: /^(?:bloque de c[oó]digo|c[oó]digo)(?:\s+(?:en\s+)?(\w+))?$/,
                process: (match) => {
                    const lang = match[1] || '';
                    return `\n\`\`\`${lang}\n\n\`\`\`\n`;
                }
            },
            tabla: {
                regex: /^(?:tabla|crear tabla|insertar tabla)$/,
                template: '\n| Columna 1 | Columna 2 | Columna 3 |\n|-----------|-----------|------------|\n| Celda 1   | Celda 2   | Celda 3    |\n'
            },
            fila: {
                regex: /^(?:fila|nueva fila|agregar fila)$/,
                template: '\n| Celda 1   | Celda 2   | Celda 3    |'
            },
            negrita: {
                regex: /^(?:negrita|texto en negrita|resaltar)$/,
                template: '**texto en negrita**'
            },
            cursiva: {
                regex: /^(?:cursiva|texto en cursiva|it[aá]lica)$/,
                template: '*texto en cursiva*'
            },
            lista: {
                regex: /^(?:lista|elemento de lista|viñeta)$/,
                template: '\n- '
            },
            enlace: {
                regex: /^(?:enlace|link|hipervínculo)$/,
                template: '[texto del enlace](url)'
            },
            cita: {
                regex: /^(?:cita|citar|bloque de cita)$/,
                template: '\n> '
            }
        };
    }

    getEnglishPatterns() {
        return {
            subtitle: {
                regex: /^(?:subtitle|heading two|header 2|title two)$/,
                template: '## '
            },
            section: {
                regex: /^(?:section|heading three|header 3|title three)$/,
                template: '### '
            },
            title: {
                regex: /^(?:title|heading|header)(?:\s+([1-6]))?$/,
                process: (match) => {
                    const level = this.clampLevel(match[1] || '1');
                    return '#'.repeat(level) + ' ';
                }
            },
            paragraph: {
                regex: /^(?:paragraph|new paragraph|line break)$/,
                template: '\n\n'
            },
            code: {
                regex: /^(?:code block|code)(?:\s+(?:in\s+)?(\w+))?$/,
                process: (match) => {
                    const lang = match[1] || '';
                    return `\n\`\`\`${lang}\n\n\`\`\`\n`;
                }
            },
            table: {
                regex: /^(?:table|create table|insert table)$/,
                template: '\n| Column 1 | Column 2 | Column 3 |\n|-----------|-----------|------------|\n| Cell 1   | Cell 2   | Cell 3    |\n'
            },
            row: {
                regex: /^(?:row|new row|table row)$/,
                template: '\n| Cell 1   | Cell 2   | Cell 3    |'
            },
            bold: {
                regex: /^(?:bold|strong|bold text)$/,
                template: '**bold text**'
            },
            italic: {
                regex: /^(?:italic|italics|em|emphasized)$/,
                template: '*italic text*'
            },
            list: {
                regex: /^(?:list|bullet|list item)$/,
                template: '\n- '
            },
            link: {
                regex: /^(?:link|hyperlink)$/,
                template: '[link text](url)'
            },
            quote: {
                regex: /^(?:quote|blockquote|citation)$/,
                template: '\n> '
            }
        };
    }

    insertAtCursor(text, pos, insertion) {
        return text.slice(0, pos) + insertion + text.slice(pos);
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
        this.recognition.lang = this.currentLanguage === 'es' ? 'es-ES' : 'en-US';

        // Update UI elements
        document.querySelector('.current-lang').textContent = this.currentLanguage.toUpperCase();
        document.getElementById('spanish-commands').classList.toggle('d-none');
        document.getElementById('english-commands').classList.toggle('d-none');

        // Update bilingual UI text
        const commandsTitle = document.querySelector('.commands-title');
        commandsTitle.textContent = this.currentLanguage === 'es'
            ? 'Comandos de voz disponibles:'
            : 'Available voice commands:';

        const navTitle = document.querySelector('.navbar-brand');
        navTitle.textContent = this.currentLanguage === 'es'
            ? 'Editor Markdown por Voz'
            : 'Voice Markdown Editor';

        const saveBtn = document.querySelector('#save-button');
        if (saveBtn) {
            saveBtn.textContent = this.currentLanguage === 'es' ? 'Guardar' : 'Save';
        }

        const editor = document.getElementById('markdown-editor');
        editor.placeholder = this.currentLanguage === 'es'
            ? 'Comienza a escribir o usa comandos de voz...'
            : 'Start typing or use voice commands...';

        // Restart recognition if it's running, using flag to avoid double-start
        if (this.isRecording) {
            this.isRestarting = true;
            this.recognition.stop();
        }
    }

    toggleRecording() {
        if (!this.supported) {
            this.showFeedback(this.t('unsupported'), false);
            return;
        }

        if (this.isRecording) {
            this.isRecording = false;
            this.recognition.stop();
            document.getElementById('mic-button').classList.remove('active');
        } else {
            this.isRecording = true;
            this.recognition.start();
            document.getElementById('mic-button').classList.add('active');
        }
    }
}

const voiceController = new VoiceController();
