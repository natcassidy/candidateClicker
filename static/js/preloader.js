myGame.preloader = function (game) {};

myGame.preloader.prototype = {

    preload: function() {

        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);

        this.text = this.add.text(game.width/2, game.height/2, "Loading ...", { fill: '#ffffff' });
        this.text.anchor.set(0.5);

        this.load.image('background', 'static/images/background.png');
        this.load.image('hillary', 'static/images/hillary1.png');
        this.load.image('trump', 'static/images/trump.png');
        this.load.image('upgradeBar', 'static/images/upgrade bar.png');

    },

    create: function() {
        this.done = true;
    },

    update: function() {

        if (this.done){
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
}