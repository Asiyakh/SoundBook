from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql+psycopg2://asiyakhan:password@localhost/soundBook'
db = SQLAlchemy(app)  # db intitialized here
CORS(app)
app.app_context().push()


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    audio = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"Event: {self.description}"

    def __init__(self, description):
        self.description = description


def format_event(event):
    return {
        "description": event.description,
        "audio": event.sound,
        "id": event.id,
        "created_at": event.created_at
    }


@app.route("/")
def hello():
    return "hey!"

# add a new audio


@app.route("/event", methods=["POST"])
def create_event():
    description = request.json["description"]
    event = Event(description)
    db.session.add(event)
    db.session.commit()
    return format_event(event)

# see all audios


@app.route("/event", methods=["GET"])
def get_events():
    events = Event.query.order_by(Event.id.asc()).all()
    event_list = []
    for event in events:
        event_list.append(format_event(event))
    return {'events': event_list}

# see single audio


@app.route("/event/<id>", methods=["GET"])
def get_event(id):
    event = Event.query.filter_by(id=id).one()
    formatted_event = format_event(event)
    return {'events': formatted_event}

# delete an audio


@app.route("/event/<id>", methods=["DELETE"])
def delete_event(id):
    event = Event.query.filter_by(id=id).one()
    audioName = event.description
    db.session.delete(event)
    db.session.commit()
    return f"{audioName} deleted!"


if __name__ == "__main__":
    app.run()
