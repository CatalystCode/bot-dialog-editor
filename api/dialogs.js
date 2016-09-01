var fs = require('fs-extra');
var path = require('path');

var express = require('express');
var router = express.Router();

var DIALOGS_PATH = path.join(__dirname, '..', 'public', 'dialogs', 'active');
var VERSIONS_PATH = path.join(__dirname, '..', 'public', 'dialogs', 'versions');

function getDialogsDirectory(version) {
  return version && version !== 'active' ? path.join(VERSIONS_PATH, version) : DIALOGS_PATH;
}

// Getting a list of files and versions
router.get('/get/:version?', function(req, res) {

  var dialogsFolder = getDialogsDirectory(req.params.version);

  var dialogs = fs.readdirSync(dialogsFolder).filter(function (item) {
    return fs.statSync(path.join(dialogsFolder, item)).isFile();
  });

  res.json({ dialogs: dialogs });   
});

// Get a list of all version
router.get('/versions', function(req, res) {

  var versions = fs.readdirSync(VERSIONS_PATH).filter(function (item) {
    return fs.statSync(path.join(VERSIONS_PATH, item)).isDirectory();
  });

  res.json({ versions: versions });   
});

// Create a new version from the active one
router.put('/version/:name', function(req, res) {
  var versionName = req.params.name;
  if (typeof versionName === undefined || versionName === null) {
    throw new Error('Please provide a name for the new version');
  }

  var versionPath = path.join(VERSIONS_PATH, versionName);
  fs.copySync(DIALOGS_PATH, versionPath);

  res.json({ message: 'success' });
});

// Create a new file
router.put('/dialog/:name/:version', function(req, res) {
  var fileName = req.params.name;
  var contents = req.body;
  var dialogsFolder = getDialogsDirectory(req.params.version);

  if (typeof fileName === undefined || fileName === null) {
    throw new Error('Please provide a name for the new file');
  }

  var filePath = path.join(dialogsFolder, fileName);
  fs.writeFileSync(filePath, body);
  
  res.json({ message: 'success' });
});

// Check if version exists
router.get('/dialog/check-version/:name', function(req, res) {
  var versionName = req.params.name;
  var dialogsFolder = getDialogsDirectory(req.params.version);

  if (typeof versionName === undefined || versionName === null) {
    throw new Error('Please provide a name for the new file');
  }

  var versions = fs.readdirSync(VERSIONS_PATH).filter(function (item) {
    return item == versionName;
  });

  res.json({ valid: versions.length == 0, error: versions.length != 0 ? 'Another version exists with the same name' : false });
});

// Delete a file
router.delete('/dialog/:name/:version', function(req, res) {
  var fileName = req.params.name;
  var dialogsFolder = getDialogsDirectory(req.params.version);

  if (typeof fileName === undefined || fileName === null) {
    throw new Error('Please provide a name for deleting a file');
  }

  var filePath = path.join(dialogsFolder, fileName);
  fs.unlink(filePath);
  
  res.json({ message: 'success' });
});

router.get('/content/:name/:version?', function(req, res) {
  var fileName = req.params.name;
  var dialogsFolder = getDialogsDirectory(req.params.version);

  if (typeof fileName === undefined || fileName === null) {
    throw new Error('Please provide a name for deleting a file');
  }

  var filePath = path.join(dialogsFolder, fileName);
  var json = fs.readFileSync(filePath, 'utf8');
  
  res.json(json);
});

module.exports = router;