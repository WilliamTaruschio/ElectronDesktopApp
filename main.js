'use strict';
const electron = require('electron');
const url = require('url');
const path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Prodotti = require('./models/Prodotti.js');
var morgan = require('morgan');
require('electron-reload')(__dirname);

var ex = express();
//bodyparser
ex.use(bodyParser.urlencoded({
    extended: true
}));
ex.use(bodyParser.json());
ex.use(morgan('dev'));

var routeProdotti = require('./route/routeProdotti');
routeProdotti(ex, db);
var routeMaterie = require('./route/routeMaterieprime');
routeMaterie(ex, db);
ex.use('/',routeProdotti);
ex.listen(8080,function () {
    console.log('listening on port 8080...');
});


// Module to control application life.
const app = electron.app;

// Module to create native browser window.
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 1000
    });

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the devtools.
    // mainWindow.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {

        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});

//connessione mongoose

mongoose.connect('mongodb://williamTaruschio:taruschio2@ds111124.mlab.com:11124/recusol')
var db = mongoose.connection;
//controllo connessione a mongodb
db.once('open', function () {
    console.log('connesso a mongodb');
});
db.on('error', function (err) {
    console.log(err);
});

