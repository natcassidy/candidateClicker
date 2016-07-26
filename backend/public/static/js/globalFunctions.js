//Not a function. lawl.
var buttons = []; //yep, I got desperate and made them global objects. Wooho

// Global functions for referencing in states, etc.

var save = function(data, firstUpdate) {
    if (firstUpdate) {
        dpd.users.put(
            data.id,
        {
            "selectedCandidate": data.selectedCandidate
        });
    }
    document.cookie = "save=" + JSON.stringify(data);
    // These functions will return values, etc. and
    // add capability beyond that of the callback

    function createUser(data) {
        dpd.users.post({
            "username": data.credentials.username,
            "password": data.credentials.password,
            "selectedCandidate": data.selectedCandidate,
            "voteCredits": data.voteCredits,
            "fancyPens": data.fancyPens,
            "restarts": data.restarts,
            "votes": data.votes,
            "upgrades": data.upgrades,
            "votesPerClick": data.votesPerClick
            },
            function(user, err){
                if(err) { return console.log(err) }
                data.id = user.id;
            });
    }

    function updateUser(data) {
        dpd.users.put(
            data.id,
            {
            "voteCredits": data.voteCredits,
            "fancyPens": data.fancyPens,
            "restarts": data.restarts,
            "votes": Math.floor(data.votes),
            "upgrades": data.upgrades,
            "votesPerClick": data.votesPerClick
            },
            function(user, err) {
                if(err) { return console.log(err) }
            });
    }
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

var newProfile = function() {
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
            //[# owned, ratio numer, ratio denom, ups bought array (0 or 1), pricing]
            [0,1,25,[0,0,0,0], [prArr[0]]],
            [0,5,25,[0,0,0,0], [prArr[1]]],
            [0,25,25,[0,0,0,0], [prArr[2]]],
            [0,125,25,[0,0,0,0], [prArr[3]]],
            [0,625,25,[0,0,0,0], [prArr[4]]],
            [0,3125,25,[0,0,0,0], [prArr[5]]],
            [0,15625,25,[0,0,0,0], [prArr[6]]],
            [0,78125,25,[0,0,0,0], [prArr[7]]],
            [0,390625,25,[0,0,0,0], [prArr[8]]],
            [0,1953125,25,[0,0,0,0], [prArr[9]]]
        ];
        playerData.id;

        save(playerData);
};

var fixNum = function(num) { //takes a number and returns either that number or the scientific notation
    if (num.toString().length > 7) {
        return sciNot(playerData.fancyPens);
    } else { return num; }
};

var sciNot = function(num) { //Converts to scientific notation
    // get num.length
    // divide num by 10e (num.length - 2)
    // convert num to string and remove all digits but first 3
    // return resulting string

    var len = num.toString().length;
    var div = 10;
    for (var i = 0; i < (len - 2); i++) { // skips included ten, keeps additional ten, hence len - 2
        div *= 10;
    }

    num /= div;

    var str = num.toString();
    str = str.slice(0, 5) + ' x10e' + (len - 1);

    return str;
};

// Function for calculating prices from bPrArr
var pCal = function(price, increment) {
    for (var n = 0; n < increment; n++){
        for (var i = 0; i < 9; i++){
            price *= 1.5;
        }
    }
    return Math.floor(price * 1.5);
};

var productionCalc = function(upgrade) {
    var change;
    var multiplier = 1;
    for (var i = 0; i < upgrade[3].length; i++){
        if (upgrade[3][i] === 1) { multiplier *= 2; }
    }
    change = upgrade[0] * upgrade[1] / upgrade[2] * multiplier;
    return change;
};

// --FUNCTIONS FOR BUYING PASSIVE VOTERS IN MAIN--
var buy = { prIncrease: 1.5 };
buy.out = function() {
    upgradeTexts[0].visible = false;
    upgradeTexts[2].visible = false;
};

// TIER 1
buy.t1 = {};
buy.t1.buy = function() {
    var up = playerData.upgrades[0];
    if (playerData.voteCredits >= up[4][0][0]) {
        up[0] += 1;
        playerData.voteCredits -= up[4][0][0]; //subtracts price from voteCredits
        up[4][0][0] = Math.floor(up[4][0][0] * buy.prIncrease); //increases price by 30%
        buttons[0].numText.setText(fixNum(playerData.upgrades[0][0]));
    }
};
buy.t1.over = function() {
    var n = 0;
    var up = playerData.upgrades[0];
    var str = upgradeTexts.length - 1;
    upgradeTexts[0].setText(upgradeTexts[str - 1] + up[4][0][0]);
    upgradeTexts[0].visible = true;
    upgradeTexts[2].setText(upgradeTexts[str] + Math.floor(productionCalc(up)) + ' per tick');
    upgradeTexts[2].visible = true;
};

// TIER 2
buy.t2 = {};
buy.t2.buy = function() {
    var up = playerData.upgrades[1];
    if (playerData.voteCredits >= up[4][0][0]) {
        up[0] += 1;
        playerData.voteCredits -= up[4][0][0]; //subtracts price from voteCredits
        up[4][0][0] = Math.floor(up[4][0][0] * buy.prIncrease); //increases price by 30%
        buttons[1].numText.setText(fixNum(playerData.upgrades[1][0]));
    }
};
buy.t2.over = function() {
    var n = 1;
    var up = playerData.upgrades[0];
    var str = upgradeTexts.length - 1;
    upgradeTexts[0].setText(upgradeTexts[str - 1] + up[4][0][0]);
    upgradeTexts[0].visible = true;
    upgradeTexts[2].setText(upgradeTexts[str] + Math.floor(productionCalc(up)) + ' per tick');
    upgradeTexts[2].visible = true;
};

// TIER 3
buy.t3 = {};
buy.t3.buy = function() {
    var up = playerData.upgrades[2];
    if (playerData.voteCredits >= up[4][0][0]) {
        up[0] += 1;
        playerData.voteCredits -= up[4][0][0]; //subtracts price from voteCredits
        up[4][0][0] = Math.floor(up[4][0][0] * buy.prIncrease); //increases price by 30%
        buttons[2].numText.setText(fixNum(playerData.upgrades[2][0]));
    }
};
buy.t3.over = function() {
    var n = 2;
    var up = playerData.upgrades[0];
    var str = upgradeTexts.length - 1;
    upgradeTexts[0].setText(upgradeTexts[str - 1] + up[4][0][0]);
    upgradeTexts[0].visible = true;
    upgradeTexts[2].setText(upgradeTexts[str] + Math.floor(productionCalc(up)) + ' per tick');
    upgradeTexts[2].visible = true;
};

// TIER 4
buy.t4 = {};
buy.t4.buy = function() {
    var up = playerData.upgrades[3];
    if (playerData.voteCredits >= up[4][0][0]) {
        up[0] += 1;
        playerData.voteCredits -= up[4][0][0]; //subtracts price from voteCredits
        up[4][0][0] = Math.floor(up[4][0][0] * buy.prIncrease); //increases price by 30%
        buttons[3].numText.setText(fixNum(playerData.upgrades[3][0]));
    }
};
buy.t4.over = function() {
    var n = 3;
    var up = playerData.upgrades[0];
    var str = upgradeTexts.length - 1;
    upgradeTexts[0].setText(upgradeTexts[str - 1] + up[4][0][0]);
    upgradeTexts[0].visible = true;
    upgradeTexts[2].setText(upgradeTexts[str] + Math.floor(productionCalc(up)) + ' per tick');
    upgradeTexts[2].visible = true;
};

// TIER 5
buy.t5 = {};
buy.t5.buy = function() {
    var up = playerData.upgrades[4];
    if (playerData.voteCredits >= up[4][0][0]) {
        up[0] += 1;
        playerData.voteCredits -= up[4][0][0]; //subtracts price from voteCredits
        up[4][0][0] = Math.floor(up[4][0][0] * buy.prIncrease); //increases price by 30%
        buttons[4].numText.setText(fixNum(playerData.upgrades[4][0]));
    }
};
buy.t5.over = function() {
    var n = 4;
    var up = playerData.upgrades[0];
    var str = upgradeTexts.length - 1;
    upgradeTexts[0].setText(upgradeTexts[str - 1] + up[4][0][0]);
    upgradeTexts[0].visible = true;
    upgradeTexts[2].setText(upgradeTexts[str] + Math.floor(productionCalc(up)) + ' per tick');
    upgradeTexts[2].visible = true;
};

// TIER 6
buy.t6 = {};
buy.t6.buy = function() {
    var up = playerData.upgrades[5];
    if (playerData.voteCredits >= up[4][0][0]) {
        up[0] += 1;
        playerData.voteCredits -= up[4][0][0]; //subtracts price from voteCredits
        up[4][0][0] = Math.floor(up[4][0][0] * buy.prIncrease); //increases price by 30%
        buttons[5].numText.setText(fixNum(playerData.upgrades[5][0]));
    }
};
buy.t6.over = function() {
    var n = 5;
    var up = playerData.upgrades[0];
    var str = upgradeTexts.length - 1;
    upgradeTexts[0].setText(upgradeTexts[str - 1] + up[4][0][0]);
    upgradeTexts[0].visible = true;
    upgradeTexts[2].setText(upgradeTexts[str] + Math.floor(productionCalc(up)) + ' per tick');
    upgradeTexts[2].visible = true;
};

// TIER 7
buy.t7 = {};
buy.t7.buy = function() {
    var up = playerData.upgrades[6];
    if (playerData.voteCredits >= up[4][0][0]) {
        up[0] += 1;
        playerData.voteCredits -= up[4][0][0]; //subtracts price from voteCredits
        up[4][0][0] = Math.floor(up[4][0][0] * buy.prIncrease); //increases price by 30%
        buttons[6].numText.setText(fixNum(playerData.upgrades[6][0]));
    }
};
buy.t7.over = function() {
    var n = 6;
    var up = playerData.upgrades[0];
    var str = upgradeTexts.length - 1;
    upgradeTexts[0].setText(upgradeTexts[str - 1] + up[4][0][0]);
    upgradeTexts[0].visible = true;
    upgradeTexts[2].setText(upgradeTexts[str] + Math.floor(productionCalc(up)) + ' per tick');
    upgradeTexts[2].visible = true;
};

// TIER 8
buy.t8 = {};
buy.t8.buy = function() {
    var up = playerData.upgrades[7];
    if (playerData.voteCredits >= up[4][0][0]) {
        up[0] += 1;
        playerData.voteCredits -= up[4][0][0]; //subtracts price from voteCredits
        up[4][0][0] = Math.floor(up[4][0][0] * buy.prIncrease); //increases price by 30%
        buttons[7].numText.setText(fixNum(playerData.upgrades[7][0]));
    }
};
buy.t8.over = function() {
    var n = 7;
    var up = playerData.upgrades[0];
    var str = upgradeTexts.length - 1;
    upgradeTexts[0].setText(upgradeTexts[str - 1] + up[4][0][0]);
    upgradeTexts[0].visible = true;
    upgradeTexts[2].setText(upgradeTexts[str] + Math.floor(productionCalc(up)) + ' per tick');
    upgradeTexts[2].visible = true;
};

// TIER 9
buy.t9 = {};
buy.t9.buy = function() {
    var up = playerData.upgrades[8];
    if (playerData.voteCredits >= up[4][0][0]) {
        up[0] += 1;
        playerData.voteCredits -= up[4][0][0]; //subtracts price from voteCredits
        up[4][0][0] = Math.floor(up[4][0][0] * buy.prIncrease); //increases price by 30%
        buttons[8].numText.setText(fixNum(playerData.upgrades[8][0]));
    }
};
buy.t9.over = function() {
    var n = 8;
    var up = playerData.upgrades[2];
    var str = upgradeTexts.length - 1;
    upgradeTexts[0].setText(upgradeTexts[str - 1] + up[4][0][0]);
    upgradeTexts[0].visible = true;
    upgradeTexts[2].setText(upgradeTexts[str] + Math.floor(productionCalc(up)) + ' per tick');
    upgradeTexts[2].visible = true;
};

// TIER 10
buy.t10 = { n: 9 };
buy.t10.buy = function() {
    var up = playerData.upgrades[9];
    if (playerData.voteCredits >= up[4][0][0]) {
        up[0] += 1;
        playerData.voteCredits -= up[4][0][0]; //subtracts price from voteCredits
        up[4][0][0] = Math.floor(up[4][0][0] * buy.prIncrease); //increases price by 30%
        buttons[9].numText.setText(fixNum(playerData.upgrades[9][0]));
    }
};
buy.t10.over = function() {
    var up = playerData.upgrades[buy.t10.n+1];
    upgradeTexts[0].setText(upgradeTexts[1] + up[4][0][0]);
    upgradeTexts[0].visible = true;
    upgradeTexts[2].setText(upgradeTexts[3] + Math.floor(productionCalc(up)) + ' per tick');
    upgradeTexts[2].visible = true;
};



// --FUNCTIONS FOR BUYING UPGRADES FOR PASSIVE VOTERS IN MAIN--

//Data keys
//prArr [row, price(stars start at index 1)]

// ROW ONE
buy.buyT1up1 = function () {
    var row = 0;
    var slot = 0;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT1up2 = function () {
    var row = 0;
    var slot = 1;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT1up3 = function () {
    var row = 0;
    var slot = 2;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT1up4 = function () {
    var row = 0;
    var slot = 3;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};

// ROW TWO
buy.buyT2up1 = function () {
    var row = 1;
    var slot = 0;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT2up2 = function () {
    var row = 1;
    var slot = 1;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT2up3 = function () {
    var row = 1;
    var slot = 2;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT2up4 = function () {
    var row = 1;
    var slot = 3;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};

// ROW THREE
buy.buyT3up1 = function () {
    var row = 2;
    var slot = 0;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT3up2 = function () {
    var row = 2;
    var slot = 1;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT3up3 = function () {
    var row = 2;
    var slot = 2;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT3up4 = function () {
    var row = 2;
    var slot = 3;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};

//ROW FOUR
buy.buyT4up1 = function () {
    var row = 3;
    var slot = 0;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT4up2 = function () {
    var row = 3;
    var slot = 1;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT4up3 = function () {
    var row = 3;
    var slot = 2;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT4up4 = function () {
    var row = 3;
    var slot = 3;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};

//ROW FIVE
buy.buyT5up1 = function () {
    var row = 4;
    var slot = 0;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT5up2 = function () {
    var row = 4;
    var slot = 1;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT5up3 = function () {
    var row = 4;
    var slot = 2;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT5up4 = function () {
    var row = 4;
    var slot = 3;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};

//ROW SIX
buy.buyT6up1 = function () {
    var row = 5;
    var slot = 0;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT6up2 = function () {
    var row = 5;
    var slot = 1;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT6up3 = function () {
    var row = 5;
    var slot = 2;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT6up4 = function () {
    var row = 5;
    var slot = 3;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};

//ROW SEVEN
buy.buyT7up1 = function () {
    var row = 6;
    var slot = 0;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT7up2 = function () {
    var row = 6;
    var slot = 1;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT7up3 = function () {
    var row = 6;
    var slot = 2;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT7up4 = function () {
    var row = 6;
    var slot = 3;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};

//ROW 8
buy.buyT8up1 = function () {
    var row = 7;
    var slot = 0;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT8up2 = function () {
    var row = 7;
    var slot = 1;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT8up3 = function () {
    var row = 7;
    var slot = 2;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT8up4 = function () {
    var row = 7;
    var slot = 3;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};

//ROW NINE
buy.buyT9up1 = function () {
    var row = 8;
    var slot = 0;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT9up2 = function () {
    var row = 8;
    var slot = 1;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT9up3 = function () {
    var row = 8;
    var slot = 2;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT9up4 = function () {
    var row = 8;
    var slot = 3;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};

//ROW 10
buy.buyT10up1 = function () {
    var row = 9;
    var slot = 0;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT10up2 = function () {
    var row = 9;
    var slot = 1;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT10up3 = function () {
    var row = 9;
    var slot = 2;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};
buy.buyT10up4 = function () {
    var row = 9;
    var slot = 3;
    var prArrSlot = slot + 1;
    var button = buttons[row].ups[slot];
    if (playerData.voteCredits >= prArr[row][prArrSlot] && button.key === 'starBuyable') {
        playerData.voteCredits -= prArr[row][prArrSlot]; //subtracts price from voteCredits
        button.loadTexture('starBought'); //changes image
        playerData.upgrades[row][3][slot] = 1;
    }
};