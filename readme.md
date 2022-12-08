# VintHerbe

`VintHerbe` is a simple online catalog that allows you to browse a multitude of offers regarding interior plants.

It was made using the [MERN](https://www.mongodb.com/mern-stack) Stack as part of a web project to learn it.

## Goals

-   Display a multitude of offers in the shape of 'cards'
-   A fully functional Register and Login system
-   Easy access to your cart directly from the navbar
-
-   A responsive layout for both Mobile and Computer users
-   Implement a functional newsletter to keep the user up to date when any offer pops up (WIP)

## Installation

1. Install [Node.js](https://nodejs.org/en/) directly from their website or run

```bash
$ sudo apt-get install nodejs
```

2. Clone the repository

```bash
$ git clone https://github.com/Terencyl/VintHerbe.git
```

3.  Make sure you change the config in the `server/.env` file to suit your usage
4.  To start the server, run

```bash
$ cd server
$ npm install
$ npm start
```

5. To start the client, run

```bash
$ cd client
$ npm install
$ npm start
```

6. You should now have the website opened.
7. You can debug the web app with `Redux DevTools`
    - On Chrome, install [redux-devtools-extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
    - On Firefox, install [redux-devtools-add-ons](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

## File structure

#### `client` - Holds the client application

-   #### `node_modules` - Contains installed dependencies
-   #### `public` - This holds all of the static files
-   #### `src`
    -   #### `components` - This folder holds components
        -   #### `admin` - Contains the part of the website hidden behind admin authentification
        -   #### `pages` - This folder holds all of the different pages accessible to the user
    -   #### `images` - This folder contains the HeroSection background image
    -   #### `slices` - This folder contains the collection of all of the slices used in the website
    -   #### `App.js` - This is what renders all of our browser routes and different views
    -   #### `index.js` - This is what renders the react app by rendering App.js.
-   #### .gitignore - Tells git which files should be ignored
-   #### `package.json` - Defines npm behaviors and packages for the client

#### `server` - Holds the server application

-   #### `middleware` - This holds our configuration files, like mongoDB uri
-   #### `models` - Contains schema for our MongoDB
-   #### `node_modules` - Contains installed dependencies
-   #### `routes` - This holds all of our HTTP to URL path associations for each unique url
-   #### `utils` - This holds a set of utility functions, such as importing cloudinary for our images
-   #### `.env` - Used to declare environment variables
-   #### `package.json` - Defines npm behaviors like the scripts on startup
-   #### `products.js` - Contains hard-coded products (not used anymore)
-   #### `server.js` - Defines npm behaviors and packages for the client

#### `README` - This file!
