# Welcome to SoundBook

This is a repo for new users getting started with Docker.

You can try it out using the following command.

## Techstack

- React
- Flask
- PostgreSQL
- Docker

## Instantiating database

In backend/app.py: line 7 make sure to update with updated user info.

## Building via Docker

First make sure you have both Docker Desktop and docker-compose

Build and run locally:

```
sudo docker-compose up
```

Open `http://localhost:3000` in your browser.

## Building Manually

open 3 terminal tabs:

### First tab will run db:

```
cd backend
python3
from app import db
db.create_all()
```

### Second tab will run server:

```
pip3 install pipenv
pipenv shell
pipenv install flask flask-sqlalchemy psycopg2 python-dotenv flask-cors
pipenv shell
flask run
```

### Third tab will run client:

```
cd frontend
npm start
```
