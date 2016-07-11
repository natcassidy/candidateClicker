myGame.main = function(game) {};

myGame.main.prototype = {

    preload: function() {

    },

    create: function() {
        this.lost = false;

        game.add.image(0, 0, 'background');
        game.add.image(Math.floor(game.width * 2/3), Math.floor(game.height * 1/4), 'upgradeBar');

        this.trump = game.add.sprite(game.width / 3, game.height / 2, 'trump');
        this.trump.anchor.setTo(0.5, 0.5);

        this.hillary = game.add.sprite(game.width / 3 - 800, game.height / 2, 'hillary');
        this.hillary.anchor.setTo(0.5, 0.5);

        this.hVotesTotalText = game.add.text();
        this.playerHVotesText = game.add.text();
        this.tVotesTotalText = game.add.text();
        this.playerTVotesText = game.add.text();
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
        playerData.unsentVotes += playerData.votesPerClick;
        playerData.trumpVotes += playerData.votesPerClick;
        //currency changes
    },

    clickClinton: function() {
        playerData.unsentVotes += playerData.votesPerClick;
        playerData.clintonVotes += playerData.votesPerClick;
        //currency changes
    }
}