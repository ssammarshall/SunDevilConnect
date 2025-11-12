# **SunDevilConnect**

### **Clone repo**
```
git clone https://github.com/ssammarshall/SunDevilConnect
```

## **Setup and Installation**

### 1. Create a virtual environment
```
python -m venv venv

# Using Mac:
source venv/bin/activate

# OR using Windows:
# Command Prompt (CMD): venv\Scripts\activate.bat
# PowerShell: venv\Scripts\Activate.ps1
```

### 2. Install dependencies
```
# Using Makefile:
make build

# OR using Windows:
# Command Prompt (CMD): .\build.bat
# PowerShell: .\build.ps1
```

## **Run Project**

### 1. Run Backend
```
python ./backend/manage.py runserver
```

### 2. Run Frontend
```
npm run dev
```

## **Admin Panel**

### 1. Create superuser
```
python backend\manage.py createsuperuser
```

### 2. Log in to Admin Panel
Go to http://127.0.0.1:8000/admin

(This host and port may vary depending on your .env files)
