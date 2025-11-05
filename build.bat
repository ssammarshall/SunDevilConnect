@echo off

CALL npm i
CALL python -m pip install -r backend\requirements.txt
CALL python backend\manage.py migrate