var requestPromise = require('request-promise');
var request = require('request');
var cron = require('node-schedule');
var _ = require('underscore');
var Promise = require('bluebird');
var Twitter = require('twitter');
var cheerio = require('cheerio');

var spotData = require('./json/beachData.json');
var crudUtils = require('./crudUtils');
var Beach = require('../../db/models/beach.js');


    requestPromise(options)
      .then(function(response){
        return crudUtils.filterBeachDataTime(response)
      })
      .then(function(filtered){
        console.log('Surf condition data written for beach #', beach.mswId)
        return Beach.findOneAndUpdate({mswId: beach.mswId}, {forecastData: filtered})
      })
      .then(function(err, success){
        cb(success, err)
      })
      .catch(function(err){
        console.log(err)
      })
});

var iterativeApiCall = function(func, time){
  return function(){
    Beach.find({})
      .then(function(data){
        (function recurse(ind){
          if (ind === data.length){
            console.log('Data for all beaches finished')
            return;
          } 
          func(data[ind])
            .then(function(success){
              console.log('util run');
              setTimeout ( function(){recurse(ind+1)}, time )
            })
            .catch(function(error){
              console.log(error);
              //setTimeout ( function(){recurse(ind+1)}, time )
            })
        })(0)
      })
  }
};

var getTweetText = function(obj){
  return _.map(obj.statuses, function(tweet){
    return tweet.text;
  })
};

var getTweetAsync = Promise.promisify( function(lat, lon, cb){ 

  var client = new Twitter({
   consumer_key: 'o9odfZmdeKbvrgpCVLotcPCNE',
   consumer_secret: 'siz3xPWBJ1iS14KPmSajdIn6DDmHjxHO7vBYr1fIt9E7XvgRrL',
   access_token_key: '874702442-UH5dCPdQ2tyl6NiqbwPFhyzsFNOYbFDdzQiuC0ar',
   access_token_secret: 'QLDf9QCxUzMxD7FkXMkTDKSmM5bB3Fe3ypvbw4Gq1GpAv'
  });

  var geocode = lat + "," + lon + ",5mi";

  client.get('search/tweets', {q: 'surf', geocode: geocode}, function(error, tweets, response){
    //console.log(tweets);
    cb(error, tweets)
  });

});

var getTweetsAsync = Promise.promisify (function(beach, cb){
  getTweetAsync(beach.lat, beach.lon)
    .then(function(tweets){
      return getTweetText(tweets)
    })
    .then(function(tweetText){
      console.log(tweetText);
      return Beach.findOneAndUpdate({mswId: beach.mswId}, {tweets: tweetText})
    })
    .then(function(err, success){
      cb(success, err);
    })
    .catch(function(err){
      console.log(err);
    })
});

var getMswHtmlAsync = Promise.promisify( function(beach, cb){
  var url = 'http://magicseaweed.com/Playa-Linda-Surf-Guide/' + (beach.mswId).toString();
  request(url, function(error, response, html){
    cb(error, html);
  })
});

getMswHtmlAsync({mswId:349})
  .then(function(html, err){
    var $ = cheerio.load(html);
    var items = $('.msw-s-desc').filter(function(){
      var data = $(this);
      var description = data.children().text()
      
    })
  });


exports.mswHtml = iterativeApiCall(getMswHtmlAsync, 0);
exports.mswData = iterativeApiCall(getMswAsync, 0);
exports.tweetData = iterativeApiCall(getTweetsAsync, 60100);

exports.updateBeachData = function(){
  var rule = new cron.RecurrenceRule();
  rule.hour = new cron.Range(0, 23, 3);
  cron.scheduleJob(rule, function(){
    exports.beachDataReq();
  });                                               
};
