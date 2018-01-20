const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "ToKen";

var pile = [
":hearts: 1",
":hearts: 2",
":hearts: 3",
":hearts: 4",
":hearts: 5",
":hearts: 6",
":hearts: 7",
":hearts: 8",
":hearts: 9",
":hearts: 10",
":hearts: Jack",
":hearts: Queen",
":hearts: King",
":diamonds: 1",
":diamonds: 2",
":diamonds: 3",
":diamonds: 4",
":diamonds: 5",
":diamonds: 6",
":diamonds: 7",
":diamonds: 8",
":diamonds: 9",
":diamonds: 10",
":diamonds: Jack",
":diamonds: Queen",
":diamonds: King",
":spades: 1",
":spades: 2",
":spades: 3",
":spades: 4",
":spades: 5",
":spades: 6",
":spades: 7",
":spades: 8",
":spades: 9",
":spades: 10",
":spades: Jack",
":spades: Queen",
":spades: King",
":clubs: 1",
":clubs: 2",
":clubs: 3",
":clubs: 4",
":clubs: 5",
":clubs: 6",
":clubs: 7",
":clubs: 8",
":clubs: 9",
":clubs: 10",
":clubs: Jack",
":clubs: Queen",
":clubs: King",
];
var gamestart = 0
;
var players = [
];
var player1 = [
];
var player2 = [
];
var player3 = [
];
var player4 = [
];
bot.on("message", message =>
{
    var txt = message.content.split(" ");

    if (txt[0].toLowerCase() == "-play")
    {
        if (players.length < 5)
        {
            if (gamestart = 0)
            {
                players.find(function(element)
                {return element == message.author.username}
                if
            }
            else
            {

            }
        }
        else
        {
            message.channel.send("There are too many players in the current game. Please wait until the game ends.")
        }
    }
});
bot.login(token);