# NEXT STEPS:

strengthen user system
add extra user funcs.
build other features / pages
Passport
Redux / ApolloGraphQL
Express
Next Routing

# **_DATABASE_**

Install PostgreSQL

````
sudo apt update
sudo apt install postgresql postgresql-contrib
psql --version
sudo service start postgresql
service postgresql status
sudo passwd postgres
````

After running the above commands a postgresql database server should be running and can be connected to for local dev using the default user `postrgres`

## **_Create database_**

````
sudo -u postgres psql # To start the postgresql cli
\dt # to list users
CREATE DATABASE "database-name"; # You can also use \connect to connect to an existing database
CREATE TABLE users (id serial, name text);
INSERT INTO users (name) VALUES ('John'); # Add example data
SELECT * FROM users; # Check data exists
\q # to exit
````

## **_Install Prisma_**

````
npm install prisma --save-dev
npx prisma init
````

## **_Tell Express where the database is_**

Add the database location into the dotenv js file where the format is `DATABASE_URL="postgresql://USER:PASSWORD@localhost/DBNAME/prisma2?schema=public"`

## **_Write a schema in file `schema.prisma`, then migrate it_**

````
npx prisma db push
npx prisma studio # to write stub data, works like PHPMyadmin
````

## **_Add and setup Prisma Client to connect Next to the DB_**

````
npm install @prisma/client
npx prisma generate # run after any chnage to the schema
````

GENERAL REFs
https://dev.to/aurelkurtula/introduction-to-nextjs---adding-express-and-mongo-to-the-project-2d38
https://redux.js.org/introduction/learning-resources
https://ethereum.org/en/developers/docs/dapps/
https://nextjs.org/docs/advanced-features/custom-server
https://nextjs.org/docs/authentication