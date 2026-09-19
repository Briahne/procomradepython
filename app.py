import os
from flask import Flask, send_from_directory, request, jsonify

app = Flask(__name__, static_folder='.', static_url_path='')

# Dynamic database simulation matrix
user_database_ledger = {}

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/matrix/register', methods=['POST'])
def matrix_register():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '')
    avatar = data.get('avatar', 'm1')
    
    if not username or not password:
        return jsonify({"success": False, "msg": "🚨 Missing profile credentials, Comrade!"}), 400
        
    if username in user_database_ledger:
        # If user exists, attempt to log them in securely instead of wiping data
        if user_database_ledger[username]['password'] == password:
            return jsonify({
                "success": True, 
                "msg": "🔐 Welcome back to the matrix cell, Comrade!", 
                "user": {
                    "username": username,
                    "avatar": user_database_ledger[username]['avatar'],
                    "currentChapter": user_database_ledger[username]['currentChapter']
                }
            })
        else:
            return jsonify({"success": False, "msg": "🚨 INTRUSION ALERT: Incorrect security password payload!"}), 401

    # Register brand new crew account profile entry
    user_database_ledger[username] = {
        "password": password,
        "avatar": avatar,
        "currentChapter": 1
    }
    
    return jsonify({
        "success": True, 
        "msg": "🛰️ Profile registered securely inside the cloud matrix!",
        "user": {"username": username, "avatar": avatar, "currentChapter": 1}
    })

@app.route('/api/matrix/save_progress', methods=['POST'])
def save_progress():
    data = request.get_json() or {}
    username = data.get('username', '')
    chapter = data.get('chapter', 1)
    
    if username in user_database_ledger:
        user_database_ledger[username]['currentChapter'] = chapter
        return jsonify({"success": True, "msg": "💾 Ledger checkpoint progress synced with cloud server!"})
        
    return jsonify({"success": False, "msg": "🚨 Unknown user profile parameter structure!"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
