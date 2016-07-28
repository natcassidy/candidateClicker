myGame.mainMenu = function(game) {};

myGame.mainMenu.prototype = {

    preload: function() {

    },

    create: function() {

        // MENUMUSIC NOT IMPLEMENTED YET
        this.music = game.add.audio('gameMusic');

        this.music.play();

        this.music.loop = true;

        game.add.image(0, 0, 'back1');
        game.add.image(260, 70, 'logo');

        //choose your pres text
        game.add.image(90, 30, 'chooseYour');
        game.add.image(350, 30, 'president');

        this.pickTrump = this.add.sprite(396, 110, 'tHead');
        this.pickTrump.anchor.set(0.0);
        this.pickTrump.inputEnabled = true;
        this.pickTrump.events.onInputDown.add(this.trumpSelect, this);

        this.pickClinton = this.add.sprite(134, 110, 'cHead');
        this.pickClinton.anchor.set(0.0);
        this.pickClinton.inputEnabled = true;
        this.pickClinton.events.onInputDown.add(this.clintonSelect, this);


    },

    update: function() {

    },

    trumpSelect: function() {
        playerData.selectedCandidate = 'trump';
        this.music.stop('gameMusic');
        this.state.start('instructions', true, false);
        save(playerData, true);
    },

    clintonSelect: function() {
        playerData.selectedCandidate = 'clinton';
        this.music.stop('gameMusic');
        this.state.start('instructions', true, false);
        save(playerData, true);
    }


};