'use strict';

//http://scotch.io/tutorials/javascript/scraping-the-web-with-node-js

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape/:id', function(req, res) {
    var url = 'http://www.futbin.com/player/' + req.params.id;
    console.log('URL: ' + url);

    request(url, function(error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { id: "", pslbin: "", psl_timesince: "", name: "", nationality: "", league: "", team: "", position: "", rating: "", attr_pace: "", attr_shoot: "", attr_pass: "", attr_dribble: "", attr_defense: "", attr_physical: ""};

            json.id = req.params.id;

            $('.lowestBin #pslbin').filter(function() {
                var data = $(this);
                json.pslbin = data.text();
                // Remove the "PS - " from the result
                json.psl_timesince = data.next().children().first().next().children().first().text();
                json.psl_timesince = json.psl_timesince.substring(4);
            });

            $('.playerInfo').filter(function() {
                var data = $(this);
                var tableRows = data.children().first().next().children().first().children().first();

                json.name = tableRows.children().first().text();
                json.nationality = tableRows.children().first().next().text();

                json.league = tableRows.next().children().first().text();
                json.team = tableRows.next().children().first().next().text();
            });

            $('#Player-card .playercard-position').filter(function() {
                json.position = $(this).text();
            });

            $('#Player-card .playercard-rating').filter(function() {
                json.rating = $(this).text();
            });

            $('#Player-card .playercard-attr.playercard-attr1').filter(function() {
                json.attr_pace = $(this).text();
            });

            $('#Player-card .playercard-attr.playercard-attr2').filter(function() {
                json.attr_shoot = $(this).text();
            });

            $('#Player-card .playercard-attr.playercard-attr3').filter(function() {
                json.attr_pass = $(this).text();
            });

            $('#Player-card .playercard-attr.playercard-attr4').filter(function() {
                json.attr_dribble = $(this).text();
            });

            $('#Player-card .playercard-attr.playercard-attr5').filter(function() {
                json.attr_defense = $(this).text();
            });

            $('#Player-card .playercard-attr.playercard-attr6').filter(function() {
                json.attr_physical = $(this).text();
            });

// TODO - add discard price, work rates, nationality/league, time since BIN, two other lowest bins, stars, type of card, etc.

            res.send(json);
        } else {
            res.send({ error: error});
        }
    });
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');        // load the single view file (angular will handle the page changes on the front-end)
});

app.listen('8081');

console.log('Listening on port 8081');

exports = module.exports = app;