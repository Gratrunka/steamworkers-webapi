## SteamWebapi
![npm version](https://img.shields.io/badge/steam--webapi-1.0.0-9cf)

## Setup
### Installation
```
npm i steamworkers-webapi
```
### Getting an API Key
Once signed into Steam, head over to http://steamcommunity.com/dev/apikey to generate an API key.This key is very important


### Usage
```js
const SteamWebapi = require('steamworkers-webapi');
const steam = new SteamAPI('<apikey>');
```
Now, we can call methods on the `steam` object.

For example, let's retrieve the SteamID64 of a user. steam-webapi provides a `resolve` method, which accepts an vanity URL
(You can set your vaniturl through the profile in steam platform)
```js
steam.resolve('https://steamcommunity.com/id/yueQAQ').then(id => {
	console.log(id); // 76561198205559728
```
Now you can take that ID, and fetch for message
```js
steam.getUserSummary('76561198146931523').then(summary => {
	console.log(summary);
	/**
	PlayerSummary {
                avatar: {
                    small: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5a/5a3abda990b840532b87678def187f3cda8285c1.jpg',
                    medium: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5a/5a3abda990b840532b87678def187f3cda8285c1_medium.jpg',
                    large: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5a/5a3abda990b840532b87678def187f3cda8285c1_full.jpg'
                },
                steamID: '76561198205559728',
                visibilityState: 3,
                nickname: '想和悦去吹吹风',
                commentPermission: 1,
                url: 'https://steamcommunity.com/id/yueQAQ/',
                avatarHash: '5a3abda990b840532b87678def187f3cda8285c1',
                lastLogOff: 1608990274,
                personaState: 1,
                realName: 'yue',
                primaryGroupID: '103582791429521408',
                created: 1421039116,
                personaStateFlags: '',
                countryCode: 'CO',
                stateCode: '01',
                cityID: 11040,
                gameServerIP: '',
                gameServerSteamID: '',
                gameExtraInfo: '',
                gameID: ''
                }
	*/
});
```
# Documentation
<a name="SteamAPI"></a>

## SteamWebapi
- [Documentation](#documentation)
	- [SteamAPI](#steamapi-1)
		- [new SteamAPI(key)](#new_SteamWebapi_new)
		- [steamAPI.get(path, [base], [key]) ⇒ <code>Promise.&lt;Object&gt;</code>](#steamapigetpath-base-key-%E2%87%92-codepromiseltobjectgtcode)
		- [steamAPI.resolve(info) ⇒ <code>Promise.&lt;string&gt;</code>](#steamapiresolveinfo-%E2%87%92-codepromiseltstringgtcode)
        - [steamAPI.getUserSummary(id) ⇒ <code>Promise.&lt;PlayerSummary&gt;</code>](#steamapigetusersummaryid-%E2%87%92-codepromiseltplayersummarygtcode)
        - [steamAPI.getUserOwnedGames(id) ⇒ <code>Promise.&lt;Array.&lt;Game&gt;&gt;</code>](#steamapigetuserownedgamesid-%E2%87%92-codepromiseltarrayltgamegtgtcode)
        - [steamAPI.getUserFriends(id) ⇒ <code>Promise.&lt;Array.&lt;Friend&gt;&gt;</code>](#steamapigetuserfriendsid-%E2%87%92-codepromiseltarrayltfriendgtgtcode)
        - [steamAPI.getUserGroups(id) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>](#steamapigetusergroupsid-%E2%87%92-codepromiseltarrayltstringgtgtcode)
        - [steamAPI.getUserRecentGames(id) ⇒ <code>Promise.&lt;Array.&lt;RecentGame&gt;&gt;</code>](#steamapigetuserrecentgamesid-%E2%87%92-codepromiseltarrayltrecentgamegtgtcode)
		- [steamAPI.getAppList() ⇒ <code>Promise.&lt;Array.&lt;App&gt;&gt;</code>](#steamapigetapplist-%E2%87%92-codepromiseltarrayltappgtgtcode)
        - [steamAPI.getGameNews(app) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>](#steamapigetgamenewsapp-%E2%87%92-codepromiseltarrayltobjectgtgtcode)
		- [steamAPI.getGameDetails(app, [force]) ⇒ <code>Promise.&lt;Object&gt;</code>](#steamapigetgamedetailsapp-force-%E2%87%92-codepromiseltobjectgtcode)
        - [steamAPI.getNumberOfCurrentPlayers(app) ⇒ <code>Promise.&lt;number&gt;</code>](#steamapigetgameplayersapp-%E2%87%92-codepromiseltnumbergtcode)
		- [steamAPI.getGameSchema(app) ⇒ <code>Promise.&lt;Object&gt;</code>](#steamapigetgameschemaapp-%E2%87%92-codepromiseltobjectgtcode)

<a name="new_SteamWebapi_new"></a>

### new SteamWebapi(key, [options])
Sets Steam key for future use.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | Steam key |

### steam.get(path, [base], [key]) ⇒ <code>Promise.&lt;Object&gt;</code>


**Returns**: <code>Promise.&lt;Object&gt;</code> - JSON Response  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | Path to request e.g '/IPlayerService/GetOwnedGames/v1?steamid=1234567534543' |
| [base] | <code>string</code> | <code>&quot;this.baseAPI&quot;</code> | Base URL |
| [key] | <code>string</code> | <code>&quot;this.key&quot;</code> | The key to use |

<a name="SteamAPI+resolve"></a>

### steam.resolve(info) ⇒ <code>Promise.&lt;string&gt;</code>
Resolve info for steamid 
Rejects promise if a profile couldn't be resolved.

**Returns**: <code>Promise.&lt;string&gt;</code> - Profile ID  

| Param | Type | Description |
| --- | --- | --- |
| info | <code>string</code> | Something to resolve e.g 'https://steamcommunity.com/id/yueQAQ' |

<a name="SteamAPI+getUserSummary"></a>

### steam.getUserSummary(id) ⇒ <code>Promise.&lt;PlayerSummary&gt;</code>
Get users summary.
**Returns**: <code>Promise.&lt;PlayerSummary&gt;</code> - Summary  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | User ID |

<a name="SteamAPI+getUserOwnedGames"></a>

### steam.getUserOwnedGames(id) ⇒ <code>Promise.&lt;Array.&lt;Game&gt;&gt;</code>
Get users owned games.

**Kind**: instance method of [<code>SteamAPI</code>](#SteamAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Game&gt;&gt;</code> - Owned games  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | User ID |
		
<a name="SteamAPI+getUserFriends"></a>

### steam.getUserFriends(id) ⇒ <code>Promise.&lt;Array.&lt;Friend&gt;&gt;</code>
Get users friends.

**Kind**: instance method of [<code>SteamAPI</code>](#SteamAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Friend&gt;&gt;</code> - Friends  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | User ID |

<a name="SteamAPI+getUserGroups"></a>

### steam.getUserGroups(id) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Get users groups.

**Kind**: instance method of [<code>SteamAPI</code>](#SteamAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - Groups  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | User ID |		
		
<a name="SteamAPI+getUserRecentGames"></a>

### steam.getUserRecentGames(id) ⇒ <code>Promise.&lt;Array.&lt;RecentGame&gt;&gt;</code>
Get users recent games.

**Kind**: instance method of [<code>SteamAPI</code>](#SteamAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;RecentGame&gt;&gt;</code> - Recent games  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | User ID |

<a name="SteamAPI+getAppList"></a>

### steam.getAppList() ⇒ <code>Promise.&lt;Array.&lt;App&gt;&gt;</code>
Get every single app on steam.

**Kind**: instance method of [<code>SteamAPI</code>](#SteamAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;App&gt;&gt;</code> - Array of apps  		

### steam.getGameNews(app) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Get news for app id.

**Kind**: instance method of [<code>SteamAPI</code>](#SteamAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - App news for ID  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>string</code> | App ID |		

<a name="SteamAPI+getGameDetails"></a>

### steam.getGameDetails(app, [force]) ⇒ <code>Promise.&lt;Object&gt;</code>
Get details for app id.
<warn>Requests for this endpoint are limited to 200 every 5 minutes</warn>

**Kind**: instance method of [<code>SteamAPI</code>](#SteamAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - App details for ID  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| app | <code>string</code> |  | App ID |
| [force] | <code>boolean</code> | <code>false</code> | Overwrite cache |

<a name="SteamAPI+getGamePlayers"></a>

### steam.getGamePlayers(app) ⇒ <code>Promise.&lt;number&gt;</code>
Get number of current players for app id.

**Kind**: instance method of [<code>SteamAPI</code>](#SteamAPI)  
**Returns**: <code>Promise.&lt;number&gt;</code> - Number of players  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>string</code> | App ID |

<a name="SteamAPI+getGameSchema"></a>

### steam.getNumberOfCurrentPlayers(app) ⇒ <code>Promise.&lt;Object&gt;</code>
Get schema for app id.

**Kind**: instance method of [<code>SteamAPI</code>](#SteamAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Schema  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>string</code> | App ID |