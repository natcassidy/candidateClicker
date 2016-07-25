myGame.mainMenu = function(game) {};

myGame.mainMenu.prototype = {

    preload: function() {

    

    },

    create: function() {

        game.add.image(0, 0, 'back1');
        game.add.image(260, 70, 'logo');

        //choose your pres text
        game.add.image(90, 30, 'chooseYour');
        game.add.image(350, 30, 'president');

        this.mainStart = this.add.sprite(396, 110, 'tHead');
        this.mainStart.anchor.set(0.0);
        this.mainStart.inputEnabled = true;
        this.mainStart.events.onInputDown.add(this.trumpSelect, this);


        this.mainStart = this.add.sprite(134, 110, 'cHead');
        this.mainStart.anchor.set(0.0);
        this.mainStart.inputEnabled = true;
        this.mainStart.events.onInputDown.add(this.clintonSelect, this);

    },

    update: function() {

    },

     
    

    trumpSelect: function() {
        playerData.selectedCandidate = 'trump'
        this.state.start('main', true, false);
        
    },

    clintonSelect: function () {
        playerData.selectedCandidate = 'clinton'
        this.state.start('main', true, false);
    }
};