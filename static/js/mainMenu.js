myGame.mainMenu = function(game) {};

myGame.mainMenu.prototype = {

    preload: function() {

    },

    create: function() {
        this.selectionMade = true;
    },

    update: function() {
        if (this.selectionMade) {
            this.state.start("main", true, false);
        }
    },
}