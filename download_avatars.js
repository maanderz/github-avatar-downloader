var request = require('request');
var ignore = require('./secrets.js');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

// console.log('Welcome to the GitHub Avatar Downloader!');

// defining which owner and name to retrieve data from github
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'ignore'
  }
};

//sets up callback parameters
request(options, function(err, res, body) {
    //console.log('JSON', body);
  cb(err, JSON.parse(body));
  });
}

//downloads the images - if the image isn't present it will go to the .pipe for a designated file destination
function downloadImageByURL(avaUrl, filePath) {
  request.get(avaUrl)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (res) {
      console.log('Response Status Message: ', res.statusCode + " " + res.statusMessage);
    })
    .pipe(fs.createWriteStream('./' + filePath))
}

//the callback function
//loops through the objects to find the avatar_url keys
//designates the exact filepath for image to download
getRepoContributors(repoOwner, repoName, function(err, result) {
    if (!repoOwner || !repoName) {
      console.log("error: " + err);
    }
    var avaUrl = "";
      for (var i = 0; i < result.length; i++) {
        avaUrl = result[i].avatar_url;
        downloadImageByURL(avaUrl, "./avatar/" + result[i].login + '.jpg');
      }
})
