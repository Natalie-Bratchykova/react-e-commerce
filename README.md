# React e-commerce platform
This is a small online shop that is written in React and Node.

### Front end stack
+ React
+ React-Bootstrap
+ Mobx

### Back end stack
+ Node.js
+ Express (express validator, express file upload libs)
+ PostgreSql
+ Sequilize
+ JsonWebTocken

## How to run the project
1) Copy repositry
2) In ```server``` folder created file ```.env```
3) In added file define following variables
   
```PORT``` - port for your back end server

```DB_NAME``` - your db name for the project

```DB_USER``` - root user for your db for the project

```DB_PASSWORD``` - db password

```DB_PORT``` - port of your db

```DB_HOST``` - host for your db (in case you do it on your local computer it will have value ```localhost```)

```ACCESS_TOKEN_SECRET``` - secret key for generating access token for registration/login 

```CLIENT_DOMAIN``` - your client server url

5) In ```client``` folder create ```.env``` file
6) In created file define variable ```VITE_BASE_URL``` that should be the url of your back end server (in format like ```http://localhost:BackEndPort```)
7) After all go to terminal
8) Go to server folder
9) Install all required packages by command ```npm i```
10) Start server with command ```npm run dev```
11) Go to client folder
12) Install all required packages by command ```npm i```
13) Start client server with command ```npm run dev```

## How it looks like
+ Main page for unauthorized users
  ![image](https://github.com/Natalie-Bratchykova/react-e-commerce/assets/122181600/b96bb8ae-e051-4eeb-9973-c461ac150d20)

+ Registration page
  ![image](https://github.com/Natalie-Bratchykova/react-e-commerce/assets/122181600/71e385d1-1c97-48eb-acdc-feab15ba7ad9)

+ Login page
  ![image](https://github.com/Natalie-Bratchykova/react-e-commerce/assets/122181600/d00c9536-18da-4cf2-bf23-45bfe4f332c2)

+ Main page for user
  ![image](https://github.com/Natalie-Bratchykova/react-e-commerce/assets/122181600/6a2cd579-cd47-4b1a-8e52-7a40d10691f9)

+ Product page
  ![image](https://github.com/Natalie-Bratchykova/react-e-commerce/assets/122181600/c0770c2f-2b09-4c04-8874-9cce2d258c8d)

+ Basket Page
  ![image](https://github.com/Natalie-Bratchykova/react-e-commerce/assets/122181600/ca5dcac6-a963-48c0-b133-2c874df264c9)

+ Main Page for admin
  ![image](https://github.com/Natalie-Bratchykova/react-e-commerce/assets/122181600/d1e530d2-d25e-4dbf-b7f1-065b74bbf06b)

+ Admin page
  ![image](https://github.com/Natalie-Bratchykova/react-e-commerce/assets/122181600/ad0283b6-4981-423a-a3ea-76c7d16b8906)

+ Adding data through admin page
  ![image](https://github.com/Natalie-Bratchykova/react-e-commerce/assets/122181600/c6d00415-f6d3-411e-93b8-9af2ce68faff)
