// if selectedCandidate = trump trump votes += change
// else clinton votes += change

var change = this.votes - previous.votes;
var newTotal;

if (this.selectedCandidate === 'trump') {
dpd.votes.get('9d0d92085c0908d9', function(result){
    newTotal = change + result.trump;
});
dpd.votes.put('9d0d92085c0908d9', { 'trump': newTotal }, function(result, err){
    if (err) {
        return console.log(err);
    }
});
} else { 
dpd.votes.get('9d0d92085c0908d9', function(result){
    newTotal = change + result.clinton;
});
dpd.votes.put('9d0d92085c0908d9', { 'clinton': newTotal }, function(result, err){
    if (err) {
        return console.log(err);
    }
}); }