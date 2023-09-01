3 tabs:

1 run backend:
pip3 install pipenv
pipenv shell
pipenv install flask flask-sqlalchemy psycopg2 python-dotenv flask-cors

2 run postgrs:
cd backend
python3
from app import db
db.create_all()

3 frontend:
npm start
