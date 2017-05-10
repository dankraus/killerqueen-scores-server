var express = require('express');
var router = express.Router();

var fs = require('fs')
var gm = require('gm');


router.get('/', function (req, res) {
  res.send('Hello World API!');
})

router.post('/', function(req, res) {
  var blueMarkerStartingCoords = [864,969];
  var goldMarkerStartingCoords = [1066,969];
  var markerImgPadding = 45;

  fs.writeFileSync(appRoot + '/assets/overlays/blueTeamLabel.txt', req.body.blueTeam);
  fs.writeFileSync(appRoot + '/assets/overlays/goldTeamLabel.txt', req.body.goldTeam);

  var compositeOverlay = gm()
    .in('-page', '+0+0')
    .in(appRoot + '/assets/overlays/game-base-overlay.jpg')

  var winsNeededForSeries = Math.ceil(req.body.series / 2);

  for(var i = 0; i < winsNeededForSeries; i++){
    var blueMarkerImage = '';
    var goldMarkerImage = '';

    var xBlueOffset = blueMarkerStartingCoords[0] - (i*markerImgPadding);
    var yBlueOffset = blueMarkerStartingCoords[1];
    var blueOffset = '+'+ xBlueOffset +'+'+yBlueOffset;

    var xGoldOffset = goldMarkerStartingCoords[0] + (i*markerImgPadding);
    var yGoldOffset = goldMarkerStartingCoords[1];
    var goldOffset = '+'+ xGoldOffset +'+'+yGoldOffset;

    if(i >= req.body.score.blue){
      blueMarkerImage = appRoot + '/assets/overlays/score-marker-blue-empty.png'; 
    } else {
      blueMarkerImage = appRoot + '/assets/overlays/score-marker-blue-win.png';
    }

    if(i >= req.body.score.gold){
      goldMarkerImage = appRoot + '/assets/overlays/score-marker-gold-empty.png'; 
    } else {
      goldMarkerImage = appRoot + '/assets/overlays/score-marker-gold-win.png';
    }

    compositeOverlay = compositeOverlay
    .in('-page', blueOffset)
    .in(blueMarkerImage)
    
    compositeOverlay = compositeOverlay
    .in('-page', goldOffset)
    .in(goldMarkerImage)   
  } 

  
  compositeOverlay.mosaic()
    .write(appRoot + '/assets/overlays/rendered-overlay.jpg', function (err) {
        if(err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
    });
  
})

router.post('/reset', function(req, res) {
  fs.writeFileSync(appRoot + '/assets/overlays/blueTeamLabel.txt', '');
  fs.writeFileSync(appRoot + '/assets/overlays/goldTeamLabel.txt', '');

  gm(appRoot + '/assets/overlays/game-base-overlay.jpg')
  .write(appRoot + '/assets/overlays/rendered-overlay.jpg', function(err) {
        if(!err) {
          res.sendStatus(200);
        } else {
          console.log(err);
          res.sendStatus(500);
        }
    });  
});


module.exports = router;