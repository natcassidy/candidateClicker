myGame.main = function(game) {};

myGame.main.prototype = {

    preload: function() {

    },

    create: function() {
        this.lost = false;
    },

    update: function() {

        if (this.lost) {
            returnToMenu();
        }
    },

    returnToMenu: function() {
        this.state.start('mainMenu', true, false);
    }
}