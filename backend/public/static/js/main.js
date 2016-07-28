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
        if (playerData.selectedCandidate === 'trump') {
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
            playerStatText.three.x, //X POSITION
            playerStatText.three.y, //Y Position
            "Fancy Pens: " + fixNum(playerData.fancyPens), font);
        if (playerData.fancyPens === 0) {
            this.fancyPenText.visible = false;
        }

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

        // Frame counter
        // =600 : reset to 0, save cookie
        // even : calculate votes
        this.frameCounter = -1;

        save(playerData);
        this.serverCall();

        this.placeUpgradeButtons();

        buttons[0].frame.visible = true; //Shows first tier from the start, not unlockable
        buttons[0].buy.visible = true;

         //restart

        this.buttonRestart = this.add.sprite(17, 155, 'buttonRestart');
        this.buttonRestart.anchor.set(0.0);
        this.buttonRestart.inputEnabled = true;
        this.buttonRestart.events.onInputDown.add(this.restart, this);
        this.buttonRestart.visible = false;
         

        //Volume/Mute controls
        this.vol = this.add.sprite(14, 430, 'vol');
        this.vol.anchor.set(0.0);
        this.vol.inputEnabled = true;
        this.vol.events.onInputDown.add(this.volSelectOff, this);

        this.volOff = this.add.sprite(14, 430, 'volOff');
        this.volOff.anchor.set(0.0);
        this.volOff.inputEnabled = true;
        this.volOff.events.onInputDown.add(this.volSelectOn, this);
        this.volOff.visible = false;
    },

    update: function() { // -UPDATE-
        //shorthand for specific button used when tracking button visibility
        //This is needed in the for loop, just keeps the variable declaration outside the loop
        if (this.frameCounter === -1) {
            var but;
        }
        this.frameCounter++;

        //reseting this.frameCounter every 1000th frame
        if (this.frameCounter === 1000) {
            this.frameCounter = 0;
        }
        //calling server every 60th frame
        if (this.frameCounter % 120 === 0) {
            this.serverCall();
            
            //making restart button visible
            if (playerData.votes >= 10000 && this.buttonRestart.visible === false) {
                this.buttonRestart.visible = true;
                this.fancyPenText.visible = true;
            }
        }
        // updating vote totals
        if (this.frameCounter % 15 === 0) {
            this.addVotes(playerData.upgrades);
        }

        // checking which version of the upgrade
        // button pictures should be shown
        if (this.frameCounter % 25 === 0) {
            for (var i = 0; i < upgradeCatalogue.length; i++) { // for each item in upgradeCatalogue
                if (playerData.votes > bPrArr[i] * 0.75) { // if player votes > 3/4 price of upgrade (row)
                    but = buttons[i];
                    but.frame.visible = true;
                    but.buy.visible = true;
                    but.numText.visible = true;
                    for (var n = 0; n < but.ups.length; n++) { //for each item in the rows upgrades (star) list
                        if (but.ups[n].visible === false) { //if invisible, make visible
                            but.ups[n].visible = true;
                        }
                        if (playerData.upgrades[i][0] >= upgradeUnlocks[n]) { // if # bought > unlock requirement
                            if (but.ups[n].key === 'starLocked') { // if locked set to too expensive
                                but.ups[n].loadTexture('starTooCostly');
                            }
                            if (but.ups[n].key === 'starTooCostly' && playerData.voteCredits >= prArr[i][n + 1]) {
                                but.ups[n].loadTexture('starBuyable'); //if image is too costly and it's not set to buyable
                            }
                            if (but.ups[n].key === 'starBuyable' && playerData.voteCredits < prArr[i][n + 1]) {
                                but.ups[n].loadTexture('starTooCostly'); // if set to buyable and it's too costly change image
                            }
                            if (playerData.upgrades[i][3][n] === 1) { //if image is set to buyable but the purchase list array
                                but.ups[n].loadTexture('starBought'); //says it was bought change image
                            }
                        }
                    }
                }
            }
        }

        //checking currency sufficiency for each buy button
        for (var k = 0; k < playerData.upgrades.length; k++) {
            if (playerData.voteCredits > playerData.upgrades[k][4][0][0]) {
                buttons[k].buy.alpha = 1;
            } else buttons[k].buy.alpha = 0.5;
        }

    },

    restart: function() {
        playerData.fancyPens += (playerData.votes / 10000)
        playerData.votes = 0;
        playerData.voteCredits = 0;
        this.fancyPenText.setText('Fancy Pens: ' + fixNum(playerData.fancyPens));
        playerData.upgrades = initialUps;
    },

    clicked: function() {
        var click = playerData.votesPerClick;
        //vote changes
        playerData.votes += click + click * playerData.fancyPens * 0.01;
        this.playerVotesText.setText("Your Votes: " + fixNum(Math.floor(playerData.votes)));

        //currency changes
        playerData.voteCredits += click + click * playerData.fancyPens * 0.01;
        this.playerVoteCreditsText.setText("Your Vote Credits: " + fixNum(Math.floor(playerData.voteCredits)),
            font)
    },

    addVotes: function(upgrades) {
        //increasing votes from passive sources
        var change = 0;

        for (var a = 0; a < upgrades.length; a++) {
            change += productionCalc(upgrades[a]);
        }
        playerData.votes += change + change * playerData.fancyPens * 0.1;
        playerData.voteCredits += change + change * playerData.fancyPens * 0.1;
        this.playerVotesText.setText("Your Votes: " + fixNum(Math.floor(playerData.votes)));

        //currency changes
        this.playerVoteCreditsText.setText("Your Vote Credits: " + fixNum(Math.floor(playerData.voteCredits)),
            font)
    },

    volSelectOff: function() {
        game.sound.mute = true;
        this.vol.visible = false;
        this.volOff.visible = true;

    },

    volSelectOn: function() {
        game.sound.mute = false;
        this.vol.visible = true;
        this.volOff.visible = false;
    },

    serverCall: function() {
        var totalVotes = {};
        dpd.votes.get(function(result, err) {
            if (err) return console.log(err);
            totalVotes = result[0];
            tVTText.setText('Trump: ' + fixNum(totalVotes.trump));
            cVTText.setText('Clinton: ' + fixNum(totalVotes.clinton));
        });
        save(playerData);
    },

    placeUpgradeButtons: function() {
        var anchorXPos = game.width - Math.floor(1.13 * this.wQuarter); // X Position of Upgrades
        var Y = Math.floor(this.hTenth * 0.1); //make me relative with landmarks

        var upKey;
        if (playerData.selectedCandidate === 'trump') {
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
            but.buy.x += heightDiff + Math.floor(but.buy.height / 2);
            but.buy.y = rowHeight;
            but.buy.inputEnabled = true;

            if (up1X < this.wHalf) {
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

        // buy buttons & mouse over/out callbacks
        for (i = 0; i < buttons.length; i++) {
            buttons[i].buy.events.onInputDown.add(buy.buy, this);
            buttons[i].buy.events.onInputOut.add(buy.out, this);
            buttons[i].buy.events.onInputOver.add(buy.over, this);
        }

        // T1 Buy
        buttons[0].ups[0].events.onInputDown.add(buy.buyT1up1, this);
        buttons[0].ups[1].events.onInputDown.add(buy.buyT1up2, this);
        buttons[0].ups[2].events.onInputDown.add(buy.buyT1up3, this);
        buttons[0].ups[3].events.onInputDown.add(buy.buyT1up4, this);

        // T2 Buy
        buttons[1].ups[0].events.onInputDown.add(buy.buyT2up1, this);
        buttons[1].ups[1].events.onInputDown.add(buy.buyT2up2, this);
        buttons[1].ups[2].events.onInputDown.add(buy.buyT2up3, this);
        buttons[1].ups[3].events.onInputDown.add(buy.buyT2up4, this);

        // T3 Buy
        buttons[2].ups[0].events.onInputDown.add(buy.buyT3up1, this);
        buttons[2].ups[1].events.onInputDown.add(buy.buyT3up2, this);
        buttons[2].ups[2].events.onInputDown.add(buy.buyT3up3, this);
        buttons[2].ups[3].events.onInputDown.add(buy.buyT3up4, this);

        // T4 Buy
        buttons[3].ups[0].events.onInputDown.add(buy.buyT4up1, this);
        buttons[3].ups[1].events.onInputDown.add(buy.buyT4up2, this);
        buttons[3].ups[2].events.onInputDown.add(buy.buyT4up3, this);
        buttons[3].ups[3].events.onInputDown.add(buy.buyT4up4, this);

        // T5 Buy
        buttons[4].ups[0].events.onInputDown.add(buy.buyT5up1, this);
        buttons[4].ups[1].events.onInputDown.add(buy.buyT5up2, this);
        buttons[4].ups[2].events.onInputDown.add(buy.buyT5up3, this);
        buttons[4].ups[3].events.onInputDown.add(buy.buyT5up4, this);

        // T6 Buy
        buttons[5].ups[0].events.onInputDown.add(buy.buyT6up1, this);
        buttons[5].ups[1].events.onInputDown.add(buy.buyT6up2, this);
        buttons[5].ups[2].events.onInputDown.add(buy.buyT6up3, this);
        buttons[5].ups[3].events.onInputDown.add(buy.buyT6up4, this);

        // T7 Buy
        buttons[6].ups[0].events.onInputDown.add(buy.buyT7up1, this);
        buttons[6].ups[1].events.onInputDown.add(buy.buyT7up2, this);
        buttons[6].ups[2].events.onInputDown.add(buy.buyT7up3, this);
        buttons[6].ups[3].events.onInputDown.add(buy.buyT7up4, this);

        // T8 Buy
        buttons[7].ups[0].events.onInputDown.add(buy.buyT8up1, this);
        buttons[7].ups[1].events.onInputDown.add(buy.buyT8up2, this);
        buttons[7].ups[2].events.onInputDown.add(buy.buyT8up3, this);
        buttons[7].ups[3].events.onInputDown.add(buy.buyT8up4, this);

        // T9 Buy
        buttons[8].ups[0].events.onInputDown.add(buy.buyT9up1, this);
        buttons[8].ups[1].events.onInputDown.add(buy.buyT9up2, this);
        buttons[8].ups[2].events.onInputDown.add(buy.buyT9up3, this);
        buttons[8].ups[3].events.onInputDown.add(buy.buyT9up4, this);

        // T10 Buy
        buttons[9].ups[0].events.onInputDown.add(buy.buyT10up1, this);
        buttons[9].ups[1].events.onInputDown.add(buy.buyT10up2, this);
        buttons[9].ups[2].events.onInputDown.add(buy.buyT10up3, this);
        buttons[9].ups[3].events.onInputDown.add(buy.buyT10up4, this);

        //Passive quantity texts
        var but;
        for (n = 0; n < upgradeCatalogue.length; n++) {
            but = buttons[n];
            but.numText = game.add.text(
                    but.frame.right, //X Position
                    but.frame.y + but.frame.height / 1.75, //Y Position
                    fixNum(playerData.upgrades[n][0]), //Text to be displayed
                    smallFont) //Font
            but.numText.anchor.setTo(1.4, 0.5);
            but.numText.visible = false;
        }

        //text for upgrades
        upgradeBox = game.add.image(
            Math.floor(this.wHalf * 0.95), 
            Math.floor(this.hQuarter * 1.1), 
            'box');
        upgradeBox.visible = false;

        //[0] = Title
        //[1] = Price
        //[3] = Current Production
        //[5] = Quote
        upgradeTexts[0] = game.add.text(upPos.title.x, upPos.title.y, '', font);
        upgradeTexts[0].visible = false;
        upgradeTexts[1] = game.add.text(upPos.price.x, upPos.price.y, '', smallFont);
        upgradeTexts[1].visible = false;
        upgradeTexts[3] = game.add.text(upPos.production.x, upPos.production.y, '', smallFont);
        upgradeTexts[3].visible = false;
        upgradeTexts[5] = game.add.text(upPos.quote.x, upPos.quote.y, '', smallFont)

        upgradeTexts[2] = 'Price: ';
        upgradeTexts[4] = 'Current: ';

        //Assigning the starOver function to each of the stars for each tier
        for (i = 0; i < buttons.length; i++) { //Rows
            for (n = 0; n < buttons[i].ups.length; n++) {
                buttons[i].ups[n].events.onInputOver.add(buy.starOver, this);
                buttons[i].ups[n].events.onInputOut.add(buy.starOff, this);
            }
        }

        starText = game.add.text(upPos.title.x, upPos.title.y, 'Stars double a \ntier\'s production', font);
        starText.visible = false;
    }
}