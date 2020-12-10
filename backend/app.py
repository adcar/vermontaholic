from flask import Flask, request, render_template, redirect, jsonify
from flask_login import login_required, current_user, login_user, logout_user
from userdb import Users, db, login, Locations
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.debug = True
app.secret_key = 'D9H7tVLEgL7#c5p'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db.init_app(app)
login.init_app(app)
login.login_view = 'login'


# Creates the database if one does not already exist
@app.before_first_request
def create_db():
    db.create_all()
    testLocation = Locations(location='Burlington')
    db.session.add(testLocation)
    db.session.commit()


# An endpoint I am using for testing
@app.route('/test')
@login_required
def testpage():
    return render_template('test.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    print("registering")
    if request.method == 'POST':
        print("was a post")
        username = request.json['username']
        password = request.json['password']
        print("pass " + password)

        # Checks if the username already exists
        if Users.query.filter_by(username=username).first():
            return jsonify({'status': 'error',
                            'msg': 'Username already taken'})

        user = Users(username=username)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'status': 'success', 'msg': 'Successfully registered', 'username': username})
    else:
        return jsonify({'status': 'error', 'msg': 'This endpoint only accepts POST requests'})


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']

        user = Users.query.filter_by(username=username).first()
        # Checks if the user exists and if the password is correct
        if user is not None and user.check_password(password):
            login_user(user)
            return jsonify({'status': 'success', 'msg': 'Successfully logged in', 'username': username})
        else:
            return jsonify(
                {'status': 'error', 'msg': 'Failed to login'})
    else:
        return jsonify({'status': 'error', 'msg': 'This endpoint only accepts POST requests'})


@app.route('/logout')
def logout():
    logout_user()
    return jsonify({'status': 'success', 'msg': 'Successfully logged out'})


@app.route('/towns/<user>', methods=['GET'])
def getVisitedTowns(user):
    rows = Locations.query.all()

    locationList = []
    for row in rows:
        if row.visitors == None:
            isVisited = False
        elif user in row.visitors:
            isVisited = True
        else:
            isVisited = False

        locationList.append({'name': row.location, 'isVisited': isVisited})
    return jsonify(locationList)


@app.route('/<user>/visit/<visitedTown>')
# @login_required #disabled for testing purposes
def visitTown(user, visitedTown):
    town = Locations.query.filter_by(location=visitedTown).first()
    if town == None:
        return jsonify({'status': 'failure', 'msg': 'Town not Found'})

    if town.visitors != None:
        visitorString = town.visitors
        visitorString = visitorString + ',' + user
    else:
        visitorString = user

    town.visitors = visitorString
    db.session.add(town)
    db.session.commit()

    return jsonify({'status': 'success', 'msg': 'Successfully visited town'})

# app.run(host='localhost', port=5000)
