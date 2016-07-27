//Arrays used elsewhere, etc.

var upgradeCatalogue = [
    ['doorKnocking', 'door', 'door', [
        "Knockin' dem doors!",
        "Knockin' dem doors!"
    ]],
    ['campaignStaff', 'campaignStaff', 'campaignStaff', [
        "Hiring dem staff!",
        "Hiring dem staff!"
    ]],
    ['freeClothing', 'tShirt', 'tShirt', [
        "Let them have shirts!",
        "Let them have shirts!"
    ]],
    ['picketSign', 'signT', 'signC', [
        "'We picket, you pick us!'...has to be better than 'Don\'t vote for Trump'",
        "'We picket, you pick us!'...has to be better than 'Make racism great again!'"
    ]],
    ['radio', 'radio', 'radio', [
        "...that's made for radio...",
        "...that's made for radio..."
    ]],
    ['tv', 'tv', 'tv', [
        "Politics: now in your living room!",
        "Politics: now in your living room!"
    ]],
    ['endorsement', 'endorsement', 'endorsement', [
        "All the endorsements!",
        "All the endorsements!"
    ]],
    ['alliance', 'alliance', 'alliance', [
        "A friend in need is a friend you feed...to the lions!",
        "A friend in need is a friend you feed...to the lions!"
    ]],
    ['rally', 'rallyTrump', 'rallyClinton', [
        "Now for more than just golfballs!",
        "Now for more than just golfballs!"
    ]],
    ['t10', 'voteMaker', 'emailServer', [
        "(Made in China)",
        "'I swear I didn\'t have illegal communications through that email server.'"
    ]]
];

var upgradeKey = ['count', 'ratio', 'rate', 'upgrades', 'basePrice'];

var upgradeUnlocks = [10, 25, 50, 100];

var starUnlockKeys = ['starLocked', 'starTooExpensive', 'starBuyable', 'starBought'];

var tVTText;
var cVTText;

var bPrArr = [10, 90, 990, 12870, 193050, 3281850, 62355150, 1309458150, 30117537450, 752938436250];

var prArr = [
    [bPrArr[0], pCal(bPrArr[0], 2), pCal(bPrArr[0], 3), pCal(bPrArr[0], 5), pCal(bPrArr[0], 8)],
    [bPrArr[1], pCal(bPrArr[1], 2), pCal(bPrArr[1], 3), pCal(bPrArr[1], 5), pCal(bPrArr[1], 8)],
    [bPrArr[2], pCal(bPrArr[2], 2), pCal(bPrArr[2], 3), pCal(bPrArr[2], 5), pCal(bPrArr[2], 8)],
    [bPrArr[3], pCal(bPrArr[3], 2), pCal(bPrArr[3], 3), pCal(bPrArr[3], 5), pCal(bPrArr[3], 8)],
    [bPrArr[4], pCal(bPrArr[4], 2), pCal(bPrArr[4], 3), pCal(bPrArr[4], 5), pCal(bPrArr[4], 8)],
    [bPrArr[5], pCal(bPrArr[5], 2), pCal(bPrArr[5], 3), pCal(bPrArr[5], 5), pCal(bPrArr[5], 8)],
    [bPrArr[6], pCal(bPrArr[6], 2), pCal(bPrArr[6], 3), pCal(bPrArr[6], 5), pCal(bPrArr[6], 8)],
    [bPrArr[7], pCal(bPrArr[7], 2), pCal(bPrArr[7], 3), pCal(bPrArr[7], 5), pCal(bPrArr[7], 8)],
    [bPrArr[8], pCal(bPrArr[8], 2), pCal(bPrArr[8], 3), pCal(bPrArr[8], 5), pCal(bPrArr[8], 8)],
    [bPrArr[9], pCal(bPrArr[9], 2), pCal(bPrArr[9], 3), pCal(bPrArr[9], 5), pCal(bPrArr[9], 8)],
    [bPrArr[10], pCal(bPrArr[10], 2), pCal(bPrArr[10], 3), pCal(bPrArr[10], 5), pCal(bPrArr[10], 8)]
];

var headerFont = {
    font: '15pt Orbitron',
    fill: '#ffffff'
};

var smallFont = {
    font: '10pt Orbitron',
    fill: '#ffffff'
};

var font = {
    font: '12pt Orbitron',
    fill: '#ffffff'
};

var upgradeTexts = [];
var upgradeBox;