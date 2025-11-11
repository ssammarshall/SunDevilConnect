@echo off

CALL npm i
copy backend\.env.example backend\.env
CALL python -m pip install -r backend\requirements.txt
CALL python backend\manage.py migrate