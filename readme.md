
## Dev
```
set environment variables in config.js
const JM_API_URL = 'http://localhost:3000/api/v1/';
const JM_DASHBOARD_URL = 'http://localhost:8000/login.html';
const JM_DASHBOARD_URL_INDEX = 'http://localhost:8000/index.html';
const JM_EMAIL_DOMAIN='@dev.jinnmail.com'
run locally, 
python -m SimpleHTTPServer
```

## First Deployment
```
create new ubuntu 20.04 instance
sudo apt get
sudo apt install apache2
cd /var/www/html
sudo rm index.html
git clone x .
set environment variables
sudo vim config.js
same as in dev substitution prod values
follow certbot instructions for using https
https://certbot.eff.org/lets-encrypt/ubuntufocal-apache
```