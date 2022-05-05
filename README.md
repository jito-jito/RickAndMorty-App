# RickAndMorty-App

An application to search and save characters of Rick and Morty, created to apply in an interview.

# Table of content 

[Created with](#id1) <br/>
[Starting](#id2) <br/>
[Installation](#id3) <br/>
[Testing](#id4) <br/>
[Deployment](#id5) <br/>
[Inspiration](#id6) <br/>
[status](#id7) <br/>

# Created with 🛠️ <a name="id1"></a>

Technologies used to make the app:

## Frontend Technologies:

| Name | version |
| ---- | ------- |
| vue | ^3.2.33 |
| vue-router | ^4.0.14 |
| vue3-cookies | ^1.0.6 |
| pinia | ^2.0.13 |
| axios | ^0.27.2 |
| bootstrap | ^5.1.3 |
| jwt-decode | ^3.1.2 |
| sass | ^1.51.0 |
| eslint | ^8.5.0 |

## Backend Technologies:

| Name | version |
| ---- | ------- |
| express | ^4.17.3 |
| body-parser | ^1.20.0 |
| cors | ^2.8.5 |
| passport | ^0.5.2 |
| passport-jwt | ^4.0.0 |
| jsonwebtoken | ^8.5.1 |
| mongoose | ^6.3.0 |
| axios | ^0.26.1 |
| bcrypt | ^5.0.1 |
| nodemon | ^2.0.15 |
| dotenv | ^16.0.0 |
| jest | ^27.5.1 |
| eslint | ^8.14.0 |

## APIs
* Rick and Morty API https://rickandmortyapi.com/ 


# Starting 🚀 <a name="id2"></a>

To work on this project you need to copy this repo into your environment and install the dependencies using npm:

```
npm install
```

If you need to run a development environment you can use:

```
npm run dev
```

If you need to make a production package of the application you can use:

```
npm run build
```


### Instalation 🔧 <a name="id3"></a>

To execute the app you must create a .env file in the root of the package and set environment variables with the same name defined into the .env.example file:


.env example:
```
SOME_SECRET_VARIABLE=secretValue
```


## Executing test ⚙️ <a name="id4"></a> 

### Unit tests

To run the tests you must use: 
```
npm run test
```

## Deployment 📦 <a name="id5"></a>

The deployment of the app was made in Netlify and Heroku, go to see the website in the links added in this repo.

## Inspiration 🎁 <a name="id6"></a>

* I use the design of [this work](https://github.com/jito-jito/MarvelComicApp) to make the app. 

# Status <a name="id7"></a>

## Backend - Completed in an initial version 

This means there are things that I would like to change or implement but I considered it ready for deployment on the internet.

## Frontend - With pending tasks

this means some things are pending to have a completed version.

Pending things: Add some error cases in signIn and signUp, add unit testing to the components and modularize
some logic of the app related to signIn/Up flow, cookie flow, and interactivity with the global state.

