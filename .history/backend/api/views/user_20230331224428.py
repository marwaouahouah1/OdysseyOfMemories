from api import app, mysql
from api.models import *
from flask import request, jsonify, session
from werkzeug.security import check_password_hash
from flask import Flask, jsonify, request

app = Flask(__name__)

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
        # Your login code here
        return jsonify({'status': 'success'}), 200, {'Access-Control-Allow-Origin': '*'}

if __name__ == '__main__':
    app.run()

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
    data = request.get_json()
    email = data.get('email', None)
    password = data.get('password', None)

    # Trouver l'utilisateur par email
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM members WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()

    if not user:
        return jsonify({"message": "Utilisateur introuvable"}), 401

    # Vérifier le mot de passe
    if not check_password_hash(user["password"], password):
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

@app.route('/is_logged_in')
def is_logged_in():
    if "user" in session:
        return jsonify({"is_logged_in": True, "user": session["user"]})
    else:
        return jsonify({"is_logged_in": False})

@app.route('/logout')
def logout():
    session.pop("user", None)
    return jsonify({"message": "Déconnexion réussie"})

