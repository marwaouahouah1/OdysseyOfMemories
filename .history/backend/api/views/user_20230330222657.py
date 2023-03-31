from api import app,mysql
from api.models import *
from flask import request, jsonify


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

