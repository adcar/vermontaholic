from flask import Flask, request, render_template, redirect
from flask_login import login_required, current_user, login_user, logout_user
from userdb import Users, db, login

app = Flask(__name__)
app.secret_key = 'D9H7tVLEgL7#c5p'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db.init_app(app)
login.init_app(app)
login.login_view = 'login'

#Creates the database if one does not already exist
@app.before_first_request
def create_db():
    db.create_all()

#An endpoint I am using for testing
@app.route('/test')
@login_required
def testpage():
    return render_template('test.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        #Checks if the username already exists
        if Users.query.filter_by(username = username).first():
            return ('Username already in use') #this should be changed to a notification on the page

        user = Users(username = username)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return redirect('/login')
    else:
        return render_template('register.html') #this should send you to the registration page page

@app.route('/login', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = Users.query.filter_by(username = username).first()
        #Checks if the user exists and if the password is correct
        if user is not None and user.check_password(password):
            login_user(user)
            return redirect('/test') #this should send you to either the index page or a profile page
        else:
            return ("Login Failed") #this should be changed to a notification on the page
    else:
        return render_template('login.html') #this should send you to the login page

@app.route('/logout')
def logout():
    logout_user()
    return redirect('/login')

#app.run(host='localhost', port=5000)