from flask.cli import FlaskGroup

from app import app
from app import db


cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.create_all()


if __name__ == "__main__":
    cli()
