module.exports = function (app, db, req) {
    var mongoose = require('mongoose');
    const crypto = require('crypto');
    const path = require('path');
    const multer = require('multer');
    const GridFsStorage = require('multer-gridfs-storage');
    const Grid = require('gridfs-stream');
    var log = require('electron-log');
    var ObjectID = require("mongodb").ObjectID;


    var api = require('../API/apiUploads.js');
    api.setDb(db);
    

    // Create storage engine
    const storage = new GridFsStorage({
        url: 'mongodb://williamTaruschio:taruschio2@ds111124.mlab.com:11124/recusol',
        file: (req, file) => {
            
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err);
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'Uploads'
                    };
                    resolve(fileInfo);
                });
            });
        }
    });
    const upload = multer({
        storage
    });


    log.info('connection  :  ', db);
    app.route('/files')
        .get(api.getfiles);
    app.route('/upload')
        .post(upload.single('file'), api.uploadfile);
    app.route('/files/:filename')
        .get(api.getfile);

};