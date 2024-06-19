<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <img src="https://private-user-images.githubusercontent.com/1627816/338231690-fe856215-db34-47f6-8ba1-9e3634f7d337.jpeg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTg3ODE4NDksIm5iZiI6MTcxODc4MTU0OSwicGF0aCI6Ii8xNjI3ODE2LzMzODIzMTY5MC1mZTg1NjIxNS1kYjM0LTQ3ZjYtOGJhMS05ZTM2MzRmN2QzMzcuanBlZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA2MTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNjE5VDA3MTkwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY0ZGQyZTE1OGIzNTEzNTFkZGU4YmQwOTNlOTQwMDAwZTY1MGIzZjQxMWYzNzQ0YmFiMDk5ZTk1YTZmMTQzZTMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.YMk12VCHmF8uRKrwBSl7z0dDnSWjA3SCAtj_PImL3WE" width="100">
  <a href="https://nestjs.com/" target="blank"><img src="https://www.postgresql.org/media/img/about/press/elephant.png" width="100" alt="Postgres Logo" /></a>
</p>

<p align="center">Boilerplate for <a href="https://nestjs.com/" target="_blank">NestJS</a> Framework using <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> Database.</p>

## Packages

- [nestjs](https://github.com/nestjs/nest) - A progressive Node.js framework for building efficient and scalable server-side applications.
- [pg](https://github.com/brianc/node-postgres) - Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.
- [knex](https://github.com/knex/knex) - A batteries-included, multi-dialect (PostgreSQL, MySQL, CockroachDB, MSSQL, SQLite3, Oracle (including Oracle Wallet Authentication)) query builder for Node.js.
- [objection.js](https://github.com/vincit/objection.js) - An ORM for Node.js that aims to stay out of your way and make it as easy as possible to use the full power of SQL and the underlying database engine while still making the common stuff easy and enjoyable.
- [jest](https://github.com/jestjs/jest) - A delightful JavaScript Testing Framework with a focus on simplicity.

## Database Setup

On this boilerplate since I'm planning to exposed this API using vercel, I need also to host my postgres database and dont have server to host the postgres database.
I found <a href="https://supabase.com/" target="_blank">supabase</a> which used postgres database under the hood and also its free :).

But if you have server that can host postgres database and dont use <a href="https://supabase.com/" target="_blank">supabase</a>. I added a docker compose file on the project which run the postgres database locally.This is windows command `docker-compose up -d` to execute the docker compose file.

Once you have postgres database running on local machine or supabase configure is done.<br/>
Execute this command for project environment variables. Make sure you are on the project level

Copy the fake env vars
 ```sh
   $ cp .env.example .env
 ```
This command will create `.env` file and copy whatever on `.env.example`. Open `.env` file and supply the env variables with the postgres connection credentials.

To setup tables and seeds (populate your database with test data or initial data) using <a href="https://knexjs.org/guide/migrations.html#migration-cli" target="_blank">knex</a> migrations.
On the project, there is a folder called `databases` on the first level<br/>
<img src="https://private-user-images.githubusercontent.com/1627816/340964536-40081135-a3b0-42ff-852c-e3617055d5dc.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTg3ODE3NTUsIm5iZiI6MTcxODc4MTQ1NSwicGF0aCI6Ii8xNjI3ODE2LzM0MDk2NDUzNi00MDA4MTEzNS1hM2IwLTQyZmYtODUyYy1lMzYxNzA1NWQ1ZGMucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI0MDYxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDA2MTlUMDcxNzM1WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MTU2M2YxNmM4YzIwOWY0MmJmOTE1NThkNTQwOGY1MWMzMjIyOWMzYzU1MjFjY2JhNzdiZjM2M2NmZjU4MzdiNyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.4C_K-Ch1rXhOTkFgZtlU3mazqII2w3sqVlovE_H1xy0" width="150"> <br/>

I made a sample migrations and seeds, To migrate this sample migrations this is command:

1. Run migrations (creating tables and etc.)
 ```sh
   $ npm run migrate
 ```

2. Run seeds (inserting test data or initial data)
 ```sh
   $ npm run seed
 ```   

If you want to create new table you can do by executing this command
 ```sh
   $ npm run migrate:make sample_table 
 ```
This command will create a file under `databases/migrations` directory with the filename that specify above which is `sample_table`.

Or if you want to create new seed you can do by executing this command
 ```sh
   $ npm run seed:make sample_seed 
 ```
This command will create a file under `databases/seeds` directory with the filename that specify above which is `sample_seed`.

