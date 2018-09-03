var request = require('request');
var ignore = require('secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
      'Authorization': 'ignore'
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}




