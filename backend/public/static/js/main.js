myGame.main = function(game) {};

myGame.main.prototype = {
    preload: function() { // -PRELOAD-

    },

    create: function() { // -CREATE-

        // responsive screen landmarks, scaled for resolution
        // Math.floor included for corner cases with screen
        // resolutions with non-zero values in the ones place
        this.wHalf = Math.floor(game.width / 2);
        this.wThird = Math.floor(game.width / 3);
        this.wQuarter = Math.floor(game.width / 4);
        this.wTenth = Math.floor(game.width / 10);

        this.hHalf = Math.floor(game.height / 2);
        this.hThird = Math.floor(game.height / 3);
        this.hQuarter = Math.floor(game.height / 4);
        this.hTenth = Math.floor(game.height / 10);



        //music

        this.music = game.add.audio('gameMusic');

        this.music.loop = true;

        this.music.play();

        // Background images --HANDLES SELECTION OF CANDIDATE FROM MAINMENU--
        if (playerData.selectedCandidate === 'trump'){
            this.bg = game.add.image(0, 0, 'backgroundTrump');
        } else {
            this.bg = game.add.image(0, 0, 'backgroundClinton');
        }

        // invisible, clickable button in front of candidate
        this.clickButton = game.add.image(0, 0, 'clickMe');
        this.clickButton.x = Math.floor(this.clickButton.width / 2);
        this.clickButton.y = game.height - this.clickButton.height / 2;
        this.clickButton.anchor.setTo(0.5, 0.5);

        this.clickButton.inputEnabled = true;
        this.clickButton.events.onInputDown.add(this.clicked, this);

        // Total vote text
        tVTText = game.add.text(
            Math.floor(this.wTenth * 0.25),
            Math.floor(this.hTenth * 1.35),
            'Trump Votes: ',
            font);

        cVTText = game.add.text(
            Math.floor(this.wTenth * 0.25),
            tVTText.y + tVTText.height,
            'Clinton Votes: ',
            font);

        // Player vote text
        this.playerVotesText = game.add.text(
            tVTText.x + tVTText.width + this.hTenth,  //X POSITION
            tVTText.y,                                     //Y Position
            "Your Votes: " + fixNum(playerData.votes),
            font);

        // Player vote credit text
        this.playerVoteCreditsText = game.add.text(
            this.playerVotesText.x + tVTText.width + this.hTenth,  //X POSITION
            tVTText.y,                                     //Y Position
            "Your Vote Credits: " + fixNum(playerData.voteCredits),
            font);

        // Fancy Pen text
        this.fancyPenText = game.add.text(
            tVTText.x + tVTText.width + this.hTenth,  //X POSITION
            cVTText.y,                                     //Y Position
            "Fancy Pens: " + fixNum(playerData.fancyPens));
        this.fancyPenText.visible = false;


        //text for upgrades

        //this.doorText = game.add.text(460,440,'Door to Door Upgrade Price: ' + fixNum(prArr[0][0]), font)
        //this.doorText.visible = true;

        //this.staffText = game.add.text(460,440,'Campaign Staff Upgrade Price: ' + fixNum(prArr[1][0]), font)
        //this.staffText.visible = false;

        //this.merchandiseText = game.add.text(460,440,'Free Merchandise Upgrade Price: ' + fixNum(prArr[2][0]), font)
        //this.merchandiseText.visible = false;

        //this.picketText = game.add.text(460,440,'Picket Signs Upgrade Price: ' + fixNum(prArr[3][0]), font)
        //this.picketText.visible = false;

        //this.radioText = game.add.text(460,440,'Radio Ads Upgrade Price: ' + fixNum(prArr[4][0]), font)
        //this.radioText.visible = false;

        //this.tvText = game.add.text(460,440,'TV Ads Upgrade Price: ' + fixNum(prArr[5][0]), font)
        //this.tvText.visible = false;

        //this.endorsementText = game.add.text(460,440,'Political Endorsement Upgrade Price: ' + fixNum(prArr[6][0]), font)
        //this.endorsementText.visible = false;

        //this.allianceText = game.add.text(460,440,'Political Alliance Upgrade Price: ' + fixNum(prArr[7][0]), font)
        //this.allianceText.visible = false;

        //this.cRallyText = game.add.text(460,440,'Clinton Rally Upgrade Price: ' + fixNum(prArr[8][0]), font)
        //this.cRallyText.visible = false;

        //this.tRallyText = game.add.text(460,440,'Trump Rally Upgrade Price: ' + fixNum(prArr[8][0]), font)
        //this.tRallyText.visible = false;

        //this.voteMakerText = game.add.text(460,440,'Vote Maker Upgrade Price: ' + fixNum(prArr[9][0]), font)
        //this.voteMakerText.visible = false;

        //this.emailServerText = game.add.text(460,440,'Email Server Upgrade Price: ' + fixNum(prArr[9][0]), font)
        //this.emailServerText.visible = false;




        //this.doorText = game.add.text(460,455,'Upgrade Rate: ' + fixNum(Math.floor(playerData.upgradeUnlocks)),
            //font)
        //this.doorText.visible = true;

        //this.staffText = game.add.text(460,455,'Upgrade Rate:  ' + fixNum(Math.floor(playerData.upgradeUnlocks)),
            //font)
        //this.staffText.visible = false;

        //this.merchandiseText = game.add.text(460,455,'Upgrade Rate: ' + fixNum(Math.floor(playerData.upgradeUnlocks)),
           // font)
        //this.merchandiseText.visible = false;

        //this.picketText = game.add.text(460,455,'Upgrade Rate: ' + fixNum(Math.floor(playerData.upgradeUnlocks)),
          //  font)
       // this.picketText.visible = false;

        //this.radioText = game.add.text(460,455,'Upgrade Rate: ' + fixNum(Math.floor(playerData.upgradeUnlocks)),
            //font)
        //this.radioText.visible = false;

        //this.tvText = game.add.text(460,455,'Upgrade Rate: ' + fixNum(Math.floor(playerData.upgradeUnlocks)),
           // font)
       // this.tvText.visible = false;

       // this.endorsementText = game.add.text(460,455,'Upgrade Rate: ' + fixNum(Math.floor(playerData.upgradeUnlocks)),
       //     font)
        //this.endorsementText.visible = false;

        //this.allianceText = game.add.text(460,455,'Upgrade Rate: ' + fixNum(Math.floor(playerData.upgradeUnlocks)),
//font)
       // this.allianceText.visible = false;

       // this.cRallyText = game.add.text(460,455,'Upgrade Rate: ' + fixNum(Math.floor(playerData.upgradeUnlocks)),
           // font)
//this.cRallyText.visible = false;

        //this.tRallyText = game.add.text(460,455,'Upgrade Rate: ' + fixNum(Math.floor(playerData.upgradeUnlocks)),
         //   font)
        //this.tRallyText.visible = false;

       // this.voteMakerText = game.add.text(460,455,'Upgrade Rate: ' + fixNum(Math.floor(playerData.upgradeUnlocks)),
//font)
       // this.voteMakerText.visible = false;

       // this.emailServerText = game.add.text(460,455,'Upgrade Rate: ' + fixNum(Math.floor(playerData.upgradeUnlocks)),
        //    font)
        //this.emailServerText.visible = false;






        // Frame counter
        // =600 : reset to 0, save cookie
        // even : calculate votes
        this.frameCounter = -1;

        save(playerData);
        this.serverCall();

        this.scrollBarY = 300;

        this.placeUpgradeButtons();
    },

    update: function() { // -UPDATE-
        if(this.frameCounter === -1){
            var but; //shorthand for specific button used when tracking button visibility
        }
        this.frameCounter++;

        if (this.frameCounter === 60) {
            this.frameCounter = 0;
            this.serverCall();
        }

        // updating vote totals
        if ((this.frameCounter % 4) === 0) {
            this.addVotes(playerData.upgrades);
        }

        for (var k = 0; k < playerData.upgrades.length; k++) {
            if (playerData.voteCredits > playerData.upgrades[k][4][0][0]) {
                buttons[k].buy.alpha = 1;
            } else buttons[k].buy.alpha = 0.5;
        }

        // checking which version of the upgrade
        // button pictures should be shown
        if (this.frameCounter % 25 === 0){ // Every 45th frame
            for (var i = 0; i < upgradeCatalogue.length; i++) { // for each item in upgradeCatalogue
                if (playerData.votes > bPrArr[i] * 0.75){ // if player votes > 3/4 price of upgrade (row)
                    but = buttons[i];
                    but.frame.visible = true;
                    but.buy.visible = true;
                    for (var n = 0; n < but.ups.length; n++){ //for each item in the rows upgrades (star) list
                        if (but.ups[n].visible === false){ //if invisible, make visible
                            but.ups[n].visible = true;
                        }
                        if (playerData.upgrades[i][0] >= upgradeUnlocks[n]) { // if # bought > unlock requirement
                            if (but.ups[n].key === 'starLocked'){ // if locked set to too expensive
                                but.ups[n].loadTexture('starTooCostly');
                            }
                            if (but.ups[n].key === 'starTooCostly' && playerData.voteCredits >= prArr[i][n+1]){
                                but.ups[n].loadTexture('starBuyable'); //if image is too costly and it's not set to buyable
                            }
                            if (but.ups[n].key === 'starBuyable' && playerData.voteCredits < prArr[i][n+1]){
                                but.ups[n].loadTexture('starTooCostly'); // if set to buyable and it's too costly change image
                            }
                            if (playerData.upgrades[i][3][n] === 1){ //if image is set to buyable but the purchase list array
                                but.ups[n].loadTexture('starBought'); //says it was bought change image
                            }
                    }}
            }}
        }
    },

    clicked: function() {
        //vote changes
        playerData.votes += playerData.votesPerClick;
        this.playerVotesText.setText("Your Votes: " + fixNum(Math.floor(playerData.votes)));

        //currency changes
        playerData.voteCredits += playerData.votesPerClick;
        this.playerVoteCreditsText.setText("Your Vote Credits: " + fixNum(Math.floor(playerData.voteCredits)),
            font)
    },

    addVotes: function(upgrades) {
        //increasing votes from passive sources
        var change;
        var multiplier = 1;
            for (var a in upgrades) {
                for (var i = 0; i < upgrades[a][3].length; i++){
                    if (upgrades[a][3][i] === 1) { multiplier *= 2; }
                }
                change = upgrades[a][0] * upgrades[a][1] / upgrades[a][2] * multiplier;
                playerData.votes += change;
                playerData.voteCredits += change;
            }
        this.playerVotesText.setText("Your Votes: " + fixNum(Math.floor(playerData.votes)));

        //currency changes
        this.playerVoteCreditsText.setText("Your Vote Credits: " + fixNum(Math.floor(playerData.voteCredits)),
            font)

    },

    serverCall: function() {
        var totalVotes = {};
        dpd.votes.get(function (result, err) {
            if(err) return console.log(err);
            totalVotes = result[0];
            tVTText.setText('Trump Votes: ' + fixNum(totalVotes.trump));
            cVTText.setText('Clinton Votes: ' + fixNum(totalVotes.clinton));
        });

        save(playerData);
    },

    placeUpgradeButtons: function() {
        var anchorXPos = game.width - Math.floor(1.1 * this.wQuarter); //make me relative with landmarks
        var Y = Math.floor(this.hTenth); //make me relative with landmarks

        var upKey;
        if(playerData.selectedCandidate === 'trump') {
            upKey = 1;
        } else {
            upKey = 2;
        }

        var heightDiff;
        var rowHeight;
        var up1X = Math.floor(game.height / 17.7); // 10/177 = average up button width/game height
        var offset = Math.floor(up1X * 0.9);
        var but;

        for (var i = 0; i < upgradeCatalogue.length; i++) {

            buttons[i] = {};
            but = buttons[i];

            but.frame = game.add.image(anchorXPos, Y, 'upgradeBar');

            console.log(but.frame.right);

            but.buy = game.add.image(anchorXPos, Y, upgradeCatalogue[i][upKey]);

            heightDiff = Math.floor((but.frame.height - but.buy.height) / 2);
            rowHeight = Y + heightDiff + but.buy.height / 2;

            but.buy.anchor.setTo(0.5, 0.5);
            but.buy.x += heightDiff + Math.floor(but.buy.height/2);
            but.buy.y = rowHeight;

            if (up1X < this.wHalf){
                up1X += but.buy.x;
            }

            but.ups = [];

            but.ups[0] = game.add.image(up1X, rowHeight, 'starLocked');
            but.ups[0].anchor.setTo(0, 0.5);

            but.ups[1] = game.add.image(up1X + offset, rowHeight, 'starLocked');
            but.ups[1].anchor.setTo(0, 0.5);

            but.ups[2] = game.add.image(up1X + offset * 2, rowHeight, 'starLocked');
            but.ups[2].anchor.setTo(0, 0.5);

            but.ups[3] = game.add.image(up1X + offset * 3, rowHeight, 'starLocked');
            but.ups[3].anchor.setTo(0, 0.5);

            but.frame.visible = false;

            var iStore = i;

            but.buy.visible = false;
            but.buy.inputEnabled = true;

            but.ups[0].visible = false;
            but.ups[0].inputEnabled = true;

            but.ups[1].visible = false;
            but.ups[1].inputEnabled = true;

            but.ups[2].visible = false;
            but.ups[2].inputEnabled = true;

            but.ups[3].visible = false;
            but.ups[3].inputEnabled = true;

            Y += but.frame.height;
        }
            // buy passive buttons
            buttons[0].buy.events.onInputDown.add(buy.buyT1, this);
            buttons[1].buy.events.onInputDown.add(buy.buyT2, this);
            buttons[2].buy.events.onInputDown.add(buy.buyT3, this);
            buttons[3].buy.events.onInputDown.add(buy.buyT4, this);
            buttons[4].buy.events.onInputDown.add(buy.buyT5, this);
            buttons[5].buy.events.onInputDown.add(buy.buyT6, this);
            buttons[6].buy.events.onInputDown.add(buy.buyT7, this);
            buttons[7].buy.events.onInputDown.add(buy.buyT8, this);
            buttons[8].buy.events.onInputDown.add(buy.buyT9, this);
            buttons[9].buy.events.onInputDown.add(buy.buyT10, this);

            // buy passive upgrade row 1 buttons
            buttons[0].ups[0].events.onInputDown.add(buy.buyT1up1, this);
            buttons[0].ups[1].events.onInputDown.add(buy.buyT1up2, this);
            buttons[0].ups[2].events.onInputDown.add(buy.buyT1up3, this);
            buttons[0].ups[3].events.onInputDown.add(buy.buyT1up4, this);

            // buy passive upgrade row 2 buttons
            buttons[1].ups[0].events.onInputDown.add(buy.buyT2up1, this);
            buttons[1].ups[1].events.onInputDown.add(buy.buyT2up2, this);
            buttons[1].ups[2].events.onInputDown.add(buy.buyT2up3, this);
            buttons[1].ups[3].events.onInputDown.add(buy.buyT2up4, this);

            // buy passive upgrade row 3 buttons
            buttons[2].ups[0].events.onInputDown.add(buy.buyT3up1, this);
            buttons[2].ups[1].events.onInputDown.add(buy.buyT3up2, this);
            buttons[2].ups[2].events.onInputDown.add(buy.buyT3up3, this);
            buttons[2].ups[3].events.onInputDown.add(buy.buyT3up4, this);

            // buy passive upgrade row 4 buttons
            buttons[3].ups[0].events.onInputDown.add(buy.buyT4up1, this);
            buttons[3].ups[1].events.onInputDown.add(buy.buyT4up2, this);
            buttons[3].ups[2].events.onInputDown.add(buy.buyT4up3, this);
            buttons[3].ups[3].events.onInputDown.add(buy.buyT4up4, this);

            // buy passive upgrade row 5 buttons
            buttons[4].ups[0].events.onInputDown.add(buy.buyT5up1, this);
            buttons[4].ups[1].events.onInputDown.add(buy.buyT5up2, this);
            buttons[4].ups[2].events.onInputDown.add(buy.buyT5up3, this);
            buttons[4].ups[3].events.onInputDown.add(buy.buyT5up4, this);

            // buy passive upgrade row 6 buttons
            buttons[5].ups[0].events.onInputDown.add(buy.buyT6up1, this);
            buttons[5].ups[1].events.onInputDown.add(buy.buyT6up2, this);
            buttons[5].ups[2].events.onInputDown.add(buy.buyT6up3, this);
            buttons[5].ups[3].events.onInputDown.add(buy.buyT6up4, this);

            // buy passive upgrade row 7 buttons
            buttons[6].ups[0].events.onInputDown.add(buy.buyT7up1, this);
            buttons[6].ups[1].events.onInputDown.add(buy.buyT7up2, this);
            buttons[6].ups[2].events.onInputDown.add(buy.buyT7up3, this);
            buttons[6].ups[3].events.onInputDown.add(buy.buyT7up4, this);

            // buy passive upgrade row 8 buttons
            buttons[7].ups[0].events.onInputDown.add(buy.buyT8up1, this);
            buttons[7].ups[1].events.onInputDown.add(buy.buyT8up2, this);
            buttons[7].ups[2].events.onInputDown.add(buy.buyT8up3, this);
            buttons[7].ups[3].events.onInputDown.add(buy.buyT8up4, this);
            
            // buy passive upgrade row 9 buttons
            buttons[8].ups[0].events.onInputDown.add(buy.buyT9up1, this);
            buttons[8].ups[1].events.onInputDown.add(buy.buyT9up2, this);
            buttons[8].ups[2].events.onInputDown.add(buy.buyT9up3, this);
            buttons[8].ups[3].events.onInputDown.add(buy.buyT9up4, this);
            
            // buy passive upgrade row 10 buttons
            buttons[9].ups[0].events.onInputDown.add(buy.buyT10up1, this);
            buttons[9].ups[1].events.onInputDown.add(buy.buyT10up2, this);
            buttons[9].ups[2].events.onInputDown.add(buy.buyT10up3, this);
            buttons[9].ups[3].events.onInputDown.add(buy.buyT10up4, this);


            //adding text objects
            var but = buttons[0];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[0][0]), smallFont);
            but.numText.anchor.setTo(1.4, 0.5);

            var but = buttons[1];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[1][0]), smallFont);
            but.numText.anchor.setTo(1.4, 0.5);

            var but = buttons[2];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[2][0]), smallFont);
            but.numText.anchor.setTo(1.4, 0.5);

            var but = buttons[3];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[3][0]), smallFont);
            but.numText.anchor.setTo(1.4, 0.5);

            var but = buttons[4];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[4][0]), smallFont);
            but.numText.anchor.setTo(1.4, 0.5);

            var but = buttons[5];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[5][0]), smallFont);
            but.numText.anchor.setTo(1.4, 0.5);

            var but = buttons[6];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[6][0]), smallFont);
            but.numText.anchor.setTo(1.4, 0.5);

            var but = buttons[7];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[7][0]), smallFont);
            but.numText.anchor.setTo(1.4, 0.5);

            var but = buttons[8];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[8][0]), smallFont);
            but.numText.anchor.setTo(1.4, 0.5);
            
            var but = buttons[9];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[9][0]), smallFont);
            but.numText.anchor.setTo(1.4, 0.5);
    }

}