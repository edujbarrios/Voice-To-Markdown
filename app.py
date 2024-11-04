from flask import Flask, render_template, request, jsonify, session
import markdown2
import os

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

@app.route('/')
def index():
    return render_template('index.html')

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
    filename = request.json.get('filename', 'documento.md')
    # In a real app, you'd want to save this to a proper storage system
    return jsonify({'success': True, 'message': 'Documento guardado'})
