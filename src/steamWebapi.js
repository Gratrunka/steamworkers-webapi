const Game = require('./schema/Game');
const RecentGame = require('./schema/RecentGame');
const PlayerSummary=require('./schema/PlayerSummary')
const Friend = require('./schema/Friend')
const regID= /^\d{17}$/;

const regAppid=/^\d{1,7}$/;
const regProfileBase = String.raw`(?:(?:(?:(?:https?)?:\/\/)?(?:www\.)?steamcommunity\.com)?)?\/?`;
const regProfileURL = RegExp(String.raw`${regProfileBase}(?:profiles\/)?(\d{17})`, 'i');
const regProfileID = RegExp(String.raw`${regProfileBase}(?:id\/)?([a-z0-9_-]{2,32})`, 'i');
const fetch = require('./utils/fetch');
const STATUS_SUCCESS = 1;

class steamWebapi{
    /**
     * Creates an instance of steamWebapi.
     * @param {string} key  Sets Steam key for future use.
     * @param {string} baseApi Base URL
     * @param {string} baseStore Base URL
     * @memberof steamWebapi
     */
    constructor(key){
        this.key=key;
        this.baseApi='https://api.steampowered.com';
        this.baseStore = 'https://store.steampowered.com/api';
        if(!key) this._warn('no key provided, some methods won\'t work, go get one from https://steamcommunity.com/dev/apikey')
    }

    /**
     *
     * Prints a warning
     * @param {...any} args Message ;
     * @memberof steamWebapi
     */
    _warn(...args){
        console.warn('[steamWebapi]',...args);
    }

    /**
     *
     *
     * @param {string} path Path to request e.g '/IPlayerService/GetOwnedGames/v1?steamid=xxxxxxxxxx'
     * @param {string} [base=this.baseApi] Base URL
     * @param {string} [key=this.key] key
     * @return {Promise<Object>} JSON Response
     * @memberof steamWebapi
     */
    get(path,base=this.baseApi,key=this.key){
        return fetch(`${base}${path}${path.includes('?')?'&':'?'}key=${key}`)
    }


    /**
     * Resolve info for steamid 
     * Rejects promise if a profile couldn't be resolved.
     * @param {string} info vanity URL to get a SteamID for e.g:'https://steamcommunity.com/id/yueQAQ' or 'https://steamcommunity.com/profiles/76561198205559728/'
     * @return {Promise<string>} Profile ID
     * @memberof steamWebapi
     */
    resolve(info){
        if(!info) return Promise.reject(new TypeError('Invalid or no URL provided'))

        let urlMatch=info.match(regProfileURL);
        if(urlMatch!==null) return Promise.resolve(urlMatch[1]);

        let idMatch;
        if((idMatch=info.match(regProfileID))!==null) {
            const id =idMatch[1];
            console.log(id);
            return this.get(`/ISteamUser/ResolveVanityURL/v1?vanityurl=${id
            }`)
                       .then(json=>json.response.success===STATUS_SUCCESS
                        ?Promise.resolve(json.response.steamid)
                        :Promise.reject(new TypeError(json.response.message)))

        }
        return Promise.reject(new TypeError('Invalid format'))
        
    }
    //=========================------User----================================

    /**
     *
     * 获取用户主要信息
     * @param {string} steamid 'id' or [ids]
     * @return {Promise<PlayerSummary>} Summary 
     * @memberof steamWebapi
     */
    getUserSummary(steamid){
        let isarr = Array.isArray(steamid)
        if((isarr&&steamid.some(i=>!regID.test(i))) || (!isarr&&!regID.test(steamid))){
            return Promise.reject(new TypeError('Invalid or no steamid provided'))
        }
        console.log(isarr);
        return this 
               .get(`/ISteamUser/GetPlayerSummaries/v2/?steamids=${steamid}`)
               .then(json=>json.response.players.length
                ?isarr
                    ?json.response.players.map(player=>new PlayerSummary(player))
                    :new PlayerSummary(json.response.players[0])
                :Promise.reject(new TypeError('No players found'))
                );
    }   

    /**
     *
     * 获取用户拥有的游戏列表
     * @param {string} steamid
     * @return {Promise<Game[]>} Owned games 
     * @memberof steamWebapi
     */
    getUserOwnedGames(steamid){
        if(!regID.test(steamid)) return Promise.reject(new TypeError('Invalid or no steamid provided'))

        return this
               .get(`/IPlayerService/GetOwnedGames/v1/?steamid=${steamid}&include_appinfo=true&include_played_free_games=true`)
               .then(json=>json.response.games.map(game=>new Game(game)))
    }

    /**
     *
     * 获取某用户的好友列表
     * @param {string} steamid
     * @return {Promise<Friend[]>} Friends
     * @memberof steamWebapi
     */
    getUserFriends(steamid){
        if(!regID.test(steamid)) return Promise.reject(new TypeError('Invalid or no steamid provided'))

        return this.get(`/ISteamUser/GetFriendList/v1/?steamid=${steamid}`)
                   .then(json=>json.friendslist.friends.map(friend=>new Friend(friend)))
    }

    /**
     *
     * 获取用户所在的群组
     * @param {string} steamid
     * @return {Promise<string[]>} Groups
     * @memberof steamWebapi
     */
    getUserGroups(steamid){
        if(!regID.test(steamid)) return Promise.reject(new TypeError('Invalid or no steamid provided'))
        return this.get(`/ISteamUser/GetUserGroupList/v1?steamid=${steamid}`)
                   .then(json=>json.response.success? 
                    json.response.groups.map(group => group.gid)
                    : Promise.reject(new Error(json.response.message)))
            
    }

    //=========================------Game----================================

    /**
     *
     * 获取用户最近在玩的游戏
     * @param {string} steamid
     * @return {Promise<RecentGame[]>} Recent games 
     * @memberof steamWebapi
     */
    getRecentlyPlayedGames(steamid){
        if(!regID.test(steamid)) return Promise.reject(new TypeError('Invalid or no steamid provided'))
        return this.get(`/IPlayerService/GetRecentlyPlayedGames/v1//?steamid=${steamid}`)
                   .then(json=>json.response.total_count?json.response.games.map(game => new RecentGame(game)) : [])
    }


    /**
     * 获取公开应用的完整列表
     * Get a complete list of public apps
     * @return {*} 
     * @memberof {Promise<App[]>} Array of apps
     */
    getAppList(){
        return this.get('/ISteamApps/GetAppList/v2/').then(json=>json.applist.apps)
    }


    /**
     *
     * 获取某游戏相关更新/新闻
     * @param {string} appid
     * @return {Promise<Object[]>} App news for ID
     * @memberof steamWebapi
     */
    getGameNews(appid){
        if(!regAppid.test(appid)) return Promise.reject(new TypeError('Invalid or no appid provided'))

        return this.get(`/ISteamNews/GetNewsForApp/v2/?appid=${appid}`)
                   .then(json=>json.appnews.count?json.appnews.newsitems : Promise.reject(new Error('No news found')))
    }


    /**
     *
     * 获取某游戏的详细信息
     * @param {string} appid
     * @param {string} [region='CN'] 
     * @return {Promise<Object>} App details for ID
     * @memberof steamWebapi
     */
    getGameDetails(appid,region='CN'){
        if(!regAppid.test(appid)) return Promise.reject(new TypeError('Invalid or no appid provided'))
        
        let request = () =>this.get(`/appdetails?appids=${appid}&cc=${region}`,this.baseStore)
                               .then(json=>json[appid].success
                                ?Promise.resolve(json[appid].data)
                                :Promise.reject(new Error('No app found'))
                            )
        return request()
    }



    /**
     *
     * 获取某游戏在线玩家数
     * @param {string} appid
     * @return {Promise<number>} The number of players playing the game
     * @memberof steamWebapi
     */
    getNumberOfCurrentPlayers(appid){
        if(!regAppid.test(appid)) return Promise.reject(new TypeError('Invalid or no appid provided'))

        return this.get(`/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=${appid}`)
                    .then(json=>json.response.result===1?json.response.player_count : Promise.reject(new Error('No app found')))
    }
        
    /**
     *
     * 获取游戏成就荣誉等信息
     * @param {string} appid
     * @return {Promise<Object>} Complete list of statistics and achievements of specified games
     * @memberof steamWebapi
     */
    getGameSchema(appid) {
		if (!regAppid.test(appid)) return Promise.reject(new TypeError('Invalid or no appid provided'));

		return this
			.get(`/ISteamUserStats/GetSchemaForGame/v2?appid=${appid}`)
			.then(json => json.game ? json.game : Promise.reject(new Error('No app found')));
    }

}

module.exports = steamWebapi;