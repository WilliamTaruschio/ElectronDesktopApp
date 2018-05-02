'use strict';
const electron = require('electron');
const url = require('url');
const path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Prodotti = require('./models/Prodotti.js');
var morgan = require('morgan');
const Grid = require('gridfs-stream');
require('electron-reload')(__dirname);


var ex = express();
//bodyparser
ex.use(bodyParser.json({limit: "50mb"}));
ex.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
ex.use(morgan('dev'));

var routeProdotti = require('./route/routeProdotti');
routeProdotti(ex, db);
var routeMaterie = require('./route/routeMaterieprime');
routeMaterie(ex, db);
var routeClienti = require('./route/routeClienti');
routeClienti(ex, db);
var routeFornitori = require('./route/routeFornitori');
routeFornitori(ex, db);
var routeAcquisto = require('./route/routeAcquisto');
routeAcquisto(ex, db); 


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
        show: false
    });

    //mette l'applicazione a schermo intero 
    mainWindow.maximize();
    
    
    
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


var routeUploads = require('./route/routeUploads');

//connessione mongoose
const mongoURI = 'mongodb://williamTaruschio:taruschio2@ds111124.mlab.com:11124/recusol';
mongoose.connect(mongoURI);
var db = mongoose.connection;
//controllo connessione a mongodb

db.once('open', function () {
    
    const gfs = Grid(db.db, mongoose.mongo);
    gfs.collection('Uploads');
    exports.GFS=gfs;
    console.log('connesso a mongodb');
});
db.on('error', function (err) {
    console.log(err);
});



routeUploads(ex, db);
ex.use('/',routeProdotti);