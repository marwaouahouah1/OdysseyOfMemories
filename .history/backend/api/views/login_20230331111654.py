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
