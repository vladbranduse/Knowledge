from flask import Blueprint, render_template
from flask_login import login_required, login_user, current_user, logout_user
from .models import *

views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
def home():
    courses = Courses.query.all()
    return render_template('HomePage.html', user=current_user, courses=courses)


@views.route('/render_courses/<course_id>', methods=['GET', 'POST'])
@login_required
def render_courses(course_id):
    print(course_id)
    courses = Courses.query.filter_by(faculty=course_id)
    return render_template('courses.html', courses=courses, user=current_user)


@views.route('/render_perfil/<int:id>/<course_id>', methods=['GET', 'POST'])
def render_perfil(id, course_id):
    courses = Courses.query.filter_by(id=course_id).first()
    # photography = [
    #     "Adminstration science",
    #     "Political institutions",
    #     "Administration systems",
    #     "Accounting of public institutions",
    #     "Public management",
    #     "Public policies",
    #     "Strategical planning",
    #     "Public function",
    #     "Mechanisms and institutions of the European Union",
    #     "Ethics and deontology in public administration",
    #     "E - government"
    #
    # ]
    # for p in photography:
    #     new_p = Discipline(id_course=courses.id, name=p)
    #     db.session.add(new_p)
    #     db.session.commit()

    # photography = [
    #
    #     "Philosophy",
    #     "Communication sciences",
    #
    # ]
    # for p in photography:
    #     new_p = Courses(name=p, faculty="PCS")
    #     db.session.add(new_p)
    #     db.session.commit()

    disciplines = Discipline.query.filter_by(id_course=course_id)
    print(disciplines.first())
    return render_template('perfil.html', user=current_user, disciplines=disciplines, courses=courses)


@views.route('/render_perfil/<int:id>', methods=['GET', 'POST'])
def my_courses(id):
    return render_template('perfil.html', user=current_user)
# @views.errorhandler(404)
# def page_not_found(e):
#     return render_template("HomePage.html")