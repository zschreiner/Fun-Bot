/*
 Copyright (c) 2013-2017 by Tawi Jordan - ๖ۣۜĐJ - ɴᴇᴏɴ - TFL
 
 Permission to use this software for any purpose without fee is hereby granted, provided
 that the above copyright notice and this permission notice appear in all copies.
 
 Permission to copy and/or edit this software or parts of it for any purpose is permitted,
 provided that the following points are followed.
 - The above copyright notice and this permission notice appear in all copies
 - Within two (2) days after modification is proven working, any modifications are send back
   to the original authors to be inspected with the goal of inclusion in the official software
 - Any edited version are only test versions and not permitted to be run as a final product
 - Any edited version aren't to be distributed
 - Any edited version have the prerelease version set to something that can be distinguished
   from a version used in the original software
 
 
 TERMS OF REPRODUCTION USE
 
 Failure to follow these terms will result in me getting very angry at you
 and having your software tweaked or removed if possible. Either way, you're
 still an idiot for not following such a basic rule.
 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHORS DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
 INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHORS
 BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER
 RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 

 * @Author:    Tawi Jordan - ๖ۣۜĐJ - ɴᴇᴏɴ - TFL (Member. on Plug.dj)
 *
 */


//                                              ====== FUN BOT SCRIPT  ======


var Funbot = {};
var ruleSkip = {};
Funbot.misc = {};
Funbot.settings = {};
Funbot.moderators = {};
Funbot.filters = {};
botMethods = {};
Funbot.pubVars = {};
 
toSave = {};
toSave.settings = Funbot.settings;
toSave.moderators = Funbot.moderators;
 
Funbot.misc.version = "1.0.21";
Funbot.misc.origin = "This bot was created by DJ - ɴᴇᴏɴ - TFL, and it is copyrighted!";
Funbot.misc.ready = true;
Funbot.misc.lockSkipping = false;
Funbot.misc.lockSkipped = "0";
Funbot.misc.tacos = new Array();
var songBoundary = 60 * 7;
var announcementTick = 60 * 7;
var lastAnnouncement = 0;

joined = new Date().getTime();
 
cancel = false;

Funbot.filters.beggerWords = new Array();
Funbot.filters.commandWords = new Array();

// Bot's settings
Funbot.settings.maxLength = 10; 
Funbot.settings.cooldown = 10; 
Funbot.settings.staffMeansAccess = true;
Funbot.settings.historyFilter = true;
Funbot.settings.beggerFilter = true;
Funbot.settings.commandFilter = true;
Funbot.settings.interactive = true;
Funbot.settings.ruleSkip = true;
Funbot.settings.removedFilter = true;

// Admins of the bot
Funbot.admins = ["50aeaeb6c3b97a2cb4c25bd2","52e7e02f3b79034be65bff45"];

// Random announcements.
var announcements = 
["I'm a bot!"];


// Keywords of blocked songs
var blockedSongs = [
    "Rick Roll",
    "GANGNAM",
    "The Fox",
    "The Fox [Official music video HD]",
    "10 hour"
];

// Keywords of blocked artist.
var blockedArtists = [
    "Rick Astley",
    "Miley Cyrus"
];

// Filter Keywords
Funbot.filters.beggerWords = ["fanme","fan me","fan4fan","fan 4 fan","fan pls","fans please","need fan","more fan","fan back","give me fans","gimme fans"];
Funbot.filters.commandWords = ["!status",".changelog",".say",".catfact",".dogfact",".fortune",".songlink",".down",".join",".status",".tcf",".cf",".rules",".version",".test"];

// Fun Commands
Funbot.misc.tacos = ["blunt","kush","Chemo","Locoweed","marijuana","Ganja"];
Funbot.misc.cookie = ["a chocolate chip cookie", "a sugar cookie", "an oatmeal raisin cookie", "a 'special' brownie", "an animal cracker", "a scooby snack", "a blueberry muffin", "a cupcake","Strawberry Sunday", "Chocolate Chip Icecream Cone", "Cookie Dough Triple Scoop ", "Mint Chocolate Chip Icecream Cone", "Chocolate Icecream Sunday", "Banana Split with Whipped Cream", "Vanilla Icecream Cone with Sprinkles ", "Bubblegum Flavored Popcicle"];


Funbot.pubVars.skipOnExceed;
Funbot.pubVars.command = false;
 
Array.prototype.remove=function(){var c,f=arguments,d=f.length,e;while(d&&this.length){c=f[--d];while((e=this.indexOf(c))!==-1){this.splice(e,1)}}return this};
window.setInterval(sendAnnouncement, 1000 * announcementTick);

API.on(API.DJ_ADVANCE, djAdvanceEvent);
API.on(API.DJ_ADVANCE, listener);
API.on(API.DJ_ADVANCE, woot);
API.on(API.USER_JOIN, UserJoin);
API.on(API.DJ_ADVANCE, DJ_ADVANCE);


function woot(){
$('#woot').click();
}
 
function UserJoin(user)
{
var JoinMsg = ["@user has joined!","welcome @user!","Hey there @user!","Glad you came by @user"];
r = Math.floor(Math.random() * JoinMsg.length);
API.sendChat(JoinMsg[r].replace("user", user.username));
}

function djAdvanceEvent(data){
    setTimeout(function(){ botMethods.data }, 500);
}


botMethods.skip = function(){
    setTimeout(function(){
        if(!cancel) API.moderateForceSkip();
    }, 3500);
};
 
botMethods.load = function(){
    toSave = JSON.parse(localStorage.getItem("FunbotSave"));
    Funbot.settings = toSave.settings;
    ruleSkip = toSave.ruleSkip;
};
 
botMethods.save = function(){localStorage.setItem("FunbotSave", JSON.stringify(toSave))};
 
botMethods.loadStorage = function(){
    if(localStorage.getItem("FunbotSave") !== null){
        botMethods.load();
    }else{
        botMethods.save();
    }
};
 
botMethods.checkHistory = function(){
    currentlyPlaying = API.getMedia(), history = API.getHistory();
    caught = 0;
    for(var i = 0; i < history.length; i++){
        if(currentlyPlaying.cid === history[i].media.cid){
            caught++;
        }
    }
    caught--;
    return caught;
};
 
botMethods.getID = function(username){
    var users = API.getUsers();
    var result = "";
    for(var i = 0; i < users.length; i++){
        if(users[i].username === username){
            result = users[i].id;
            return result;
        }
    }
 
    return "notFound";
};
 
botMethods.cleanString = function(string){
    return string.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&#34;/g, "\"").replace(/&#59;/g, ";").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};
   
    function listener(data)
{
    if (data == null)
    {
        return;
    }
 
    var title = data.media.title;
    var author = data.media.author;
    for (var i = 0; i < blockedSongs.length; i++)
    {
        if (title.indexOf(blockedSongs[i]) != -1 || author.indexOf(blockedArtists[i]) != -1)
        {
            API.moderateForceSkip();
            chatMe("I Skipped: \"" + title + "\" because it is blocked.");
            return;
        }
    }
 
    var songLenRaw = $("#time-remaining-value").text();
    var songLenParts = songLenRaw.split(":");
    var songLen = (parseInt(songLenParts[0].substring(1)) * 60) + parseInt(songLenParts[1]);
    if (songLen >= songBoundary)
    {
        window.setTimeout(skipLongSong, 1000 * songBoundary);
    }
}
 
function skipLongSong()
{
    API.moderateForceSkip();
    chatMe("Skipping song because it has exceeded the song limit (" + (songBoundary / 60) + " minutes.)");
}
 
function sendAnnouncement()
{
        if (lastAnnouncement++ >= announcements.length - 1)
        {
                lastAnnouncement = 0;
        }
    chatMe(announcements[lastAnnouncement]);
}
 
function chatMe(msg)
{
        API.sendChat(msg);
};

    API.on(API.CHAT, function(data){
        if(data.message.indexOf('.') === 0){
            var msg = data.message, from = data.from, fromID = data.fromID;
            var command = msg.substring(1).split(' ');
            if(typeof command[2] != "undefined"){
                for(var i = 2; i<command.length; i++){
                    command[1] = command[1] + ' ' + command[i];
                }
            }
            if(Funbot.misc.ready || Funbot.admins.indexOf(fromID) > -1 || API.getUser(data.fromID).permission > 1 || API.getUser(fromID).permission < 2){
                switch(command[0].toLowerCase()){
 
                case "commands":
                case "command":
                        if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                           API.sendChat(".{commands} Mention is included!");
                        setTimeout(function(){
                           API.sendChat(commands);
                        }, 650);
                        }
                        break;
                
                case "test":
                        if(Funbot.admins.indexOf(fromID) > -1){
                            API.sendChat("@"+ data.from +" Test Successful");
                            }else{
                            API.sendChat("This command requires Admins only!");
                        }
                        break;
                        
                case "skip":
                       if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            API.moderateForceSkip();
                            }else{
                            API.sendChat("This command requires Bouncer only!");
                        }
                        break;
                        
                case "lockskip":
                       if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            API.moderateLockWaitList(true);
                            setTimeout("API.moderateForceSkip();", 300);
                            setTimeout("API.moderateLockWaitList(false);", 600);
                            }else{
                            API.sendChat("This command requires Bouncer only!");
                        }
                        break;
                  
                case "say":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                            }else{
                            API.sendChat(command[1]);
                        }
                    }
                        break;
                        
                case "add":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                            $(".icon-curate").click();
                            $($(".curate").children(".menu").children().children()[0]).mousedown();
                        }
                    }
                        break;
 
                case "props":
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                           API.sendChat("@"+ data.from +" just gave props to @"+ API.getDJ().username +" for playing a dope track!");
                        }
                    }
                        break;
 
                case "woot":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                           API.sendChat("One woot coming up!");
                        setTimeout(function(){
                           document.getElementById("woot").click()
                        }, 650);
                        }
                        }else{
                           API.sendChat("This command requires bouncer +");
                        }
                        break;
 
                case "meh":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                           API.sendChat("Bummer, A meh has been requested!!");
                        setTimeout(function(){
                           document.getElementById("meh").click()
                        }, 650);
                        }
                        }else{
                           API.sendChat("This command requires bouncer +");
                        }
                        break;
 
                case "join":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                            API.djJoin();
                        }
                        }else{
                           API.sendChat("This command requires bouncer +");
                        }
                        break;
 
                case "leave":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                            API.djLeave();
                        }
                    }else {
                           API.sendChat("This command requires bouncer +");
                        }
                        break;
 
                case "votes":
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        API.sendChat("Users vote:  :+1: " + API.getRoomScore().positive + " | :-1: " + API.getRoomScore().negative + " | :purple_heart: " + API.getRoomScore().curates);
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
                        
                case "version":
                       if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                        API.sendChat("Bot Version "+ Funbot.misc.version);
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }else {
                           API.sendChat("This command requires bouncer +");
                        }
                        break;
                        
                case "source":
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            API.sendChat("DJ - ɴᴇᴏɴ - TFL wrote me at github which is available here: http://goo.gl/iLRyWJ");
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
 
                case "whywoot":
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            API.sendChat("Plug gives you 1 point for wooting the current song if you don't like the song i suggest you remain neutral");
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+" Plug gives you 1 point for wooting the current song if you don't like the song i suggest you remain neutral");
                        }else{
                            API.sendChat("Plug gives you 1 point for wooting the current song if you don't like the song i suggest you remain neutral");
                        }
                        if(Funbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
 
                    case "whymeh":
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            API.sendChat("Reserve Mehs for songs that are a) extremely overplayed b) off genre c) absolutely god awful or d) troll songs. ");
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+" Reserve Mehs for songs that are a) extremely overplayed b) off genre c) absolutely god awful or d) troll songs. ");
                        }else{
                            API.sendChat("Reserve Mehs for songs that are a) extremely overplayed b) off genre c) absolutely god awful or d) troll songs. ");
                        }
                        if(Funbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
 
                    case "help":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("Greetings! Create a playlist and populate it with songs from either YouTube or Soundcloud. Click the 'Join Waitlist' button and wait your turn to play music.");
                                setTimeout(function(){
                            API.sendChat("Ask a mod if you're unsure about your song choice.");
                         }, 650);
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+ "Greetings! Create a playlist and populate it with songs from either YouTube or Soundcloud. Click the 'Join Waitlist' button and wait your turn to play music.");
                                setTimeout(function(){
                            API.sendChat("Ask a mod if you're unsure about your song choice.");
                         }, 650);
                        }
                        if(Funbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;  
                
                
                        
                   case "author":
                   case "authors":
                   case "creator":
                        if(Funbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                           API.sendChat(Funbot.misc.origin);
                           Funbot.misc.ready = false;
                           setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;

                        
                   case "beggerfilter":
                   case "bf":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1) Funbot.settings.beggerFilter ? API.sendChat("Begger filter is enabled") : API.sendChat("Begger filter is disabled");
                        botMethods.save();
                        break;
                        
                   case "commandfilter":
                   case "cf":
                        if(Funbot.admins.indexOf(fromID) > -1) Funbot.settings.commandFilter ? API.sendChat("Commands filter is enabled") : API.sendChat("Commands filter is disabled");
                        botMethods.save();
                        break;
                        
                   case "tbf":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            if(Funbot.settings.beggerFilter){
                                Funbot.settings.beggerFilter = false;
                                API.sendChat("Bot will no longer filter fan begging.");
                            }else{
                                Funbot.settings.beggerFilter = true;
                                API.sendChat("Bot will now filter fan begging.");
                            }
                        }
                        botMethods.save();
                        break;
                        
                   case "tcf":
                        if(Funbot.admins.indexOf(fromID) > -1){
                            if(Funbot.settings.commandFilter){
                                Funbot.settings.commandFilter = false;
                                API.sendChat("Bot will no longer filter commands.");
                            }else{
                                Funbot.settings.commandFilter = true;
                                API.sendChat("Bot will now filter commands.");
                            }
                        }
                        botMethods.save();
                        break;
                        
                   case "status":
                        if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            var response = "";
                            var currentTime = new Date().getTime();
                            var minutes = Math.floor((currentTime - joined) / 60000);
                            var hours = 0;
                            while(minutes > 60){
                                minutes = minutes - 60;
                                hours++;
                            }
                            hours == 0 ? response = "Running for " + minutes + "m " : response = "Running for " + hours + "h " + minutes + "m";
                            response = response + " | Begger filter: "+ Funbot.settings.beggerFilter;
                            response = response + " | History filter: "+ Funbot.settings.historyFilter;
                            response = response + " | MaxLength: " + Funbot.settings.maxLength + "m";
                            response = response + " | Cooldown: " + Funbot.settings.cooldown + "s";
                            response = response + " | Removed Video Filter: "+ Funbot.settings.removedFilter;
                            API.sendChat(response);
                        }else {
                           API.sendChat("This command requires bouncer +");
                        }
                        break;
 
                  case "fortune":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomFortune = Math.floor(Math.random() * Funbot.misc.fortune.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ","+ Funbot.misc.fortune[randomFortune]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ","+ Funbot.misc.fortune[randomFortune]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomFortune = Math.floor(Math.random() * Funbot.misc.fortune.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ","+ Funbot.misc.fortune[randomFortune]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ","+ Funbot.misc.fortune[randomFortune]);
                                    break;
                           }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
                        
                 case "roll":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomRoll = Math.floor(Math.random() * Funbot.misc.roll.length);
                            var randomSentence = Math.floor(Math.random() * 2);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@"+ data.from +" You rolled a "+ Funbot.misc.roll2[randomRoll]);
                                    setTimeout(function(){
                                    document.getElementById("woot").click()
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.roll[randomRoll]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomRoll = Math.floor(Math.random() * Funbot.misc.roll.length);
                            var randomSentence = Math.floor(Math.random() * 2);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@"+ data.from +" You rolled a "+ Funbot.misc.roll2[randomRoll]);
                                    setTimeout(function(){
                                    document.getElementById("woot").click()
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.roll[randomRoll]);
                                    break;
                           }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
 
                 case "8ball":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomBall = Math.floor(Math.random() * Funbot.misc.ball.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.ball[randomBall]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.ball[randomBall]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomBall = Math.floor(Math.random() * Funbot.misc.ball.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.ball[randomBall]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.ball[randomBall]);
                                    break;
                           }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
 
                    case "flipcoin":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomHt = Math.floor(Math.random() * Funbot.misc.ht.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat(Funbot.misc.ht[randomHt]);
                                    break;
                                case 1:
                                    API.sendChat(Funbot.misc.ht[randomHt]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomHt = Math.floor(Math.random() * Funbot.misc.ht.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat(Funbot.misc.ht[randomHt]);
                                    break;
                                case 1:
                                    API.sendChat(Funbot.misc.ht[randomHt]);
                                    break;
                           }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
 
 
                    case "cookie":
                    case "reward":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomCookie = Math.floor(Math.random() * Funbot.misc.cookie.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat(crowd[randomUser].username+ ", @" + data.from + " has rewarded you with " + Funbot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                                case 1:
                                    API.sendChat(crowd[randomUser].username+ ", @" + data.from + " has rewarded you with " + Funbot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                            }
                        }else{
                        if(typeof command[1] == "undefined") command[1] = command[1].substring(1);
                            var randomCookie = Math.floor(Math.random() * Funbot.misc.cookie.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat(command[1]+", "+ data.from +" has rewarded you with " + Funbot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                                case 1:
                                    API.sendChat(command[1]+", "+ data.from +" has rewarded you with " + Funbot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                            }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
                        
                        
                    case "hug":
                        if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("Hugs? Forget that!");
                                    setTimeout(function(){
                                        API.sendChat("/me grabs @"+command[1]+"'s ass");
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("/me gives @"+command[1]+" a big bear hug");
                                    break;
                                case 2:
                                    API.sendChat("/me gives @"+command[1]+" a soft, furry hug");
                                    break;
                                case 3:
                                    API.sendChat("/me gives @"+command[1]+" an awkward hug");
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("Hugs? Forget that!");
                                    setTimeout(function(){
                                        API.sendChat("/me grabs @"+command[1]+"'s ass");
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("/me gives @"+command[1]+" a big bear hug");
                                    break;
                                case 2:
                                    API.sendChat("/me gives @"+command[1]+" a soft, furry hug");
                                    break;
                                case 3:
                                    API.sendChat("/me gives @"+command[1]+" an awkward hug");
                                    break;
                            }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
 
                 case "dogfact":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomDogfact = Math.floor(Math.random() * Funbot.misc.dogfact.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.dogfact[randomDogfact]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.dogfact[randomDogfact]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomDogfact = Math.floor(Math.random() * Funbot.misc.dogfact.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.dogfact[randomdogfact]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.dogfact[randomDogfact]);
                                    break;
                           }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
                       
                    case "catfact":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomCatfact = Math.floor(Math.random() * Funbot.misc.catfact.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.catfact[randomCatfact]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.catfact[randomCatfact]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomCatfact = Math.floor(Math.random() * Funbot.misc.catfact.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.catfact[randomCatfact]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Funbot.misc.catfact[randomCatfact]);
                                    break;
                           }
                        }
                       if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
                            Funbot.misc.ready = false;
                            setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                        }
                        break;
                }
            }
        }
    });
    
    
    API.on(API.CHAT, function(data){
        msg = data.message.toLowerCase(), chatID = data.chatID;
 
        for(var i = 0; i < Funbot.filters.beggerWords.length; i++){
            if(msg.indexOf(Funbot.filters.beggerWords[i].toLowerCase()) > -1 && Funbot.settings.beggerFilter){
                API.moderateDeleteChat(chatID);
                responses = ["Good idea @{beggar}!  Don't earn your fans or anything thats so yesterday", "Guys @{beggar} asked us to fan him!  Lets all totally do it! ಠ_ಠ", "srsly @{beggar}? ಠ_ಠ", "@{beggar}.  Earning his fans the good old fashioned way.  Hard work and elbow grease.  A true american."];
                r = Math.floor(Math.random() * responses.length);
                API.sendChat(responses[r].replace("{beggar}", data.from));
            }
            if(msg.indexOf(Funbot.filters.commandWords[i].toLowerCase()) > -1 && Funbot.settings.commandFilter){
                API.moderateDeleteChat(chatID);
            }
        }
 
    });
    
    
    API.on(API.CHAT, function(data){
        msg = data.message.toLowerCase(), chatID = data.chatID, fromID = data.fromID;
        if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
            if(msg.indexOf('hello bot') !== -1 || msg.indexOf('bot hello') !== -1 || msg.indexOf('hi bot') !== -1 || msg.indexOf('bot hi') !== -1 || msg.indexOf('sup bot') !== -1 || msg.indexOf('bot sup') !== -1 || msg.indexOf('hey bot') !== -1 || msg.indexOf('bot hey') !== -1 || msg.indexOf('howdy bot') !== -1 || msg.indexOf('bot howdy') !== -1 || msg.indexOf('aye bot') !== -1 || msg.indexOf('yo bot') !== -1 || msg.indexOf('waddup bot') !== -1 || msg.indexOf('bot waddup') !== -1){
                var HelloMsg = ["Hey!","Oh hey there!","Good day sir!","Hi","Howdy!","Waddup!"];
                API.sendChat("@" + data.from + " " + HelloMsg[Math.floor(Math.random() * HelloMsg.length)]);
                    Funbot.misc.ready = false;
                    setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                }
            
        }
        if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
            if(msg.indexOf("how are you bot") !== -1 || msg.indexOf("bot how are you") !== -1 || msg.indexOf("hru bot") !== -1 || msg.indexOf("bot hru") !== -1 || msg.indexOf("doing good bot?") !== -1 || msg.indexOf("bot doing good?") !== -1 || msg.indexOf("hows it going bot") !== -1 || msg.indexOf("bot how is it going") !== -1 || msg.indexOf("how you doing bot") !== -1 || msg.indexOf("bot how you doing") !== -1){
                var HRUMsg = ["I'm good thanks for asking :)","Doing great yo and yourself?","All Good Mate!","I'm good thanks for asking!","Yeee i'm cool and youself yo?"];
                API.sendChat("@" + data.from + " " + HRUMsg[Math.floor(Math.random() * HRUMsg.length)]);
                    Funbot.misc.ready = false;
                    setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                }
        }
        if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
            if(msg.indexOf("ty bot") !== -1 || msg.indexOf("bot ty") !== -1 || msg.indexOf("thank you bot") !== -1 || msg.indexOf("bot thank you") !== -1 || msg.indexOf("thanks bot") !== -1 || msg.indexOf("bot thanks") !== -1 || msg.indexOf("thx bot") !== -1 || msg.indexOf("bot thx") !== -1){
                var TYMsg = ["You're welcome! :D","Your always welcome bro!","No prob man.."];
                API.sendChat("@" + data.from + " " + TYMsg[Math.floor(Math.random() * TYMsg.length)]);
                    Funbot.misc.ready = false;
                    setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                }
        }
        if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
            if(msg.indexOf("ily bot") !== -1 || msg.indexOf("bot ily") !== -1 || msg.indexOf("i love you bot") !== -1 || msg.indexOf("bot i love you") !== -1 || msg.indexOf("i luv you bot") !== -1 || msg.indexOf("bot i luv you") !== -1 || msg.indexOf("i luv u bot") !== -1 || msg.indexOf("bot i luv u") !== -1 || msg.indexOf("i luv you bot") !== -1 || msg.indexOf("i love you more bot") !== -1){
                var LoveMsg = ["Fuck yeahh!! :D I love you too baby!","I love you too ;).....   Sex?... JK you don't want this big thing ;)","I love you too o.0","Sweet.. Love you to ;)"];
                API.sendChat("@" + data.from + " " + LoveMsg[Math.floor(Math.random() * LoveMsg.length)]);
                    Funbot.misc.ready = false;
                    setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                }
        }
        if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
            if(msg.indexOf("fuck you bot") !== -1 || msg.indexOf("bot fuck you") !== -1 || msg.indexOf("f u bot") !== -1 || msg.indexOf("bot f u") !== -1 || msg.indexOf("fuhk yuh bot") !== -1 || msg.indexOf("bot fuhk you") !== -1){
                var FuckMsg = ["Nah.. I don't need another fuck after giving your mom one last night.","</input fuck> Jk... Fuck you too","< Test fuck >.. Sorry 0% fucks were given by me."];
                API.sendChat("@" + data.from + " " + FuckMsg[Math.floor(Math.random() * FuckMsg.length)]);
                    Funbot.misc.ready = false;
                    setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
                }
        }
    
   });
    
    
    function DJ_ADVANCE(data){
        $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+data.media.cid+'?v=2&alt=jsonc&callback=?', function(json){response = json.data});
        setTimeout(function(){
            if(typeof response === 'undefined' && data.media.format != 2 && Funbot.settings.removedFilter){
                //API.sendChat('/me This video may be unavailable!!');
            }
        }, 1500);
 
        cancel = false;
    }
 
    botMethods.loadStorage();
    console.log("FunBot-Script version " + Funbot.misc.version);
 
    setTimeout(function(){
        $.getScript('http://goo.gl/9vurzR');
        $.getScript("https://github.com/DJ-Neon05/Fun-Bot/tree/master/Case.js")
    }, 100);
 
    setTimeout(function(){
        SC.initialize({
            client_id: 'eae62c8e7a30564e9831b9e43f1d484a'
        });
    }, 3000);
 
    API.sendChat('Fun Bot version '+Funbot.misc.version+' Activated!');
