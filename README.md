# Introduction

This project is a **work in progress** boilerplate made for hybride mobile application development. It is a learning project in order for me to discover golang.

It provides you with a quick start including a JWT authentification. Middlewares to handle an api key, CORS, log, and JWT headers. The frontend includes components, AuthContext, nativewind and an up to date expo SDK.

The backend is made after the boilerplate of @hhertout : https://github.com/hhertout/go_std_boilerplate.

## Technologies

### Backend

- Go
- Gorm

### Database

- Postgres
- PgAdmin for database management and visualization

### Frontend

- React Native
- Expo
- React native paper
- Nativewind

### Devops

- Docker & Docker compose

## Installation

### Environment variables

In env/:

- cp db.env.example and rename it db.env. Add your variables as indicated.
- cp server.env.example and rename it server.env. Add your variables as indicated. Every db related variable must be the same as db.env variables.

In frontend/:

- cp .env and rename it .env.local. _EXPO_PUBLIC_API_KEY_ must be the same variable as _API_KEY_ in /env/server.env. Do complete the other variables as you see fit.

### Build the project

Run:
`make build`

## Start

Run: `make watch`

Create your account and connect.

## TODO

This boilerplate is still work in progress and needs some cleaning and improving. For exemple, more asserts, better style, better error handling...
It is very usable at this state and any improvment can be the object of a Pull Request you if desire to contribute !
