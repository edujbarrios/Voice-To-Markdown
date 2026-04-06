import secrets

from flask import Flask, make_response, render_template, request, jsonify
import markdown2

from commands.spanish_commands import SPANISH_COMMANDS
from commands.english_commands import ENGLISH_COMMANDS

app = Flask(__name__)
app.secret_key = secrets.token_hex(32)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/commands/<language>')
def get_commands(language):
    """Return command definitions for the requested language."""
    if language == 'es':
        return jsonify(SPANISH_COMMANDS)
    elif language == 'en':
        return jsonify(ENGLISH_COMMANDS)
    return jsonify({'error': 'Unsupported language'}), 400


@app.route('/preview', methods=['POST'])
def preview():
    markdown_text = request.json.get('markdown', '')
    html_content = markdown2.markdown(markdown_text, extras=[
        'fenced-code-blocks',
        'tables',
        'code-friendly',
        'break-on-newline'
    ])
    return jsonify({'html': html_content})


@app.route('/save', methods=['POST'])
def save():
    markdown_text = request.json.get('markdown', '')
    filename = request.json.get('filename', 'document.md')

    if not filename.endswith('.md'):
        filename += '.md'

    response = make_response(markdown_text)
    response.headers['Content-Type'] = 'text/markdown; charset=utf-8'
    response.headers['Content-Disposition'] = f'attachment; filename="{filename}"'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    return response
