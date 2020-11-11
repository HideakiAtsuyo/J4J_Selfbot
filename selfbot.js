const Discord = require('discord.js'),
client = new Discord.Client(),
snekfetch = require("snekfetch");
let config = require('./config.json');//Like this you can change the values without reboot the selfbot

function JoinCode(code, tag){
  console.log(code);
  var Hideaki = snekfetch['post'](`https://discord.com/api/v8/invites/${code}`);
  Hideaki.set("Authorization", config.token);
  Hideaki.send()
  .then(r => {
    console.log(`Joined ${r.body.guild.name} | Sent by ${tag}`);
  })
}

client.once('ready', () => {
	console.log(`----------------------\nLogged in as ${client.user.username}#${client.user.discriminator}\n----------------------`);
})

client.on("message", message => {
   //if (message.author.id == client.user.id || message.channel.type != 'dm' || message.author.bot) return;
   if (message.author.id == client.user.id || message.author.bot) return;
   const regxWithoutCode = /discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)/i;
   const regxHttpHttps = /^(http|https):/;
   if(regxWithoutCode.test(message.content.toLowerCase().replace(/\s+/g, ''))){
   setTimeout(function f(){let tag = `${message.author.username}#${message.author.discriminator}`;JoinCode(message.content.replace(regxWithoutCode, "").replace(regxHttpHttps,"").replace("///", ""),tag);message.channel.send(config.inviteLink);}, 7000);
   setTimeout(function Done(){message.channel.send("Done!");}, 14000);
   return;
   }
   if(message.content.includes('discord.gg') || message.content.includes('https://discord.gg/')) {
}
if(message.content.toLowerCase().includes("Bot") && message.content.includes(`<@${client.user.id}>`) || message.content.includes("bot") && message.content.includes(`<@!${client.user.id}>`)){
  setTimeout(function NotAbot(){message.channel.send("I'm not a bot!");}, 7000);
}
})

client.login(config.token);
