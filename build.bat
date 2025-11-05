@echo off

npm i
python -m pip install -r backend\requirements.txt
python backend\manage.py migrate
