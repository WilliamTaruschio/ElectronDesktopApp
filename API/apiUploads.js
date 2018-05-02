var mongoose = require('mongoose');


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

  res.send(req.file);

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

// @route GET /files/:filename
// @desc  Display single file object
exports.getfile = (req, res) => {
  main.GFS.files.findOne({
    filename: req.params.filename
  }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists


    // Check if pdf
    if (file.contentType === 'application/pdf' ) {
      // Read output to browser
      const readstream = main.GFS.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not a pdf'
      });
    }
  });
};