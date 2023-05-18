from api import app, mysql
from api.models import *
from flask import request, jsonify, session
from werkzeug.security import check_password_hash
from flask_cors import CORS

CORS(app)

@app.route("/Users")
def Users():  
    users = User.getAllUsers()
    return jsonify(users)


@app.route("/SignUpUser", methods=["POST"])
def signup():
    data = request.get_json()
    name = data["name"]
    email = data["email"]
    password = data["password"]
    role = "user"

    User.addUser(name, email, password, role)

    print("Route /SignUpUser enregistrée avec succès")

    return jsonify({"message": "Utilisateur créé avec succès"})

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        # Handle OPTIONS request
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return '', 200, headers
    else:
        # Handle POST request
        data = request.get_json()
        email = data.get('email', None)
        password = data.get('password', None)

        # Trouver l'utilisateur par email
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM members WHERE email = %s", (email,))
        user = cur.fetchone()
        cur.close()

        if not user:
            print("test 1")
            return jsonify({"message": "Utilisateur introuvable"}), 401
            

        # Vérifier le mot de passe
        if (data[]):
            print("test 2")
            return jsonify({"message": "Mot de passe incorrect"}), 401

        # Définir l'utilisateur connecté dans la session
        session["user"] = {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
        }

        return jsonify({
            "message": "Connexion réussie",
            "user": session["user"],
        })
