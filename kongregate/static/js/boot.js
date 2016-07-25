var myGame = {};

myGame.boot = function(game) {};

myGame.boot.prototype = {

    preload: function() {

        game.stage.disableVisibilityChange = true; //keeps game running when focus lost

        //PLAYER DATA
        playerData = {}; //Global data storage object for persistance between states

        var kongregate = null;
        var googlePlay = null;
        var iOS = null;

        //saved to a cookie ENCRYPT/DECRYPT THIS LATER!
        if (document.cookie) {
            playerData = JSON.parse(this.fixFormat(document.cookie));
        } else { //Creates new user profile, will generate random username for player
            newProfile();
        }

        login(playerData.credentials);

    },

    create: function() {
        this.state.start('preloader', true);
    },

    fixFormat: function(cookieContents) {
        // removes the first 5 characters from cookieContents (s, a, v, e, =)
        cookieContents = cookieContents.substr(5); //take everything after fifth character
        return cookieContents;
    }
};