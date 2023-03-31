# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/memories'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configure JWT
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to a secure secret key
jwt = JWTManager(app)

db = SQLAlchemy(app)

# Member model code here

# Signup route code here

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    member = Member.query.filter_by(email=data['email']).first()

    if not member:
        return jsonify({'message': 'Utilisateur non trouvé'}), 404

    if check_password_hash(member.password, data['password']):
        access_token = create_access_token(identity=member.id)
        return jsonify({
            'message': 'Connexion réussie',
            'access_token': access_token,
            'id': member.id,
            'name': member.name,
            'role': member.role
        }), 200
    else:
        return jsonify({'message': 'Mot de passe incorrect'}), 401

# Add a protected route
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    current_user = Member.query.get(current_user_id)
    return jsonify({'message': f'Bienvenue {current_user.name}!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
