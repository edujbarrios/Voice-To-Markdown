SPANISH_COMMANDS = {
    'titulo': {
        'aliases': ['título', 'encabezado', 'header'],
        'template': '# {}',
        'description': 'Crear un encabezado'
    },
    'subtitulo': {
        'aliases': ['subtítulo', 'título dos', 'título 2'],
        'template': '## {}',
        'description': 'Crear un subtítulo'
    },
    'apartado': {
        'aliases': ['título tres', 'título 3'],
        'template': '### {}',
        'description': 'Crear un apartado'
    },
    'parrafo': {
        'aliases': ['punto y aparte', 'nuevo párrafo'],
        'template': '\n\n{}',
        'description': 'Crear nuevo párrafo'
    },
    'codigo': {
        'aliases': ['bloque de codigo', 'código'],
        'template': '\n```{}\n{}\n```\n',
        'description': 'Crear bloque de código con lenguaje opcional'
    },
    'tabla': {
        'aliases': ['crear tabla', 'insertar tabla'],
        'template': '\n| Columna 1 | Columna 2 | Columna 3 |\n|-----------|-----------|------------|\n| Celda 1   | Celda 2   | Celda 3    |\n',
        'description': 'Crear una tabla'
    },
    'fila': {
        'aliases': ['nueva fila', 'fila tabla'],
        'template': '| Celda 1   | Celda 2   | Celda 3    |',
        'description': 'Añadir fila a la tabla'
    },
    'negrita': {
        'aliases': ['bold', 'fuerte'],
        'template': '**{}**',
        'description': 'Texto en negrita'
    },
    'cursiva': {
        'aliases': ['italic', 'italica'],
        'template': '*{}*',
        'description': 'Texto en cursiva'
    },
    'lista': {
        'aliases': ['list', 'item'],
        'template': '- {}',
        'description': 'Elemento de lista'
    },
    'enlace': {
        'aliases': ['link', 'url'],
        'template': '[{}](url)',
        'description': 'Insertar enlace'
    },
    'cita': {
        'aliases': ['quote', 'blockquote'],
        'template': '> {}',
        'description': 'Bloque de cita'
    }
}
