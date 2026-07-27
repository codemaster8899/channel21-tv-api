#  21TV NODE API

## Before Using
<br />        

Please make sure that you have:

* [node.js](https://nodejs.org/)  installed
* Have [mongodb](https://www.mongodb.com/) installed and running locally 

<br />

## Getting started
<br />

* git clone [repo name](https://github.com/arnologyllc/21tv-backend-node-express.git). Clone this repo
* `npm install` to install all required dependencies 
* `npm run start` to start the local server or `npm run dev` to start th local server with nodemon
 
<br />

## Code Overview
<br />

*   [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
*   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
*   [validator](https://github.com/validatorjs/validator.js) - A library of string validators and sanitizers.
*   [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
*   [cors](https://github.com/expressjs/cors) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
*   [multer](https://github.com/expressjs/multer) - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
*   [aws-sdk](https://github.com/aws/aws-sdk-js) - The AWS SDK for JavaScript v3 API Reference Guide provides a JavaScript API for AWS services.
*   [nodemailer](https://github.com/nodemailer/nodemailer)  - Nodemailer is a module for Node.js applications to allow easy as cake email sending
*   [nodemailer-smtp-transport](https://github.com/nodemailer/nodemailer-smtp-transport)- SMTP is the main transport in Nodemailer for delivering messages
*   [rrule](https://github.com/jakubroztocil/rrule) - Library for working with recurrence rules for calendar dates.

<br />

## Application Structure
<br />

* `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
* `controller/` - Controllers are responsible for handling incoming requests and returning responses to the client.
* ` model/` - This folder contains the schema definitions for our Mongoose models.
* `routes/` - This folder contains the route definitions for our API.
* `utils/` - This folder contains additional functions.
* `middlewares` - The middleware in node. js is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle.

<br />  

## Amazon S3 Node.js 
<br />

The following topics show examples of how the AWS SDK for JavaScript can be used to interact with Amazon S3 buckets using Node.js.

**Topics**

* [Creating and Using Amazon S3 Buckets](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html)
* [Configuring Amazon S3 Buckets](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-configuring-buckets.html)
* [Managing Amazon S3 Bucket Access Permissions](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-access-permissions.html)
* [Working with Amazon S3 Bucket Policies](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-bucket-policies.html)
* [Using an Amazon S3 Bucket as a Static Web Host](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-static-web-host.html)

<br />

 Import it in your code at the top of the file you’re going to add this file upload to S3 functionality
<br />

```
const S3 = require('aws-sdk/clients/s3')
```
<br />

Next, use the SDK to create an instance of the S3 object. I assign it to a s3 variable 
<br />

```
const s3 = new S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_S3_REGION,
    acl: 'public-read',
  });
```
<br />

Create Params for s3
<br />


```
const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: file.filename,
    Body: fileStream
  };
```
<br />

 Make a call to s3.upload() and call its .promise() method so you can use await to wait until it finishes to get the uploaded file object:
<br />

```
const awsResponse = await s3.upload(params).promise()
```
<br />

## Zoho SMTP ( send mail)
<br />

### Configuration 


* Create Zoho [account](https://www.zoho.com/). <br />
* install nodemailer, nodemailer-smtp-transport.
```
npm install  nodemailer nodemailer-smtp-transport
```
<br />

Create the transporter which holds settings about our account and the SMTP host. <br />

```
const nodemailer = require('nodemailer')

let smtpTransport = require('nodemailer-smtp-transport');

smtpTransport = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {        
    user: process.env.ZOHO_AUTH_USER,
    pass: process.env.ZOHO_AUTH_PASS
  }
});
```


### Generate password for Zoho

1. Go to [my account](https://accounts.zoho.com/home)
2. Select [App Passwords](https://accounts.zoho.com/home#security/app_password)
3. Press Generate New Password and use that for you the pass field above.

<br />

### Create the mail <br /><br />

Define an object where we specify things such as email receiver, email subject and content.


```
 const mailOptions = {
      from: process.env.ZOHO_AUTH_USER,
      to: process.env.DAR21_EMAIL,
      subject: "Contact us",
      attachments: [], 
      html: htmlToSend
    }; 
```
<br />

### Send mail <br />
Use the sendMail method to send the mail, passing in the mailOptions object we defined above as first parameter.

```
smtpTransport.sendMail(mailOptions, function (error, response) {
  if (error) {        
    res.status(500).send({msg: "Email hasn't been sent", error: error.response})
  }else{
    res.status(200).send({msg: "Email has been sent", response: response.response});
  }
}); 
```
<br /><br />

# Deploy 21TV to Digitalocean 
<br />


>Steps to deploy a Node.js app to DigitalOcean using PM2, NGINX as a reverse proxy and an SSL from LetsEncrypt

<br />


## 1. Sign up for Digital Ocean



Sign up [here.](https://www.digitalocean.com/)

<br />

## 2. Create a droplet and log in via ssh
<br />

## 3. Install NGINX
<br />

Nginx is one of the most popular web servers in the world and is responsible for hosting some of the
largest and highest-traffic sites on the internet. <br /> <br />

Because Nginx is available in Ubuntu’s default repositories, it is possible to install it from these
repositories using the **apt** packaging system. <br /> <br />

Since this is our first interaction with the **apt** packaging system in this session, we will update our
local package index so that we have access to the most recent package listings. Afterwards, we can
install nginx: <br /> <br />

```
sudo apt update

sudo apt install nginx
``` 
<br /> 

Before testing Nginx, the firewall software needs to be adjusted to allow access to the service. Nginx
registers itself as a service with fw upon installation, making it straightforward to allow Nginx access. <br /><br />

List the application configurations that ufw knows how to work with by typing:
```
sudo ufw app list
```

You should get a listing of the application profiles. There are three profiles available for Nginx:

* Nginx Full: This profile opens both port 80 (normal, unencrypted web traffic) and port 443
(TLS/SSL encrypted traffic)
* Nginx HTTP: This profile opens only port 80 (normal, unencrypted web traffic)
* Nginx HTTPS: This profile opens only port 443 (TLS/SSL encrypted traffic)
You can enable this by typing:

```
sudo ufw allow ssh (Port 22)

sudo ufw allow http (Port 80)

sudo ufw allow https (Port 443)

sudo ufw enable
```

You can verify the change by typing:
```
sudo ufw status
```

Then we check if the server is running successfully
```
systemctl status nginx
```


## 4. Install Node/NPM and mongodb

* install [node.js](https://nodejs.org/en/download/)  
* install [mongodb](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

<br />


## 5. Clone your project from Github
<br />

Our nginx default served page is found in
```
cd /var/www/html

ls

mkdir web_app

cd web_app
```
Initialise the git. Check if it exists
```
git –version
```
Connect our server to gitlab. So, cd back to root
```
cd
```
Check if you have .ssh directory
```
ll
```

Go into that directory
```
cd .ssh

ll
```
You can see we do not have any keys here, so let us create them
```
ssh-keygen

ll
```

After they have been created, we need to view the public key and copy it
```
cat id_rsa.pub
```
Go to gitlab.com>settings>SSH Keys... For github.com>settings>Deploy Keys>Add deploy key ...
and paste the keys <br /><br />


Before cloning 21-frontend-react and 21tv-admin-react we will do local build and will push it github

```
npm run build

git add .
 
git commit -m"some text"

git push origin main
```

Move into project directory and pull project

For 21-frontend-react

```
cd var/www/html/web_app
ll
git clone URL /* Custom Name */ 21tv_react_app
cd  21tv_react_app
npm install
```

For 21-admin-react

```
cd var/www/html/web_app
ll
git clone URL /* Custom Name */ 21tv_react_admin
cd  21tv_react_admin
npm install
```

For 21tv-backend-node-express
```
cd var/www/html/web_app
ll
git clone URL /* Custom Name */ 21tv_node_api
cd 21tv_node_api
npm install
```
<br /><br />


## 6. Change the nginx setting since it is currently pointing to the default page. 
<br />

Nginx is located at etc/nginx

### For 21-frontend-react

```
cd
cd /etc/nginx
ll
cd /sites-available
ll
nano default //If it fails, try runing with sudo
```

Change the root part to point to the build folder of our 21tv_react_app and change location to this

```
  location / {
           root /var/www/html/web_app/21tv_react_app/build;
           index  index.html index.htm;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
        }

```
and add a line after server name
```
error_page 404 /;
```

Check if nginx is working fine
```
sudo nginx -t
```

### For 21-admin-react

```
cd
cd /etc/nginx
ll
cd /sites-available
cp default admin // copy default to api
nano admin //If it fails, try runing with sudo
```


```
  location / {
           root /var/www/html/web_app/21tv_react_admin/build;
           index  index.html index.htm;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
        }

```

change the server name to ip address or domain name
```
server_name  droplet-ip-address
```

and add a line after server name
```
error_page 404 /;
```

Check if nginx is working fine
```
sudo nginx -t
```

```
ln -s /etc/nginx/sites-available/admin /etc/nginx/sites-enabled/
```


### For 21tv-backend-node-express


Add Environmental Variables

Open this file now:

```
nano ~/.bashrc
```

Export Environmental Variables

```
export VARNAME=value
```

Force your current session to read the file now by typing:

```
source ~/.bashrc
```

We can then run it normally, and it will run, but not on the internet, this means we have to find ways of
making the api accessible online.


```
cd var/www/html/web_app/21tv_node_api

node server.js
```

We need to install a production process manager for Node.js applications with a built-in load balancer,
called PM2. It allows you to keep applications alive forever, to reload them without downtime and to
facilitate common system admin tasks.
```
npm install pm2 -g

pm2 start api.js
```
This pm2 runs our node api as a service, which needs to be registered by nginx and firewall



Nginx works as a front end server, which in this case proxies the requests to a node.js server. Therefore
you need to setup an nginx config file for node. These are what are called server block.

When using the Nginx web server, server blocks can be used to encapsulate configuration details and
host more than one domain from a single server.

```
cd

cd /etc/nginx/sites-available/

cp default api

nano api
```

assign it a port to use when live
```
listen 81;
```

comment out the default one
```
#listen [::]:81 default_server;
```
comment out root
```
  root /var/www/html/web_app/21tv_react_app/build;
```

change the server name to ip address or domain name
```
server_name  droplet-ip-address
```

change location to this

```
location / {
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-NginX-Proxy true;
proxy_pass http://127.0.0.1:5000;
proxy_set_header Host $http_host;
proxy_cache_bypass $http_upgrade;
proxy_redirect off;
}
```

When all that is done, it is time to enable our server block such that nginx proxies the api requests to a
node.js api server. We create the symbolic link to this file with the following command

```
ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
```

We then let our firewall to let in requests coming to our api, through the port 81 we assigned it in nginx

```
sudo ufw allow 81
sudo ufw enable
```
Now our api must be running globally. If it fails, try stopping, deleting and restarting the process using
pm2.


We then restart nginx such that it is able to notice the changes we have made
```
sudo service nginx restart
```
<br />

## 7. Add domain in Digital Ocean
<br />

In Digital Ocean, go to networking and add a domain

Add an A record for @ and for www to your droplet


## Register and/or setup domain from registrar
 
Choose "Custom nameservers" and add these 3

* ns1.digitalocean.com
* ns2.digitalocean.com
* ns3.digitalocean.com
  
It may take a bit to propogate

Then change server_name with domains for ```nano default, nano admin, nano api```


```
server_name   domain_name
```
<br />

## 8. Add SSL with LetsEncrypt
<br />

```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```
