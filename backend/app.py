from flask import Flask, request, render_template, redirect, jsonify
from flask_login import login_required, current_user, login_user, logout_user
from userdb import Users, db, login, Locations, SummaryModel
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.debug = False
app.secret_key = 'D9H7tVLEgL7#c5p'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
login.init_app(app)
login.login_view = 'login'


# Creates the database if one does not already exist
@app.before_first_request
def create_db():
    db.create_all()

# An endpoint I am using for testing
@app.route('/test')
def testpage():
    dbentry = SummaryModel()
    username = 'bob'
    summary = 'This is a test'
    town = 'Panton'
    dbentry.user = username
    dbentry.location = town
    dbentry.summary = summary
    db.session.add(dbentry)
    db.session.commit()
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

        locationList.append({'name': row.name, 'isVisited': isVisited})
    return jsonify(locationList)


@app.route('/<user>/visit/<visitedTown>')
@login_required
def visitTown(user, visitedTown):
    town = Locations.query.filter_by(name=visitedTown).first()
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

@app.route('/<town>/summary/<username>', methods = ['GET', 'POST'])
@login_required
def summaries(town, username):
    if request.method == 'POST':
        summary = request.json['summary']
        dbentry = SummaryModel()
        dbentry.user = username
        dbentry.location = town
        dbentry.summary = summary
        db.session.add(dbentry)
        db.session.commit()
        return jsonify({'status': 'success', 'msg': 'Summary posted'})
    elif request.method == 'GET':
        summary = SummaryModel.query.filter_by(user = username, location = town).first()
        if summary == None:
            return jsonify({'Location': 'Unknown', 'Summary': 'None'})
        return jsonify({'Location': summary.location, 'Summary': summary.summary})

# app.run(host='localhost', port=5000)
