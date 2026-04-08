import secrets

from flask import Flask


def create_app():
    """Application factory for the Voice-To-Markdown Flask app."""
    app = Flask(__name__)
    app.secret_key = secrets.token_hex(32)

    from app.routes import main
    app.register_blueprint(main)

    return app
