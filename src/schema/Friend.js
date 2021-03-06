const Player = require('./Player')

class Friend extends Player{
    constructor(friend){
        super();
        this.steamID = friend.steamid;
        this.relationship = friend.relationship;
		this.friendSince = friend.friend_since;
    }

    get friendedAt(){
        return new Date(this.friendSince*1000)
    }
}

module.exports = Friend;