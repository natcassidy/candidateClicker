myGame.preloader = function (game) {};

myGame.preloader.prototype = {

    preload: function() {

        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);

        this.text = this.add.text(game.width/2, game.height/2, "Loading ...", { fill: '#ffffff' });
        this.text.anchor.set(0.5);

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
    }
}