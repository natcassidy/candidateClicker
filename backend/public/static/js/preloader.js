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

        this.text = this.add.text(game.width / 2, game.height / 2, "Loading ...", {
            fill: '#ffffff'
        });
        this.text.anchor.set(0.5);

        this.load.image('clickMe', 'static/images/block2.png');

        this.load.image('tempButton', 'static/images/endorsement2.png');

        this.load.image('backgroundTrump', 'static/images/cclicker/web/background1.png');
        this.load.image('backgroundClinton', 'static/images/cclicker/web/background2.png');
        this.load.image('door', 'static/images/cclicker/web/door.png');
        this.load.image('emailServer', 'static/images/cclicker/web/emailServer.png');
        this.load.image('handShake', 'static/images/cclicker/web/handshake.png');
        this.load.image('medal', 'static/images/cclicker/web/medal.png');
        this.load.image('radio', 'static/images/cclicker/web/radio.png');
        this.load.image('rallyClinton', 'static/images/cclicker/web/rallyClinton.png');
        this.load.image('rallyTrump', 'static/images/cclicker/web/rallyTrump.png');
        this.load.image('staff1', 'static/images/cclicker/web/staff1.png');
        this.load.image('staff2', 'static/images/cclicker/web/staff2.png');
        this.load.image('starDark', 'static/images/cclicker/web/stardark.png');
        this.load.image('starNormal', 'static/images/cclicker/web/starnormal.png');
        this.load.image('starUnnormal', 'static/images/cclicker/web/starunnormal.png');
        this.load.image('starUnnormalGrey', 'static/images/cclicker/web/starunnormalgrey.png');
        this.load.image('trumpMachine', 'static/images/cclicker/web/trumpMachine.png');
        this.load.image('tShirt', 'static/images/cclicker/web/tshirt2.png');
        this.load.image('tv', 'static/images/cclicker/web/tv.png');
        this.load.image('u', 'static/images/cclicker/web/u.png');
        this.load.image('upgradeBar', 'static/images/cclicker/web/upgradebar.png');
        this.load.image('upgradeBarDark', 'static/images/cclicker/web/upgradebardark.png');

    },

    create: function() {
        this.done = true;
    },

    update: function() {

        if (this.done) {
            this.state.start('mainMenu', true, false);
        }
    },

    fileComplete: function(progress) {
        this.text.setText("File Complete: " + progress + "%");
    },

    loadComplete: function() {
        this.text.setText("Load Complete!");
        //set timer to make text disappear then start branding animations
    }
};