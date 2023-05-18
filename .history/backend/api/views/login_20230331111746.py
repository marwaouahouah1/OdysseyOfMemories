# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/memories'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)

@app.route('/login', methods=['POST'])
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

# Add a protected route
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    return jsonify({'message': f'Bienvenue {current_user.name}!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
