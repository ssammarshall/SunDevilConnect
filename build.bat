@echo off

npm i
cd .\backend
python -m pip install -r requirements.txt
python manage.py migrate
cd ..