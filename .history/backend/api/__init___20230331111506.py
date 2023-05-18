from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask import Flask, session
from flask_session import Session

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'memories'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

CORS(app, resources={r"*": {"origins": "*"}})  # Autoriser toutes les origines - à personnaliser pour plus de sécurité


import api.views
import api.models
import api.test
