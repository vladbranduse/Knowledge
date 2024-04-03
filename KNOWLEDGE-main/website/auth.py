from flask import flash, Blueprint, request, render_template, redirect, url_for
from flask_login import login_required, login_user, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import re
from .models import User
from . import db

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('login-email')
        password = request.form.get('login-pass')
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash("Password incorrect!!", category='error')
                # App.js.document.getElementById('log_pass').style.borderBottom = '1px solid red'
        else:
            flash("Email does not exist!!", category='error')
            # App.js.document.getElementById('log_email').style.borderBottom = '1px solid red'
    return render_template('Login.html', user=current_user)


@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    regex_name = re.compile('[a-zA-Z0-9]{2,}')
    regex_email = re.compile('([a-zA-Z0-9_-]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{1,3})$')
    regex_pass = re.compile('[a-zA-Z0-9]{8,}')
    if request.method == 'POST':
        fullname = request.form.get('sign_username')
        email = request.form.get('sign_email')
        password = request.form.get('sign_pass')
        confirm_password = request.form.get('sign_pass_confirm')
        hash_pass = generate_password_hash(password, method='sha256')

        user_email = User.query.filter_by(email=email).first()
        if regex_name.match(fullname):
            if regex_email.match(email):
                if not user_email:
                    if regex_pass.match(password):
                        if password == confirm_password:
                            new_user = User(name=fullname, email=email, password=hash_pass)
                            db.session.add(new_user)
                            db.session.commit()
                            return redirect(url_for('auth.login'))
                        else:
                            flash('Passwords don\'t match!', category='error')
                    else:
                        flash('Password must:\n-Contain at least 8 characters;\n-Have letters and digits;', category='error')
                else:
                    flash('Email already exists!', category='error')
            else:
                flash('Please enter a valid email address!', category='error')
        else:
            flash('Name must have at least 2 characters [a-zA-Z]!', category='error')
    return render_template('sign.html', user=current_user)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@auth.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


@auth.errorhandler(500)
def page_not_found(e):
    return render_template("500.html"), 500
