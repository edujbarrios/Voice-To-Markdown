class VoiceController {
    constructor() {
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        this.recognition.lang = 'es-ES';
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.isRecording = false;
        this.currentLanguage = 'es';
        this.commandFeedback = document.createElement('div');
        this.setupFeedback();
        this.setupRecognition();
    }

    setupFeedback() {
        this.commandFeedback.className = 'position-fixed bottom-0 start-50 translate-middle-x p-3';
        this.commandFeedback.style.zIndex = '1000';
        document.body.appendChild(this.commandFeedback);
    }

    showFeedback(message, isCommand = false) {
        const feedbackMessage = this.currentLanguage === 'es' ? message : this.translateFeedback(message);
        this.commandFeedback.innerHTML = `
            <div class="alert ${isCommand ? 'alert-success' : 'alert-info'} alert-dismissible fade show" role="alert">
                ${feedbackMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        setTimeout(() => {
            const alert = this.commandFeedback.querySelector('.alert');
            if (alert) {
                alert.remove();
            }
        }, 3000);
    }

    translateFeedback(message) {
        const translations = {
            'Reconocimiento de voz activado': 'Voice recognition activated',
            'Reconocimiento de voz desactivado': 'Voice recognition deactivated',
            'Error en reconocimiento': 'Recognition error',
            'Comando detectado': 'Command detected',
            'Comando ejecutado': 'Command executed'
        };

        for (const [es, en] of Object.entries(translations)) {
            if (message.includes(es)) {
                return message.replace(es, en);
            }
        }
        return message;
    }

    setupRecognition() {
        this.recognition.onresult = (event) => {
            const result = event.results[event.results.length - 1];
            if (result.isFinal) {
                const command = result[0].transcript.toLowerCase().trim();
                this.showFeedback(`Comando detectado: "${command}"`, false);
                this.processCommand(command);
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Error en reconocimiento:', event.error);
            this.showFeedback(`Error en reconocimiento: ${event.error}`, false);
        };

        this.recognition.onstart = () => {
            this.showFeedback('Reconocimiento de voz activado', true);
        };

        this.recognition.onend = () => {
            if (this.isRecording) {
                this.recognition.start();
            } else {
                this.showFeedback('Reconocimiento de voz desactivado', true);
            }
        };
    }

    processCommand(command) {
        const editor = document.getElementById('markdown-editor');
        const cursorPos = editor.selectionStart;
        let text = editor.value;
        let commandFound = false;

        const commandPatterns = this.currentLanguage === 'es' ? this.getSpanishPatterns() : this.getEnglishPatterns();

        // Process commands
        for (const [key, pattern] of Object.entries(commandPatterns)) {
            const match = command.match(pattern.regex);
            if (match) {
                commandFound = true;
                const insertion = pattern.process ? pattern.process(match) : pattern.template;
                text = this.insertAtCursor(text, cursorPos, insertion);
                this.showFeedback(`Comando ejecutado: ${key}`, true);
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

    getSpanishPatterns() {
        return {
            titulo: {
                regex: /título(\s+(\d))?|encabezado(\s+(\d))?/,
                process: (match) => {
                    const level = match[2] || match[4] || '1';
                    return '#'.repeat(parseInt(level)) + ' ';
                }
            },
            subtitulo: {
                regex: /subtítulo|título dos|título 2/,
                template: '## '
            },
            apartado: {
                regex: /apartado|título tres|título 3/,
                template: '### '
            },
            parrafo: {
                regex: /punto y aparte|nuevo párrafo|párrafo nuevo/,
                template: '\n\n'
            },
            codigo: {
                regex: /código(\s+en\s+)?(\w+)?|bloque de código(\s+en\s+)?(\w+)?/,
                process: (match) => {
                    const lang = match[2] || match[4] || '';
                    return `\n\`\`\`${lang}\n\n\`\`\`\n`;
                }
            },
            tabla: {
                regex: /tabla|crear tabla|insertar tabla/,
                template: '\n| Columna 1 | Columna 2 | Columna 3 |\n|-----------|-----------|------------|\n| Celda 1   | Celda 2   | Celda 3    |\n'
            },
            fila: {
                regex: /fila|nueva fila|agregar fila/,
                template: '\n| Celda 1   | Celda 2   | Celda 3    |'
            },
            negrita: {
                regex: /negrita|texto en negrita|resaltar/,
                template: '**texto en negrita**'
            },
            cursiva: {
                regex: /cursiva|texto en cursiva|itálica/,
                template: '*texto en cursiva*'
            },
            lista: {
                regex: /lista|elemento de lista|viñeta/,
                template: '\n- '
            },
            enlace: {
                regex: /enlace|link|hipervínculo/,
                template: '[texto del enlace](url)'
            },
            cita: {
                regex: /cita|citar|bloque de cita/,
                template: '\n> '
            }
        };
    }

    getEnglishPatterns() {
        return {
            title: {
                regex: /title(\s+(\d))?|heading(\s+(\d))?|header(\s+(\d))?/,
                process: (match) => {
                    const level = match[2] || match[4] || match[6] || '1';
                    return '#'.repeat(parseInt(level)) + ' ';
                }
            },
            subtitle: {
                regex: /subtitle|heading two|header 2|title two/,
                template: '## '
            },
            section: {
                regex: /section|heading three|header 3|title three/,
                template: '### '
            },
            paragraph: {
                regex: /paragraph|new paragraph|line break/,
                template: '\n\n'
            },
            code: {
                regex: /code(\s+in\s+)?(\w+)?|code block(\s+in\s+)?(\w+)?/,
                process: (match) => {
                    const lang = match[2] || match[4] || '';
                    return `\n\`\`\`${lang}\n\n\`\`\`\n`;
                }
            },
            table: {
                regex: /table|create table|insert table/,
                template: '\n| Column 1 | Column 2 | Column 3 |\n|-----------|-----------|------------|\n| Cell 1   | Cell 2   | Cell 3    |\n'
            },
            row: {
                regex: /row|new row|table row/,
                template: '\n| Cell 1   | Cell 2   | Cell 3    |'
            },
            bold: {
                regex: /bold|strong|bold text/,
                template: '**bold text**'
            },
            italic: {
                regex: /italic|italics|em/,
                template: '*italic text*'
            },
            list: {
                regex: /list|bullet|item/,
                template: '\n- '
            },
            link: {
                regex: /link|hyperlink|url/,
                template: '[link text](url)'
            },
            quote: {
                regex: /quote|blockquote|citation/,
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
        
        // Update title text
        const commandsTitle = document.querySelector('.commands-title');
        commandsTitle.textContent = this.currentLanguage === 'es' ? 
            'Comandos de voz disponibles:' : 
            'Available voice commands:';
            
        // Restart recognition if it's running
        if (this.isRecording) {
            this.recognition.stop();
            this.recognition.start();
        }
    }

    toggleRecording() {
        if (this.isRecording) {
            this.recognition.stop();
            this.isRecording = false;
            document.getElementById('mic-button').classList.remove('active');
        } else {
            this.recognition.start();
            this.isRecording = true;
            document.getElementById('mic-button').classList.add('active');
        }
    }
}

const voiceController = new VoiceController();
