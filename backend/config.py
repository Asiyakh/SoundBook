import os


basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://asiyakhan:password@localhost/soundBook"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
