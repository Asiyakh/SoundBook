# Welcome to SoundBook

This is a repo for new users getting started with Docker.

You can try it out using the following command.

# Building via Docker

Build and run:

```
sudo docker-compose up -d --build
sudo docker-compose up
```

Open `http://localhost:5000` in your browser.

# Building Manually

open 3 terminal tabs:

## First tab will run db:

```
cd backend
python3
from app import db
db.create_all()
```

## Second tab will run server:

```
pip3 install pipenv
pipenv shell
pipenv install flask flask-sqlalchemy psycopg2 python-dotenv flask-cors
flask run
```

## Third tab will run client:

```
cd frontend
npm start
```
