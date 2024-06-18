# How to start the server

- navigate to the `SkSy-backend` directory
- make sure to have `pipenv` installed
- run `pipenv install` to create the virtual environment and install dependencies
- run `pipenv shell` to activate the virtual environment
<!-- - run `pipenv --venv` to get the path to your venv, then (in vs-code) search for 'select python interpreter' in the command palette and paste `YOURPATH/bin/python` on macos or `YOURPATH\bin\python` on windows (??) -->

- run `python manage.py runserver` to start the development server

# Access to Django Admin Portal

- go to /admin
- Username: admin
- Password: password

# install spacy language model

- python3 -m spacy download de_core_news_sm

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# How i set up the project:

## 1. step: I created a virtual environment:

There are multiple ways to install a venv, I chose to do it with `pipenv`

(note: python3 or pip3 is used on macos, on windows/linux it might be different)

a) manually:

- `python3 -m venv venv`
- `source venv/bin/activate`
- `deactivate`

b) with pipenv ( = also a dependency manager):

- `pip3 install pipenv` if you don't have pipenv installed
- `pipenv install django`
- `pipenv shell` to start the venv

## 2. step: I create the django project:

- `django-admin startproject sksy_backend .` to create a django project in the current directory
