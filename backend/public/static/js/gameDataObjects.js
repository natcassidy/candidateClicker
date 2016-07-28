//Arrays used elsewhere, etc.

var upgradeCatalogue = [
    ['doorKnocking', 'door', 'door', [
            "Knocking on doors",
            "Knocking on doors"
        ],
        [
            "Knockin' dem doors!",
            "Knockin' dem doors!"
        ]
    ],
    ['campaignStaff', 'campaignStaff', 'campaignStaff', [
            'Campaign Staff',
            'Campaign Staff'
        ],
        [
            "Hiring dem staff!",
            "Hiring dem staff!"
        ]
    ],
    ['freeClothing', 'tShirt', 'tShirt', [
            'Free Clothing',
            'Free Clothing'
        ],
        [
            "Let them have shirts!",
            "Let them have shirts!"
        ]
    ],
    ['picketSign', 'signT', 'signC', [
            'Picket Signs',
            'Picket Signs'
        ],
        [
            "'We picket, you pick us!'\n...has to be better than \n'Don\'t vote for Trump'",
            "'We picket, you pick us!'\n...has to be better than \n'Make racism great again!'"
        ]
    ],
    ['radio', 'radio', 'radio', [
            'Radio Advertisements',
            'Radio Advertisements'
        ],
        [
            "...that's made for radio...",
            "...that's made for radio..."
        ]
    ],
    ['tv', 'tv', 'tv', [
            'TV Advertisements',
            "TV Advertisements"
        ],
        [
            "Politics: \nNow in your living room!",
            "Politics: \nNow in your living room!"
        ]
    ],
    ['endorsement', 'endorsement', 'endorsement', [
            'Political Endorsement',
            'Political Endorsement'
        ],
        [
            "'I named my kid after you!\n\n...so what if he was 8?'",
            "'I named my kid after you!\n\n...so what if he was 8?'"
        ]
    ],
    ['alliance', 'alliance', 'alliance', [
            'Political Alliance',
            'Political Alliance'
        ],
        [
            "A friend in need is a friend \nyou feed...to the lions!",
            "A friend in need is a friend \nyou feed...to the lions!"
        ]
    ],
    ['rally', 'rallyTrump', 'rallyClinton', [
            'Host Rally',
            "Host Rally"
        ],
        [
            "Now for more than just \ngolfballs!",
            "Now for more than just \ngolfballs!"
        ]
    ],
    ['t10', 'voteMaker', 'emailServer', [
            'The Votemaker 1000',
            'The Email Server'
        ],
        [
            "(Made in China)",
            "'I swear I didn\'t have illegal \ncommunications through \nthat email server.'"
        ]
    ]
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

var initialUps = [
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
var starText;