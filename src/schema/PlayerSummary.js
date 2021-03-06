const Player = require('./Player')

class PlayerSummary extends Player {
    constructor(player){
        super();
        this.avatar = {
            small:player.avatar||'',
            medium: player.avatarmedium||'',
			large: player.avatarfull||'',
        }
        this.steamID = player.steamid||'';
        this.visibilityState = player.communityvisibilitystate||'';
        this.nickname = player.personaname||'';
        this.commentPermission = player.commentpermission||'';
        this.url = player.profileurl||'';
        this.avatarHash= player.avatarhash||'';
        this.lastLogOff = player.lastlogoff||'';
        this.personaState = player.personastate||'';
        this.realName = player.realname||'';
        this.primaryGroupID = player.primaryclanid||'';
		this.created = player.timecreated||'';
		this.personaStateFlags = player.personastateflags||'';
		this.countryCode = player.loccountrycode||'';
		this.stateCode = player.locstatecode||'';
        this.cityID = player.loccityid||'';
        
        //about game
		this.gameServerIP = player.gameserverip||'';
		this.gameServerSteamID = player.gameserversteamid||'';
		this.gameExtraInfo = player.gameextrainfo||'';
		this.gameID = player.gameid||'';
    }

    get createdAt(){
        return new Date(this.created*1000)
    }

    get lastLogOffAt(){
        return new Date(this.lastLogOff*1000)
    }
}
module.exports=PlayerSummary;