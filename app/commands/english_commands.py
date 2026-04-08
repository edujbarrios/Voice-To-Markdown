ENGLISH_COMMANDS = {
    'title': {
        'aliases': ['heading', 'header'],
        'template': '# {}',
        'description': 'Create a heading'
    },
    'subtitle': {
        'aliases': ['title two', 'heading two', 'header 2'],
        'template': '## {}',
        'description': 'Create a subtitle'
    },
    'section': {
        'aliases': ['title three', 'heading three', 'header 3'],
        'template': '### {}',
        'description': 'Create a section'
    },
    'paragraph': {
        'aliases': ['new paragraph', 'line break'],
        'template': '\n\n{}',
        'description': 'Create new paragraph'
    },
    'code': {
        'aliases': ['code block', 'codeblock'],
        'template': '\n```{}\n{}\n```\n',
        'description': 'Create code block with optional language'
    },
    'table': {
        'aliases': ['create table', 'insert table'],
        'template': '\n| Column 1 | Column 2 | Column 3 |\n|-----------|-----------|------------|\n| Cell 1   | Cell 2   | Cell 3    |\n',
        'description': 'Create a table'
    },
    'row': {
        'aliases': ['new row', 'table row'],
        'template': '| Cell 1   | Cell 2   | Cell 3    |',
        'description': 'Add row to table'
    },
    'bold': {
        'aliases': ['strong', 'bold text'],
        'template': '**{}**',
        'description': 'Bold text'
    },
    'italic': {
        'aliases': ['italics', 'em'],
        'template': '*{}*',
        'description': 'Italic text'
    },
    'list': {
        'aliases': ['bullet', 'item'],
        'template': '- {}',
        'description': 'List item'
    },
    'link': {
        'aliases': ['hyperlink', 'url'],
        'template': '[{}](url)',
        'description': 'Insert link'
    },
    'quote': {
        'aliases': ['blockquote', 'citation'],
        'template': '> {}',
        'description': 'Quote block'
    }
}
