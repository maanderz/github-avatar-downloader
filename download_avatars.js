var request = require('request');
var ignore = require('./secrets.js');
var fs = require('fs');

// console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'ignore'
    }
  };

  request(options, function(err, res, body) {
    //console.log('JSON', body);
    cb(err, JSON.parse(body));
  });
}
//       console.log("Result:", avaUrl);
//     }
//     console.log("Errors:", err);
// });
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

getRepoContributors('jquery', 'jquery', function(err, result) {
    var avaUrl = "";
    for (var i = 0; i < result.length; i++) {
      avaUrl = result[i].avatar_url;
    downloadImageByURL(avaUrl, "./avatar/" + result[i].login + '.jpg');
  }
})
