
<div align="center">
	<h1>discordsbm</h1>
	<br>
	 <a href="https://www.npmjs.com/package/discordsbm"><img src="https://nodei.co/npm/discordsbm.png?downloads=true&stars=true" alt="NPM Banner"></a>
	 <br>
	 <img src="https://img.shields.io/npm/dt/discordsbm.png">
</div>
<br>
https://armsite.ir/discordsbm/Guild.js
<br>
Download this script and import in your Discord.js package
<br>
Address file of package : \node_modules\discord.js\src\structures\Guild.js

## Installation

**Node.js 12.0.0 or newer is required.**  
` npm install discordsbm `

## Requires 

canvas@latest <br>
discord.js@12.5.3 <br>
sqlite3@latest

## Example usage
```JS
const discordSBM = require("discordsbm");

const discord = require("discord.js");
const sqlite3 = require("sqlite3");
const client = new discord.Client();
const canvas = require("canvas")
var fontSize = "200px";
var fontColor = "#FFF";
var images = ["1.png" , "2.png"];
var guildId = "GUILD ID";
var fontFamily = "Northead";

discordSBM.changeTime(60000); // type Ms

discordSBM.posOfRec(90,-100);
discordSBM.posOfMic(2100,-100);
discordSBM.posOfDate(1170,-100);

discordSBM.run(client , canvas , sqlite3 , guildId, images , fontColor , fontSize , fontFamily);
```

## Report Bug

https://discord.gg/7sdWkWfwW8