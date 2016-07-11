myGame.main = function(game) {};

myGame.main.prototype = {

    preload: function() {

    },

    create: function() {
        this.lost = false;

        game.add.image(0, 0, 'background');

        this.trump = game.add.sprite(game.width / 3, game.height / 2, 'trump');
        this.trump.anchor.setTo(0.5, 0.5);

        this.hillary = game.add.sprite(game.width / 3 - 500, game.height / 2, 'hillary');
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