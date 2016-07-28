myGame.instructions = function(game) {};

myGame.instructions.prototype = {

    preload: function() {

    },

    create: function() {
    
    game.add.image(0, 0, 'instructionsOne');

    this.nextButton = this.add.sprite(134, 110, 'nextButton');
    this.nextButton.anchor.set(0.0);
    this.nextButton.inputEnabled = true;
    this.nextButton.events.onInputDown.add(this.moveAlong, this);
        
    },

    update: function() {

        
    },

    moveAlong: function () {
    this.state.start('instructionsTwo', true, false);

    }
    
};