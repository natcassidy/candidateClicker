myGame.mainMenu = function(game) {};

myGame.mainMenu.prototype = {

    preload: function() {

    },

    create: function() {
        playerData.selectedCandidate = 'trump';
        this.goToMain();
    },

    update: function() {

    },

    goToMain: function() {
        this.state.start('main', true, false);
    }
};