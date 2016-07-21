myGame.main = function(game) {};

myGame.main.prototype = {
    preload: function() { // -PRELOAD-

    },

    create: function() { // -CREATE-

        game.stage.setBackgroundColor(0x2d2d2d);

        this.lost = false;

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

        // Background images --HANDLES SELECTION OF CANDIDATE FROM MAINMENU--
        if (true){
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

        var font = { font: 'Pixel', fill: '#ffffff' };

        // Total vote text
        tVTText = game.add.text(
            Math.floor(this.wTenth * 0.2),
            Math.floor(this.hTenth * 1.3),
            'Trump Votes: ',
            font);

        cVTText = game.add.text(
            Math.floor(this.wTenth * 0.2),
            tVTText.y + tVTText.height,
            'Clinton Votes: ',
            font);

        // Player vote text
        this.playerVotesText = game.add.text(
            tVTText.x + tVTText.width + this.hTenth,  //X POSITION
            tVTText.y,                                     //Y Position
            "Your Votes: " + playerData.votes,
            font);

        // Fancy Pen text
        this.fancyPenText = game.add.text(
            tVTText.x + tVTText.width + this.hTenth,  //X POSITION
            cVTText.y,                                     //Y Position
            "Fancy Pens: " + playerData.fancyPens);
        this.fancyPenText.visible = false;


        // Frame counter
        // =600 : reset to 0, save cookie
        // even : calculate votes
        this.frameCounter = 0;

        save(playerData);
        this.serverCall();

        playerData.upgrades[0][0] = 1; //campaignStaff is index 0, count is the next index
/*
        this.upgradeBarCalc(this.selectionArray, 9, this.leftButton, this.rightButton);

        this.selectionArray = [
            testSprite = this.add.sprite(0, this.scrollBarY, 'upgradeBar'),
            testSprite2 = this.add.sprite(0, this.scrollBarY, 'upgradeBar'),
            testSprite3 = this.add.sprite(0, this.scrollBarY, 'upgradeBar'),
            testSprite4 = this.add.sprite(0, this.scrollBarY, 'upgradeBar'),
            testSprite5 = this.add.sprite(0, this.scrollBarY, 'upgradeBar'),
            testSprite6 = this.add.sprite(0, this.scrollBarY, 'upgradeBar'),
            testSprite7 = this.add.sprite(0, this.scrollBarY, 'upgradeBar'),
            testSprite8 = this.add.sprite(0, this.scrollBarY, 'upgradeBar'),
            testSprite9 = this.add.sprite(0, this.scrollBarY, 'upgradeBar'),

        ];

        this.scrollBarY = 300;
*/
    },

    update: function() { // -UPDATE-
        this.frameCounter++;

        if (this.frameCounter === 60) {
            this.frameCounter = 0;
            this.serverCall();
        }

        // updating vote totals
        if ((this.frameCounter % 4) === 0) {
            this.addVotes(playerData.upgrades);
        }
    },

    clicked: function() {
        playerData.votes += playerData.votesPerClick;
        this.playerVotesText.setText("Your Votes: " + Math.floor(playerData.votes));
        //currency changes
    },

    addVotes: function(upgrades) {
        //increasing votes from passive sources
        var change;
            for (var a in upgrades) {
                change = upgrades[a][0] * upgrades[a][1] / upgrades[a][2];
                playerData.votes += change;
            }
        this.playerVotesText.setText("Your Votes: " + Math.floor(playerData.votes));

    },

    serverCall: function() {
        var totalVotes = {};
        dpd.votes.get(function (result, err) {
            if(err) return console.log(err);
            totalVotes = result[0];
            tVTText.setText('Trump Votes: ' + totalVotes.trump);
            cVTText.setText('Clinton Votes: ' + totalVotes.clinton);
        });

        save(playerData);
    },

    buyUpgrade: function(upgrade) {
        upgrade.count += 1;
    },
/*
    upgradeBarCalc: function(array, slots, offsetLeft, offsetRight) {

        //Offsets are optional parameters that allow accounting for framing beyond the
        if (offsetLeft === undefined) { offsetLeft = 0; }
        if (offsetRight === undefined) { offsetRight = 0; }

        var calcPositions = function(array, slots) {
            for (i=0;i < array.length; i++){
                if (i < slots.length){
                    array[i].x = slots[i];
                }
                else {
                    array[i].x = -100;
                }
            }
            return array;
        }

        // var totalWidth = 0;
        // for (i = 0; i < array.length; i++){
        //     totalWidth += array[i].width;
        //     }

        // var avgWidth = totalWidth/array.length;

        //Calculation for the remaining width of the screen to distribute buttons across
        var scrollBarWidth = (rightButton.left - offsetRight) - (leftButton.right + offsetLeft);

        //Calculating positions from the number of slots and the remaining width
        var spaceBetween = Math.floor(scrollBarWidth / (slots));


        for (var i = 0; i < array.length; i++){
            array[i].anchor.setTo(0.5, 0.5);
        }
        return calcPositions(array, scrollSlots);
    }
*/

}