// Global functions for referencing in states, etc.

var save = function(data) {
    document.cookie = "save=" + JSON.stringify(data);
    // These functions will return values, etc. and
    // add capability beyond that of the callback

        dpd.users.get(function(result, err){
            console.log(result);
        })

    function createUser(data) {
        dpd.users.post({
            "username": data.credentials.username,
            "password": data.credentials.password,
            "selectedCandidate": data.slectedCandidate,
            "voteCredits": data.voteCredits,
            "fancyPens": data.fancyPens,
            "restarts": data.restarts,
            "votes": data.votes,
            "voteChange": 0,
            "upgrades": data.upgrades
            },
            function(user, err){
                if(err) { return console.log(err) }
                data.id = user.id;
                console.log(user);
            });
    }

    function updateUser(data) {
        //fetch the last value for votes and then use that to submit a changedBy
        //value to the database, which the database will use to update the total 
        //vote counts on each put request

        dpd.users.get(data.id, function(oldData, err){
            data.lastVotes = oldData;
        })

        var change = data.votes - data.lastVotes;

        dpd.users.put(
            data.id,
            {
            "voteCredits": data.voteCredits,
            "fancyPens": data.fancyPens,
            "restarts": data.restarts,
            "votes": data.votes,
            "upgrades": data.upgrades,
            "voteChange": change
            },
            function(user, err) {
                if(err) { return console.log(err) }
            });
    }
    console.log(data.id);
    if (data.id) {
        updateUser(data);
    } else { createUser(data); }
};

var load = function(data) {
    //loads data from cookie and facilitates logging into a user account
};

var login = function(credentials) {
    //Needs to handle kongregate users automatically

    dpd.users.login({
        username: credentials.username,
        password: credentials.password
    },  function(result, error) {
        // Do something
    });

    dpd.users.me(function(result, err) {
        // console.log(result);
    })
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
