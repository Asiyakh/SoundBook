FROM python:3.10

WORKDIR /app

COPY . /app

RUN pip3 install pipenv flask
RUN pip3 install flask flask-sqlalchemy psycopg2 python-dotenv flask-cors flask.cli

EXPOSE 3000

CMD ["pipenv", "run", "flask", "run", "--host", "0.0.0.0", "--port", "3000"]