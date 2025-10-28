# **SunDevilConnect**

## **Backend Installation**
### 1. CD to backend
```
cd backend
```

### 2. Create a virtual environment
```
python -m venv venv

# Using Mac:
source venv/bin/activate

# OR using Windows:
# Command Prompt (CMD): venv\Scripts\activate.bat
# PowerShell: venv\Scripts\Activate.ps1
```

### 3. Install dependencies
```
pip install -r requirements.txt
```

### 4. Run migrations
```
python manage.py makemigrations
python manage.py migrate
```

### 5. Run backend
```
python manage.py runserver
```
