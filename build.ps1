$ErrorActionPreference = 'Stop'

npm i
Set-Location .\backend
Copy-Item .env.example .env
python -m pip install -r requirements.txt
python manage.py migrate
Set-Location ..