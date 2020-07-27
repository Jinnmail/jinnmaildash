
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
sudo git clone x .
set environment variables
sudo vim config.js
for DNS you need to use the subdomain account.jinnmail.com because there is a 
link from jinnmail.com/account to get to your account from https://get.jinnmail.com/private-temporary-email/
you also need a DNS redirect rule 301 from jinnmail.com/account to account.jinnmail.com/index.html
this website lives on subdomain account.jinnmail.com
set environment variables accordingly
same as in dev substitution prod values
const JM_API_URL = 'http://<api>/api/v1/';
const JM_DASHBOARD_URL = 'https://account.jinnmail.com/login.html';
const JM_DASHBOARD_URL_INDEX = 'https://jinnmail.com/account';
const JM_EMAIL_DOMAIN='@dev.jinnmail.com'
sudo service apache2 restart
follow certbot instructions for using https and use account.jinnmail.com
https://certbot.eff.org/lets-encrypt/ubuntufocal-apache
```

## Subsequent Deployments
```

```