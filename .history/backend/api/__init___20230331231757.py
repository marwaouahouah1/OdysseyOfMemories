from flask import Flask
from flask_mysqldb import MySQL
from flask import Flask, session, request, jsonify
from flask_session import Session
from flask_cors import CORS

app = Flask(__name__)

if __name__ == '__main__':
    app.run()

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'memories'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

# Configure CORS pour accepter les requêtes depuis votre application React
CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})

# Configurez la clé secrète pour la session et les cookies
app.secret_key = "odysseyofmemories"  # Changez ceci en une clé secrète sûre et unique

# Configurez Flask-Session
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@



import api.views
import api.models
import api.test
