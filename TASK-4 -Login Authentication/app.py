from flask import Flask, render_template, request, redirect, url_for, session, flash
from bcrypt import hashpw, gensalt, checkpw

app = Flask(__name__)
app.secret_key = 'supersecretkey'


users = {}

# Home page 
@app.route('/')
def home():
    return render_template('home.html')


# Registration page 
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if username in users:
            flash('Username already exists!')
            return redirect(url_for('register'))

        hashed_password = hashpw(password.encode('utf-8'), gensalt())
        users[username] = hashed_password

        flash('Registration successful!')
        return redirect(url_for('login'))
    
    return render_template('register.html')


# Login page 
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if username not in users or not checkpw(password.encode('utf-8'), users[username]):
            flash('Invalid credentials!')
            return redirect(url_for('login'))
        
        session['username'] = username
        return redirect(url_for('secure_page'))
    
    return render_template('login.html')


# Secure page 
@app.route('/secure')
def secure_page():
    if 'username' not in session:
        return redirect(url_for('login'))
    
    return f"Welcome to the secure page, {session['username']}!"

# Logout 
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
