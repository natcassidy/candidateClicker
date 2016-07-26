myGame.messageState = function(game) {};

myGame.messageState.prototype = {

    preload: function() {

    },

    create: function() {
        this.frameCount = 0;

        var one = game.add.text(game.width / 2, game.height / 2.2, "Comment suggestions below!");
        one.anchor.setTo(0.5, 0.5);
        var two = game.add.text(one.x, game.height / 1.8, "Thanks for helping us improve!");
        two.anchor.setTo(0.5, 0.5);
        
        //Credit for music until we get image from Joe
        musicText = this.add.text(game.width / 2, game.height * 0.9, "Music By Exothermic", {
        fill: '#ffffff' 
        });
        musicText.anchor.setTo(0.5, 0.5);
    },

    update: function() {
        this.frameCount++;

        if (this.frameCount >= 90){
            if (playerData.selectedCandidate === 'trump' || playerData.selectedCandidate === 'clinton') {
                this.state.start('main', true, false);
            } else { this.state.start('mainMenu', true, false); }
        }
    }
};