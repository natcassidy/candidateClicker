var myGame = {};

myGame.boot = function (game) {};

myGame.boot.prototype = {
    
    preload: function() {
        //PLAYER DATA
        playerData = {}; //Global data storage object for persistance between states

        var kongregate = null;
        var googlePlay = null;
        var iOS = null;

        //PLAYER DATA INSTANTIATED IF NOT PRE-EXISTING
        /*
        
        if(!playerData.returning){

        */
        if (kongregate) {}

        else if (googlePlay) {}

        else if (iOS) {}

        else { //saved to a cookie ENCRYPT/DECRYPT THIS LATER!
            if (document.cookie) {
                playerData.user = JSON.parse(this.fixFormat(document.cookie));
            }
            else { //Creates new user profile, will generate random username for player
                this.newCookieProfile();
            }
        }

    },

    create: function() {
        this.state.start('preloader', true);
    },

    makeId: function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 8; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    fixFormat: function (cookieContents) {
        // removes the first 5 characters from cookieContents (s, a, v, e, =)
            cookieContents = cookieContents.substr(5); //take everything after fifth character
        return cookieContents;
    },

    newCookieProfile: function() {
        playerData.username = this.makeId();
        playerData.votesPerClick = 1;
        playerData.trumpVotes = 0;
        playerData.clintonVotes = 0;
        playerData.unsentVotes = {
            trump: 0, 
            clinton: 0
        };
    }

}