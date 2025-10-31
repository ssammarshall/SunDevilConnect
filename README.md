# **SunDevilConnect**

### **Clone repo**
```
git clone https://github.com/ssammarshall/SunDevilConnect
```

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
python manage.py migrate
```

### 5. Run backend
```
python manage.py runserver
```

## **Running the Frontend**
### 1. CD to Frontend folder
```
cd frontend/sundevil-connect
```
### 2. Run backend
see above

### 3. Set the proper URL
    in src/constants.js, there is a variable called backendURL. When the backend server was set up, it should say "Starting development server at http:// followed by a bunch of numbers. Set backendURL in the constants class to those numbers, including the periods and including the :8000 at the end (this should not be required during development. Do the entire IP address, but not the HTTP part). 

### 4. Run Frontend
```
npm run dev
```

### alternatively...
    Do steps 2 and 3 above
    Then click on frontend.bat in the main folder (Windows only)
    This will set up the frontend server
