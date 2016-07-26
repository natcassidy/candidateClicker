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

        //container object for text slots
        var playerStatText = {};

        playerStatText.one = {
            x: Math.floor(this.wTenth * 0.25),
            y: Math.floor(this.hTenth * 1.40)
        };
        playerStatText.two = {
            x: Math.floor(this.wTenth * 0.25),
            y: Math.floor(this.hTenth * 1.75)
        };
        playerStatText.three = {
            x: Math.floor(this.wTenth * 0.25),
            y: Math.floor(this.hTenth * 2.10)
        };

        var totTextPos = {};
        totTextPos.header = {
            x: Math.floor(this.wHalf * 0.8),
            y: Math.floor(this.hTenth)
        };
        totTextPos.one = {
            x: Math.floor(this.wHalf * 0.8),
            y: Math.floor(this.hTenth * 1.5)
        };
        totTextPos.two = {
            x: Math.floor(this.wHalf * 0.8),
            y: Math.floor(this.hTenth * 1.9)
        };

        // Player vote text
        this.playerVotesText = game.add.text(
            playerStatText.one.x, //X POSITION
            playerStatText.one.y, //Y Position
            "Your Votes: " + fixNum(playerData.votes),
            font);

        // Player vote credit text
        this.playerVoteCreditsText = game.add.text(
            playerStatText.two.x, //X POSITION
            playerStatText.two.y, //Y Position
            "Your Vote Credits: " + fixNum(playerData.voteCredits),
            font);

        // Fancy Pen text
        this.fancyPenText = game.add.text(
            playerStatText.three.x,  //X POSITION
            playerStatText.three.y,                                     //Y Position
            "Fancy Pens: " + fixNum(playerData.fancyPens));
        this.fancyPenText.visible = false;
        
        // Total vote text
        totVotText = game.add.text( //indicates that these vote numbers are for all players together
            totTextPos.header.x,
            totTextPos.header.y,
            'All Votes',
            headerFont
        );

        tVTText = game.add.text(
            totTextPos.one.x,
            totTextPos.one.y,
            'Trump: ',
            font);
            tVTText.anchor.setTo(0, 0);

        cVTText = game.add.text(
            totTextPos.two.x,
            totTextPos.two.y,
            'Clinton: ',
            font);
            cVTText.anchor.setTo(0, 0);


        //text for upgrades

        var upPos = {};
        upPos.top = {
            x: this.wQuarter * 2.9,
            y: this.hQuarter * 3.7
        };
        upPos.bottom = {
            x: this.wQuarter * 2.9,
            y: this.hQuarter * 3.8
        };

        
        // This contains the (usually invisible) text 
        // objects at the bottom of the screen that show 
        // the price for the next purchase and the current 
        // production rate
        upgradeTexts[0] = game.add.text(upPos.top.x, upPos.top.y, '', smallFont);
        upgradeTexts[0].visible = false;
        upgradeTexts[2] = game.add.text(upPos.bottom.x, upPos.bottom.y, '', smallFont);
        upgradeTexts[2].visible = false;
        
        upgradeTexts[1] = 'Price: ';
        upgradeTexts[3] = 'Current: ';

        upgradeTexts[(upgradeTexts.length - 2)] + fixNum(prArr[9][0]);

        // Frame counter
        // =600 : reset to 0, save cookie
        // even : calculate votes
        this.frameCounter = -1;

        save(playerData);
        this.serverCall();

        this.scrollBarY = 300;

        this.placeUpgradeButtons();

        buttons[0].frame.visible = true;
        buttons[0].buy.visible = true;
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
        if (this.frameCounter % 25 === 0){ // Every 25th frame
            for (var i = 0; i < upgradeCatalogue.length; i++) { // for each item in upgradeCatalogue
                if (playerData.votes > bPrArr[i] * 0.75){ // if player votes > 3/4 price of upgrade (row)
                    but = buttons[i];
                    but.frame.visible = true;
                    but.buy.visible = true;
                    but.numText.visible = true;
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
        var change = 0;

        for (var a = 0; a < upgrades.length; a++){
            change += productionCalc(upgrades[a]);
        }
        playerData.votes += change;
        playerData.voteCredits += change;
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
            tVTText.setText('Trump: ' + fixNum(totalVotes.trump));
            cVTText.setText('Clinton: ' + fixNum(totalVotes.clinton));
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
            but.frame.visible = false;

            but.buy = game.add.image(anchorXPos, Y, upgradeCatalogue[i][upKey]);
            but.buy.visible = false;

            heightDiff = Math.floor((but.frame.height - but.buy.height) / 2);
            rowHeight = Y + heightDiff + but.buy.height / 2;

            but.buy.anchor.setTo(0.5, 0.5);
            but.buy.x += heightDiff + Math.floor(but.buy.height/2);
            but.buy.y = rowHeight;
            but.buy.inputEnabled = true;

            if (up1X < this.wHalf){
                up1X += but.buy.x;
            }

            but.ups = [];
            for (var k = 0; k < 4; k++) {
                but.ups[k] = game.add.image(up1X + (offset * k), rowHeight, 'starLocked');
                but.ups[k].anchor.setTo(0, 0.5);
                but.ups[k].visible = false;
                but.ups[k].inputEnabled = true;
            }

            Y += but.frame.height;
        }
            // buy buttons & mouse over callbacks
            buttons[0].buy.events.onInputDown.add(buy.t1.buy, this);
            buttons[0].buy.events.onInputOver.add(buy.t1.over, this);
            buttons[1].buy.events.onInputDown.add(buy.t2.buy, this);
            buttons[1].buy.events.onInputOver.add(buy.t2.over, this);
            buttons[2].buy.events.onInputDown.add(buy.t3.buy, this);
            buttons[2].buy.events.onInputOver.add(buy.t3.over, this);
            buttons[3].buy.events.onInputDown.add(buy.t4.buy, this);
            buttons[3].buy.events.onInputOver.add(buy.t4.over, this);
            buttons[4].buy.events.onInputDown.add(buy.t5.buy, this);
            buttons[4].buy.events.onInputOver.add(buy.t5.over, this);
            buttons[5].buy.events.onInputDown.add(buy.t6.buy, this);
            buttons[5].buy.events.onInputOver.add(buy.t6.over, this);
            buttons[6].buy.events.onInputDown.add(buy.t7.buy, this);
            buttons[6].buy.events.onInputOver.add(buy.t7.over, this);
            buttons[7].buy.events.onInputDown.add(buy.t8.buy, this);
            buttons[7].buy.events.onInputOver.add(buy.t8.over, this);
            buttons[8].buy.events.onInputDown.add(buy.t9.buy, this);
            buttons[8].buy.events.onInputOver.add(buy.t9.over, this);
            buttons[9].buy.events.onInputDown.add(buy.t10.buy, this);
            buttons[9].buy.events.onInputOver.add(buy.t10.over, this);
            
            //mouse off callback
            for (var p = 0; p < buttons.length; p++){
                buttons[p].buy.events.onInputOut.add(buy.out, this);
            }

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

            var but = buttons[1];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[1][0]), smallFont);

            var but = buttons[2];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[2][0]), smallFont);

            var but = buttons[3];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[3][0]), smallFont);

            var but = buttons[4];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[4][0]), smallFont);

            var but = buttons[5];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[5][0]), smallFont);

            var but = buttons[6];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[6][0]), smallFont);

            var but = buttons[7];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[7][0]), smallFont);

            var but = buttons[8];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[8][0]), smallFont);
            
            var but = buttons[9];
            but.numText = game.add.text(but.frame.right, but.frame.y + but.frame.height / 1.75, fixNum(playerData.upgrades[9][0]), smallFont);;

            for (var h = 0; h < buttons.length; h++) {
                buttons[h].numText.anchor.setTo(1.4, 0.5);
                buttons[h].numText.visible = false;
            }
    }

}