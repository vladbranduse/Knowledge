from . import db
from flask_login import UserMixin


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)


class Courses(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    faculty = db.Column(db.String(255), nullable=False)


class MyCourses(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    course_id = db.Column(db.String(255), db.ForeignKey('courses.faculty'))


class Discipline(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    id_course = db.Column(db.String(255), db.ForeignKey('courses.id'))
    name = db.Column(db.String(255), nullable=False)
