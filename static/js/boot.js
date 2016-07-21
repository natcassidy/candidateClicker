var myGame = {};

myGame.boot = function(game) {};

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
        //saved to a cookie ENCRYPT/DECRYPT THIS LATER!
        if (!document.cookie) {
            playerData = JSON.parse(this.fixFormat(document.cookie));
        } else { //Creates new user profile, will generate random username for player
            this.newCookieProfile();
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
    },

    newCookieProfile: function() {
        playerData.credentials = {};

        var playerInput = false;

        if (!playerInput){
            playerData.credentials.username = makeRandString(8);
            playerData.credentials.password = makeRandString(16);
        } else {
            var compare = '';
            playerData.credentials.password = ' ';
            while (compare != playerData.credentials.password) {
                playerData.credentials.username = prompt("Pick your username.");
                playerData.credentials.password = prompt("Pick your password.");
                compare = prompt("Re-enter your password.");
                if (compare != playerData.credentials.password) {
                    alert("Passwords did not match, please try again.");
                }
            }
        }
        playerData.selectedCandidate = '';
        playerData.voteCredits = 0;
        playerData.votesPerClick = 1;
        playerData.fancyPens = 0; //permanent boosts gained by restarting
        playerData.restarts = 0;
        playerData.votes = 0;
        playerData.unsentVotes = 0;
        playerData.upgrades = [
            [0,1,600,''],
            [0,5,600,''],
            [0,25,600,''],
            [0,125,600,''],
            [0,625,600,''],
            [0,3125,600,''],
            [0,15625,600,'']
        ];
        playerData.id = '';

        save(playerData);
    },
};