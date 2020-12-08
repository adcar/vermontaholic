from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import UserMixin, LoginManager

login = LoginManager()
db = SQLAlchemy()
bcrypt = Bcrypt()

class Users(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    hashed_pass = db.Column(db.String())

    def set_password(self,password):
        self.hashed_pass = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self,password):
        return bcrypt.check_password_hash(self.hashed_pass, password)

@login.user_loader
def load_user(id):
    return Users.query.get(int(id))