$ErrorActionPreference = 'Stop'

npm i
Set-Location .\backend
python -m pip install -r requirements.txt
python manage.py migrate
Set-Location ..