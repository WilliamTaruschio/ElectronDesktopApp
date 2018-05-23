var mongoose = require('mongoose');

var mongoose = require('mongoose');
var Acquisto = require('../models/Acquisto.js');
var main = require('../main');
const methodOverride = require('method-override');
var log = require('electron-log');
var ObjectID = require("mongodb").ObjectID;
var db;

exports.setDb = function (extdb) {
  db = extdb;

};



// @route POST /upload
// @desc  Uploads file to DB
exports.uploadfile = function (req, res) {

  //deve aggiungere l'id del file alla fattura 
  var idfattura = req.body.fattura;
  log.info('id fattura : ', (req.body.fattura));
  log.info('req file fattura : ', (req.file));


  Acquisto.update({
    _id: ObjectID(idfattura)
  }, {
    $set: {
      idfile: req.file.filename
    }
  }, function (err) {
    if (err) log.info('non modificato'); // saved!
    else {
      res.status(201).json({
        idfile: req.file.filename
      });
    }
  });



};

// @route GET /files
// @desc  Display all files in JSON
exports.getfiles = function (req, res) {

  main.GFS.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
};
var filename
// @route GET /files/:filename
// @desc  Display single file object
exports.getfile = (req, res) => {
  
  filename =req.params.filename;
 
 log.info('req.params.filename : ', (filename));
  main.GFS.files.findOne({
    filename: filename
  }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    let data = [];
   
    
    
   
    // Check if pdf
    if (file.contentType === 'application/pdf') {
      // Read output to browser
      const readstream = main.GFS.createReadStream(file.filename);
      res.setHeader('content-type','application/pdf')
      readstream.pipe(res);
      
      
      // File exists
     
    } else {
      res.status(404).json({
        err: 'Not a pdf'
      });
    }
  });
};