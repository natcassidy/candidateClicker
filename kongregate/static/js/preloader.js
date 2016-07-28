myGame.preloader = function(game) {};



myGame.preloader.prototype = {

    preload: function() {

    this.WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Pixel']
    }
}

        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);

        this.text = this.add.text(game.width / 2, game.height / 2.5, "Music By Exothermic", {
        fill: '#ffffff' 
        });

        this.text = this.add.text(game.width / 2, game.height / 2, "Loading ...", {
            fill: '#ffffff'
        });
        this.text.anchor.set(0.5);

        this.load.image('clickMe', 'static/images/block2.png');

        this.load.image('tempButton', 'static/images/endorsement2.png');

        this.load.image('backgroundTrump', 'static/images/cclicker/web/background1.png');
        this.load.image('backgroundClinton', 'static/images/cclicker/web/background2.png');
        this.load.image('handShake', 'static/images/cclicker/web/handshake.png');
        this.load.image('medal', 'static/images/cclicker/web/medal.png');
        this.load.image('rallyClinton', 'static/images/cclicker/web/rallyClinton.png');
        this.load.image('rallyTrump', 'static/images/cclicker/web/rallyTrump.png');
        this.load.image('starBought', 'static/images/cclicker/web/starBought.png');
        this.load.image('starBuyable', 'static/images/cclicker/web/starBuyable.png');
        this.load.image('starTooCostly', 'static/images/cclicker/web/starTooCostly.png');
        this.load.image('starLocked', 'static/images/cclicker/web/starLocked.png');
        this.load.image('upgradeBar', 'static/images/cclicker/web/upgradebar.png');
        this.load.image('upgradeBarDark', 'static/images/cclicker/web/upgradebardark.png');

        //images used in button array
        this.load.image('campaignStaff', 'static/images/cclicker/web/staff1.png');
        this.load.image('campaignStaff2', 'static/images/cclicker/web/staff2.png');

        this.load.image('tShirt', 'static/images/cclicker/web/tshirt2.png');

        this.load.image('signT', 'static/images/cclicker/web/signTrump.png');
        this.load.image('signC', 'static/images/cclicker/web/signClinton.png');

        this.load.image('radio', 'static/images/cclicker/web/radio.png');

        this.load.image('door', 'static/images/cclicker/web/door.png');

        this.load.image('tv', 'static/images/cclicker/web/tv.png');

        this.load.image('voteMaker', 'static/images/cclicker/web/trumpMachine.png');
        this.load.image('emailServer', 'static/images/cclicker/web/emailServer.png');
        this.load.image('alliance', 'static/images/cclicker/web/handshake.png');
        this.load.image('endorsement', 'static/images/cclicker/web/medal.png');
        this.load.image('rallyTrump', 'static/images/cclicker/web/rallyTrump.png');
        this.load.image('rallyClinton', 'static/images/cclicker/web/rallyClinton.png');

        this.load.image('chooseYour', 'static/images/cclicker/web/chooseYour.png');
        this.load.image('president', 'static/images/cclicker/web/president.png');

        //main menu

        this.load.image('logo', 'static/images/cclicker/web/logo.png');
        this.load.image('back1', 'static/images/cclicker/web/back1.png');

        this.load.image('tHead', 'static/images/cclicker/web/tHead.png');
        this.load.image('cHead', 'static/images/cclicker/web/cHead.png');

        this.load.audio('gameMusic', 'static/audio/gameMusic.mp3');

        //main menu

        this.load.image('back1', 'static/images/cclicker/web/.png');
    },

    create: function() {
    },

    update: function() {
        this.state.start('message', true, false);
    },

    fileComplete: function(progress) {
        this.text.setText("File Complete: " + progress + "%");
    },

    loadComplete: function() {
        this.text.setText("Load Complete!");
        //set timer to make text disappear then start branding animations
    }
};