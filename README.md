<img width="150" src="https://lh3.googleusercontent.com/lermGm-rSEWdoO4n_Z_FLDiQ0NTAe6max8cQRU_zBodnsmY8ANCJCJJL2bCgf1ZJ9TbVYewje_cXVlpY3yuuGvlGHCc_efJLnSxp97s=w600" align="right" />

# NFT Mongolia
<img src="https://c.tenor.com/QEquHjOjaL8AAAAC/flower-purple.gif">

## Clone or Download
```
git clone https://github.com/FoxLlik/onlineShopping.git
```

## Setup
``` 
Backend folder дотор .env file шинээр үүсгэж өгнө.

  * PORT = 
  
  * DATABASE_NAME = 
  * DATABASE_USER = 
  * DATABASE_PASSWORD = 

  * MAIL_EMAIL = 
  * MAIL_PASSWORD = 
  
  * JWT_SECRET = 
  * JWT_EXPIRESIN = 
```

## Database
```
Postgresql болон pgadmin4 татсан байх шаардлагатай.

Database folder дотор байгаа databaseQuery.txt гэсэн query-г pgadmin4 дээр ажиллуулна.
package.json дотор `seqauto` script-ийг "npx sequelize-auto -h localhost -d <database_name> -u <database_user> -x <database_password> -p <port_number> --dialect postgres -c sequelize-auto-option.json -o models" форматаар өөрчлөнө. 

$ npm run seqauto
```

## Run the BACKEND
```
$ cd backend
$ npm install
$ npm run start
  
```

## Run the FRONTEND
```
$ cd frontend
$ npm install
$ npm start
```


