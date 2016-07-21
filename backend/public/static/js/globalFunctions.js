// Global functions for referencing in states, etc.

var save = function(data) {
    document.cookie = "save=" + JSON.stringify(data);

    // These functions will return values, etc. and
    // add capability beyond that of the callback

    function createUser() {
        dpd.users.post({
            "username": data.username,
            "password": data.password,
            "selectedCandidate": data.slectedCandidate,
            "voteCredits": data.voteCredits,
            "fancyPens": data.fancyPens,
            "restarts": data.restarts,
            "votes": data.votes,
            "upgrades": data.upgrades
            },
            function(user, err){
                if(err) { return console.log(err) }
                data.id = user.id;
            });
    }

    function updateUser() {
        dpd.users.put(
            data.id,
            {
            "voteCredits": data.voteCredits,
            "fancyPens": data.fancyPens,
            "restarts": data.restarts,
            "votes": data.votes,
            "upgrades": data.upgrades
            },
            function(user, err) {
                if(err) { return console.log(err) }
            });
    }
    if (data.id) {
        updateUser();
    } else { createUser(); }
};

var load = function(data) {
    //loads data from cookie and facilitates logging into a user account
};

var login = function(credentials) {
    //Needs to handle kongregate users automatically

    dpd.users.login({
        "username": credentials.username,
        "password": credentials.password
    },  function(result, error) {
        // Do something
    });
};

var importFromCookie = function() {
    //this allows a player to logout of what is probably
    //an automatically generated new user and login with
    //an export of their game cookie
};

var makeRandString = function(digits) {
    if (typeof(digits) != 'number') {
        console.log("makeRandString error: submitted argument not a number");
        return;
    }
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < digits; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};
