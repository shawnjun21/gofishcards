const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "NDA0NDg3NTc5NDkzMzM1MDQx.DUWnLQ.lIYDX1zZknizZoWioF8qOByMXmo";

//All the cards in the deck where suit: 0 is clubs, 1 is diamonds, 2 is spades, 3 is hearts. 
//value: 0 is Ace, 10 is Jack, 11 is Queen, 12 is King
//owner: 0 means the card is still in the deck, otherwise it will contain a discord ID
var all_cards = [
{suit:0, value:0, owner:0},
{suit:0, value:1, owner:0},
{suit:0, value:2, owner:0},
{suit:0, value:3, owner:0},
{suit:0, value:4, owner:0},
{suit:0, value:5, owner:0},
{suit:0, value:6, owner:0},
{suit:0, value:7, owner:0},
{suit:0, value:8, owner:0},
{suit:0, value:9, owner:0},
{suit:0, value:10, owner:0},
{suit:0, value:11, owner:0},
{suit:0, value:12, owner:0},
{suit:1, value:0, owner:0},
{suit:1, value:1, owner:0},
{suit:1, value:2, owner:0},
{suit:1, value:3, owner:0},
{suit:1, value:4, owner:0},
{suit:1, value:5, owner:0},
{suit:1, value:6, owner:0},
{suit:1, value:7, owner:0},
{suit:1, value:8, owner:0},
{suit:1, value:9, owner:0},
{suit:1, value:10, owner:0},
{suit:1, value:11, owner:0},
{suit:1, value:12, owner:0},
{suit:2, value:0, owner:0},
{suit:2, value:1, owner:0},
{suit:2, value:2, owner:0},
{suit:2, value:3, owner:0},
{suit:2, value:4, owner:0},
{suit:2, value:5, owner:0},
{suit:2, value:6, owner:0},
{suit:2, value:7, owner:0},
{suit:2, value:8, owner:0},
{suit:2, value:9, owner:0},
{suit:2, value:10, owner:0},
{suit:2, value:11, owner:0},
{suit:2, value:12, owner:0},
{suit:3, value:0, owner:0},
{suit:3, value:1, owner:0},
{suit:3, value:2, owner:0},
{suit:3, value:3, owner:0},
{suit:3, value:4, owner:0},
{suit:3, value:5, owner:0},
{suit:3, value:6, owner:0},
{suit:3, value:7, owner:0},
{suit:3, value:8, owner:0},
{suit:3, value:9, owner:0},
{suit:3, value:10, owner:0},
{suit:3, value:11, owner:0},
{suit:3, value:12, owner:0},
];
//0 = game did not start, 1 = game started
var gamestart = 0
;
//number of players in the beginning
var players = 0
;
//Usernames of players
var ids = [
];
var test = 0
;
//does stuff
var counter = 0
;
//pickedcard
var pickedcard = 0
;
bot.on("message", message =>
{
    var txt = message.content.split(" ");
    if (txt[0].toLowerCase() == "-play")
    {   //# of players detection
        if (players < 4)
        {   //game status detection
            if (gamestart == 0)
            {   //remember that username only return the name, the last four digits #abcd
                var detectid = ids.indexOf(message.author.username)
                if (detectid == -1)
                {
                    message.channel.send("Sucessfully joined the game!")
                    //for some odd reason, without this wait code, everything happens simultaneously and does not work. :P 
                    ids.push("" + message.author.username + "")
                    message.channel.send("Players:")
                    for(a = 0; a < ids.length; a++)
                    {
                        message.channel.send("" + ids[a] + "")
                    }
                    setTimeout(wait, 1000)
                    function wait() {
                        players += 1
                    }
                    //Will not do anything until players join and someone says -start
                    bot.on("message", message =>
                    {
                        var txt = message.content.split(" ");
                        if (txt[0].toLowerCase() == "-start" && players > 1)
                        {
                            message.channel.send("Starting the game with " + players + " players...")
                            //This part will repeat the product of # of players and 5 times.
                            for(p = 0; p < players; p++)
                            {
                                for(i = 0; i < 5; i++)
                                {
                                    function guarantee(){
                                    pickedcard = Math.floor(Math.random() * 52)
                                    message.channel.send(pickedcard)
                                    if(all_cards[pickedcard].owner == 0)
                                    {
                                        message.channel.send("done!")
                                        all_cards[pickedcard].owner = ids[p]
                                        message.channel.send(all_cards[pickedcard].owner)
                                    }
                                    else if(all_cards[pickedcard].owner !== 0)
                                    {
                                        message.channel.send("repeating")
                                        guarantee();
                                    } 
                                }
                                guarantee();
                                }
                            }
                            //message.channel.send(test)
                        }
                        else
                        {
                            
                        }
                    });
                }
                else
                {
                    message.channel.send("You're already in the game!")
                }
            }
            else
            {
                message.channel.send("The game has already started.")
            }
        }
        else
        {
            message.channel.send("There are too many players in the current game. Please wait until the game ends.")
        }
    }
});
bot.login(token);

//message.channel.send("You can't play by yourself. Ask a friend to play by using \"-play.\"")