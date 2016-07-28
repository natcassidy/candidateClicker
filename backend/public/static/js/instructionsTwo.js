myGame.instructionsTwo = function(game) {};

myGame.instructionsTwo.prototype = {

    preload: function() {

    },

    create: function() {
    
    game.add.image(0, 0, 'instructionsTwo');


    this.startButton = this.add.sprite(480, 400, 'startButton');
    this.startButton.anchor.set(0.0);
    this.startButton.inputEnabled = true;
    this.startButton.events.onInputDown.add(this.moveAlong, this);


    },

    update: function() {

        
    },


    moveAlong: function () {

    this.state.start('main', true, false);
    
    }
    
};