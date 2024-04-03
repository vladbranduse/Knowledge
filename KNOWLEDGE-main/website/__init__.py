from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
password = 'aguiar2259'
password1 = 'aPL+s_qr,#Pr<3W'


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:{password}@localhost/knowledge+'
    app.config['SECRET_KEY'] = 'fwef ohfiwfhowe hf887687767#$%%$'
    db.init_app(app)

    from .views import views
    from .auth import auth

    from .models import User

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(ID):
        return User.query.get(int(ID))

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    return app
