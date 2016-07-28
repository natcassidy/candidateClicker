//Not a function. lawl.
var buttons = []; //yep, I got desperate and made them global objects. Wooho

// Global functions for referencing in states, etc.

var save = function(data, firstUpdate) {
    if (firstUpdate) {
        dpd.users.put(
            data.id, {
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
            function(user, err) {
                if (err) {
                    return console.log(err)
                }
                data.id = user.id;
            });
    }

    function updateUser(data) {
        dpd.users.put(
            data.id, {
                "voteCredits": data.voteCredits,
                "fancyPens": data.fancyPens,
                "restarts": data.restarts,
                "votes": Math.floor(data.votes),
                "upgrades": data.upgrades,
                "votesPerClick": data.votesPerClick
            },
            function(user, err) {
                if (err) {
                    return console.log(err)
                }
            });
    }
    if (data.id) {
        updateUser(data);
    } else {
        createUser(data);
    }
};

var load = function(data) {
    //loads data from cookie and facilitates logging into a user account
};

var login = function(credentials) {
    //Needs to handle kongregate users automatically

    dpd.users.login({
        username: credentials.username,
        password: credentials.password
    }, function(result, error) {
        // Do something
    });

    dpd.users.me(function(result, err) {
        // console.log(result);
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

var newProfile = function() {
    playerData.credentials = {};

    var playerInput = false;

    if (!playerInput) {
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
        [0, 1, 6, [0, 0, 0, 0],
            [prArr[0]]
        ],
        [0, 5, 6, [0, 0, 0, 0],
            [prArr[1]]
        ],
        [0, 25, 6, [0, 0, 0, 0],
            [prArr[2]]
        ],
        [0, 125, 6, [0, 0, 0, 0],
            [prArr[3]]
        ],
        [0, 625, 6, [0, 0, 0, 0],
            [prArr[4]]
        ],
        [0, 3125, 6, [0, 0, 0, 0],
            [prArr[5]]
        ],
        [0, 15625, 6, [0, 0, 0, 0],
            [prArr[6]]
        ],
        [0, 78125, 6, [0, 0, 0, 0],
            [prArr[7]]
        ],
        [0, 390625, 6, [0, 0, 0, 0],
            [prArr[8]]
        ],
        [0, 1953125, 6, [0, 0, 0, 0],
            [prArr[9]]
        ]
    ];
    playerData.id;

    save(playerData);
};

var fixNum = function(num) { //takes a number and returns either that number or the scientific notation
    if (num.toString().length > 6) {
        return num.toPrecision(4);
    } else {
        return num;
    }
};

// Function for calculating prices from bPrArr
var pCal = function(price, increment) {
    for (var n = 0; n < increment; n++) {
        for (var i = 0; i < 9; i++) {
            price *= 1.5;
        }
    }
    return Math.floor(price * 1.5);
};

var productionCalc = function(upgrade) {
    var change;
    var multiplier = 1;
    for (var i = 0; i < upgrade[3].length; i++) {
        if (upgrade[3][i] === 1) {
            multiplier *= 2;
        }
    }
    change = upgrade[0] * upgrade[1] / upgrade[2] * multiplier;
    return change;
};
/*
 --FUNCTIONS FOR BUYING PASSIVE VOTERS IN MAIN--
        [0] = Title
        [1] = Price
        [3] = Current Production
        [5] = Quote
*/
var buy = {
    prIncrease: 1.5
};

buy.buy = function() {
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].buy.input.pointerOver()) {
            break;
        }
    }
    var but = buttons[i];
    var up = playerData.upgrades[i];
    if (playerData.voteCredits >= up[4][0][0]) {
        up[0] += 1;
        playerData.voteCredits -= up[4][0][0]; //subtracts price from voteCredits
        up[4][0][0] = Math.floor(up[4][0][0] * buy.prIncrease); //increases price by 30%
        but.numText.setText(fixNum(playerData.upgrades[i][0]));
        upgradeTexts[1].setText(upgradeTexts[2] + fixNum(up[4][0][0]));
        upgradeTexts[3].setText(upgradeTexts[4] + fixNum(Math.floor(productionCalc(up))) + ' per tick');
    }
};

buy.over = function() {
    var candidate;
    if (playerData.selectedCandidate === 'trump') { candidate= 0; }
    else { candidate = 1; }

    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].buy.input.pointerOver()) {
            break;
        }
    }
    upgradeBox.visible = true;
    var up = playerData.upgrades[i];
    upgradeTexts[0].setText(upgradeCatalogue[i][3][candidate]);
    upgradeTexts[0].visible = true;
    upgradeTexts[1].setText(upgradeTexts[2] + fixNum(up[4][0][0]));
    upgradeTexts[1].visible = true;
    upgradeTexts[3].setText(upgradeTexts[4] + fixNum(Math.floor(productionCalc(up))) + ' per tick');
    upgradeTexts[3].visible = true;
    upgradeTexts[5].visible = true;
    upgradeTexts[5].setText(upgradeCatalogue[i][4][candidate]);
};

buy.starOver = function() {
    starText.visible = true;
};

buy.starOff = function() {
    starText.visible = false;
};

buy.out = function() {
    upgradeTexts[0].visible = false;
    upgradeTexts[1].visible = false;
    upgradeTexts[3].visible = false;
    upgradeTexts[5].visible = false;
    upgradeBox.visible = false;
};

// --FUNCTIONS FOR BUYING UPGRADES FOR PASSIVE VOTERS IN MAIN--

//Data keys
//prArr [row, price(stars start at index 1)]

// ROW ONE
buy.buyT1up1 = function() {
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
buy.buyT1up2 = function() {
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
buy.buyT1up3 = function() {
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
buy.buyT1up4 = function() {
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
buy.buyT2up1 = function() {
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
buy.buyT2up2 = function() {
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
buy.buyT2up3 = function() {
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
buy.buyT2up4 = function() {
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
buy.buyT3up1 = function() {
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
buy.buyT3up2 = function() {
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
buy.buyT3up3 = function() {
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
buy.buyT3up4 = function() {
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
buy.buyT4up1 = function() {
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
buy.buyT4up2 = function() {
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
buy.buyT4up3 = function() {
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
buy.buyT4up4 = function() {
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
buy.buyT5up1 = function() {
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
buy.buyT5up2 = function() {
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
buy.buyT5up3 = function() {
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
buy.buyT5up4 = function() {
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
buy.buyT6up1 = function() {
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
buy.buyT6up2 = function() {
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
buy.buyT6up3 = function() {
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
buy.buyT6up4 = function() {
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
buy.buyT7up1 = function() {
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
buy.buyT7up2 = function() {
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
buy.buyT7up3 = function() {
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
buy.buyT7up4 = function() {
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
buy.buyT8up1 = function() {
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
buy.buyT8up2 = function() {
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
buy.buyT8up3 = function() {
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
buy.buyT8up4 = function() {
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
buy.buyT9up1 = function() {
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
buy.buyT9up2 = function() {
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
buy.buyT9up3 = function() {
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
buy.buyT9up4 = function() {
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
buy.buyT10up1 = function() {
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
buy.buyT10up2 = function() {
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
buy.buyT10up3 = function() {
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
buy.buyT10up4 = function() {
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