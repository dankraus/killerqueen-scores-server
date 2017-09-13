# Killer Queen Score Server

Serves up a NodeJS Express app that can be used to render out team names and scoring markers to be used for a Twitch Overlay.
The app takes a base image for the overlay, then dynamically renders scoring markers onto an image to be read in by OBS
and text files for the team names.

## Installation

- NodeJS (Obviously). I had been running v6.10

- [GraphicsMagick](http://www.graphicsmagick.org/)

- Run `npm install`

## Example Output
This shows a best of 7 series that Gold won 4 games to 1. Not the colored in markers on Gold's side and and uncolored markers on blue's side. This app will dynamically update the number of score markers based on the entered series length and change color based on entered score. Scores, series length, and team names are input via a simple form in a web browser. Update from another computer, phone, whatever. Not pictured below are the team names output. Simply replace the graphics in this repository with your own for the main background overlay, a blue and gold win marker, and a blue and gold need-to-win marker. Included in this repo are other overlays/scenes for a commentator cam + cabinet cams, and a crowd cam. Browse `/assets/overlays`.

![Example Rendered Output](https://raw.githubusercontent.com/dankraus/killerqueen-scores-server/master/assets/overlays/rendered-overlay.jpg)

## Usage

- Change into the directory of this repo and from the command line run `node app.js` 

- Browse to `localhost:3000`

- Enter in the team names, series length, and the number of wins for each team.
The app will render out assets to use in your stream in OBS. Pressing enter
in the web UI will also submit the update in addition to pressing the update button.

If you set the series length to '5' and the scores to 0-0 and update. 
You'll see 3 empty markers on each side as 3 wins are needed a best of 5 series. Set score to Blue 2- Gold 0
and you see Blue with 2 win markers and 1 empty marker and Gold with 3 empty markers.

- Reset button will clear out the team names and scoring markers.

- Occasionally, I've seen the image not fully load into OBS after an update. Sometimes the overlay dissapears or partially renders.
Just hit Update Scores again and it will take. 

 - Our cabinet arrangement is Blue team on the left in the overlay and gold on the right.

 - I also like using [ngrok](https://ngrok.com/) with this. This will set up a publicly accessible URL with a tunnel to a local port on your machine. Open up another command prompt and run `ngrok http 3000`. You'll see a Fowarding url like `http://4bbdf311.ngrok.io` If you configure ngrok with an account, you can get yourself a fixed subdomain too. This is nice to pull up on another computer, phone, or tablet to update the scores and not interfere with the stream itself.  You can give the link to others to update the scores.

 Theres a few other overlays in the assets folder. We have a scene for jsut the team cams and commentator cam. We use hotkeys in OBS to switch between scenes like the main gameplay with overlay and this view of the commentators, also a scene with a Web Browser showing the Challonge Brackets.

## Configuration

### Overlay

- Overwrite the image at `assets/overlays/game-base-overlay.jpg` with your overlay WITHOUT any scoring markers or team labels on it.

- There are 4 scoring marker images. One win and and one "need-to-win" marker for each team. In our case, we have a different marker for blue and gold that are angled in opposite directions and the win markers are colored blue and gold. 
 
    - Blue need-to-win marker: `assets/overlays/score-marker-blue-empty.png`

    - Gold need-to-win marker: `assets/overlays/score-marker-gold-empty.png`

    - Blue win marker: `assets/overlays/score-marker-blue-win.png`

    - Gold win marker: `assets/overlays/score-marker-gold-win.png`

- Next you'll need to adjust the positioning of the scoring markers. This may take some trial an error. Edit the coordinates in `routes/api/scores.js` stores in `blueMarkerStartingCoords`, `goldMarkerStartingCoords`. The valyes are the x,y coords of where the images will be places on the overlay. Then you can set the `markerImgPadding` to at least the width of the marker images or more to put additional space between the markers. The Gold markers will render out from the starting coords and advance to the right. The Blue markers will render out from the starting coords and advance to the left.

Ex: Given a padding of 10. Gold Coords are at [120, 50]. Gold Marker 1 will be at 120, gold marker 2 at 130, gold marker 3 at 140. Blue coords are at [100, 50]. Blue marker 1 will be at 90. blue marker 2 at 80, blue marker 3 at 70.

### OBS

- Add a text layer for each team name. Set it to the file located at `assets/overlays/blueTeamLabel.txt` and `assets/overlays/goldTeamLabel.txt`. Position and style the text as you need.

- Add an image layer for the overlay. Set it to the file located at `assets/overlays/rendered-overlay.jpg`. This file will have the scoring markers dynamically written to it. 

Included is also `OBS_Config.json` which is an export of the OBS stream we set up in Saint Louis. The file paths to images will certainly be wrong so you'll need reload the images in.

