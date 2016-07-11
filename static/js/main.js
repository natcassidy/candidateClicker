myGame.main = function(game) {};

myGame.main.prototype = {

    preload: function() {

    },

    create: function() {
        this.lost = false;

        // responsive screen landmarks, scaled for resolution
        // Math.floor included for corner cases with screen 
        // resolutions with non-zero values in the ones place
        this.wThird = Math.floor(game.width / 3);
        this.wHalf = Math.floor(game.width / 2);
        this.wTenth = Math.floor(game.width / 10);

        this.hThird = Math.floor(game.height / 3);
        this.hHalf = Math.floor(game.height / 2);
        this.hTenth = Math.floor(game.height / 10);

        // Background images
        game.add.image(0, 0, 'background');
        game.add.image(this.wThird * 2, this.hHalf * 1/2, 'upgradeBar');

        // heads + associated clickable button
        this.trump = game.add.sprite(this.wThird, this.hHalf, 'trump');
        this.trump.anchor.setTo(0.5, 0.5);

        this.hillary = game.add.sprite(game.width / 3 - 800, game.height / 2, 'hillary');
        this.hillary.anchor.setTo(0.5, 0.5);

        this.clickButton = game.add.image(0, 0, 'clickMe');
        this.clickButton.x = Math.floor(this.clickButton.width/2);
        this.clickButton.y = game.height - this.clickButton.height/2;
        this.clickButton.anchor.setTo(0.5, 0.5);

        this.clickButton.inputEnabled = true;
        this.clickButton.events.onInputDown.add(this.clicked, this);

        // Voting text
        this.tVotesTotalText = game.add.text(this.wTenth, this.hTenth, 'test');
        this.tVotesTotalText.anchor.setTo(0.5, 0.5);
        this.playerTVotesText = game.add.text(
                                this.tVotesTotalText.x, 
                                this.tVotesTotalText.y + this.tVotesTotalText.height, 
                                "Your Votes: " + playerData.trumpVotes);
        this.playerTVotesText.anchor.setTo(0, 0.5);
        this.trumpText = game.add.text(this.tVotesTotalText.x, 
                                        this.tVotesTotalText.y - this.playerTVotesText.height, 
                                        "Trump")
        this.trumpText.anchor.setTo(0.5, 0.5);

        this.cVotesTotalText = game.add.text(game.width - this.wTenth, this.hTenth, 'test');
        this.cVotesTotalText.anchor.setTo(0.5, 0.5);
        this.playerCVotesText = game.add.text(
                                this.cVotesTotalText.x, 
                                this.cVotesTotalText.y + this.playerTVotesText.height, 
                                "Your Votes: " + playerData.clintonVotes);
        this.playerCVotesText.anchor.setTo(1, 0.5);
        this.clintonText = game.add.text(this.cVotesTotalText.x, 
                                        this.cVotesTotalText.y - this.playerTVotesText, 
                                        "Clinton")
        this.clintonText.anchor.setTo(0.5, 0.5);

    },

    update: function() {

        if (this.lost) {
            returnToMenu();
        }
    },

    returnToMenu: function() {
        this.state.start('mainMenu', true, false);
    },

    clickTrump: function() {
        playerData.unsentVotes.trump += playerData.votesPerClick;
        playerData.trumpVotes += playerData.votesPerClick;
        this.playerTVotesText.setText("Your Votes: " + playerData.trumpVotes);
        //currency changes
    },

    clickClinton: function() {
        playerData.unsentVotes.clinton += playerData.votesPerClick;
        playerData.clintonVotes += playerData.votesPerClick;
        this.playerCVotesText.setText("Your Votes: " + playerData.clintonVotes);
        //currency changes
    },

    clicked: function() {
        if (this.trump.x > 0){
            this.clickTrump();
        }
        else { this.clickClinton(); }
        console.log('clicked');
    },

    serverCall: function(votes) {
        //takes an object, playerData.unsentVotes

        var trumpVotes = 0, clintonVotes = 0;

        // Send unsentVotes to server with playerData.username

        // Reset unsentVotes to 0
        votes.trump = 0;
        votes.clinton = 0;

        //fetch totals from server here

        trumpVotes = 500;
        clintonVotes = 500;

        return {trump: trumpVotes, clinton: clintonVotes};
    }
}