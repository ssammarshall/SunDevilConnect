PY = python
PIP = $(PY) -m pip

frontend:
	npm install

backend:
	cd backend
	$(PIP) install -r requirements.txt
	$(PY) manage.py migrate
	cd ..


build: frontend backend