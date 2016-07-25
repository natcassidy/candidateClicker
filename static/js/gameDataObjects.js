//Arrays used elsewhere, etc.

var upgradeCatalogue = [
    ['doorKnocking', 'door', 'door'],
    ['campaignStaff', 'campaignStaff', 'campaignStaff'],
    ['freeClothing', 'tShirt', 'tShirt'],
    ['picketSign', 'signT', 'signC'],
    ['radio', 'radio', 'radio'],
    ['tv', 'tv', 'tv'],
    ['endorsement', 'endorsement', 'endorsement'],
    ['alliance', 'alliance', 'alliance'],
    ['rally', 'rallyTrump', 'rallyClinton'],
    ['t10', 'voteMaker', 'emailServer']
];

var upgradeKey = ['count', 'ratio', 'rate', 'upgrades', 'basePrice'];

var upgradeUnlocks = [10, 25, 50, 100];

var starUnlockKeys = ['starLocked', 'starTooExpensive', 'starBuyable', 'starBought'];

var tVTText;
var cVTText;

var bPrArr = [10, 90, 990, 12870, 193050, 3281850, 62355150, 1309458150, 30117537450, 752938436250];

var prArr = [
    [bPrArr[0], pCal(bPrArr[0], 2), pCal(bPrArr[0], 3), pCal(bPrArr[0], 4), pCal(bPrArr[0], 5)],
    [bPrArr[1], pCal(bPrArr[1], 2), pCal(bPrArr[1], 3), pCal(bPrArr[1], 4), pCal(bPrArr[1], 5)],
    [bPrArr[2], pCal(bPrArr[2], 2), pCal(bPrArr[2], 3), pCal(bPrArr[2], 4), pCal(bPrArr[2], 5)],
    [bPrArr[3], pCal(bPrArr[3], 2), pCal(bPrArr[3], 3), pCal(bPrArr[3], 4), pCal(bPrArr[3], 5)],
    [bPrArr[4], pCal(bPrArr[4], 2), pCal(bPrArr[4], 3), pCal(bPrArr[4], 4), pCal(bPrArr[4], 5)],
    [bPrArr[5], pCal(bPrArr[5], 2), pCal(bPrArr[5], 3), pCal(bPrArr[5], 4), pCal(bPrArr[5], 5)],
    [bPrArr[6], pCal(bPrArr[6], 2), pCal(bPrArr[6], 3), pCal(bPrArr[6], 4), pCal(bPrArr[6], 5)],
    [bPrArr[7], pCal(bPrArr[7], 2), pCal(bPrArr[7], 3), pCal(bPrArr[7], 4), pCal(bPrArr[7], 5)],
    [bPrArr[8], pCal(bPrArr[8], 2), pCal(bPrArr[8], 3), pCal(bPrArr[8], 4), pCal(bPrArr[8], 5)],
    [bPrArr[9], pCal(bPrArr[9], 2), pCal(bPrArr[9], 3), pCal(bPrArr[9], 4), pCal(bPrArr[9], 5)],
    [bPrArr[10], pCal(bPrArr[10], 2), pCal(bPrArr[10], 3), pCal(bPrArr[10], 4), pCal(bPrArr[10], 5)]
    ];

var buttons = []; //yep, I got desperate and made them global objects. Wooho

var smallFont = { font: 'Pixel', fill: '#ffffff' };

var font = { font: 'Pixel', fill: '#ffffff' };