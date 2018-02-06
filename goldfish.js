const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "NDA0NDg3NTc5NDkzMzM1MDQx.DVmK_Q.Ww2LpaKjbe6VKw_JljFJXO163Ag";

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
var pickedcard2 = 0
;
var dmmessage = ""
;
var dmmessage2 = 0
;
var turn = 0
;
//just realized that I didn't need this type of array :P
var cards = [
    {cards:5},
    {cards:5},
    {cards:5},
    {cards:5},
];
var collected = [
    0,
    0,
    0,
    0,
]
var highestcollected = 0
;
var posessionofcard = 0
;
var posessionofcard2 = 0
;
var yay = 0
;
var gameisover = 0
;
var winmessage = ""
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
                    message.author.send("Welcome to Go Fish!")
                    //for some odd reason, without this wait code, everything happens simultaneously and does not work. :P 
                    ids.push(message.author.username)
                    message.channel.send("Players:")
                    for(a = 0; a < ids.length; a++)
                    {
                        message.channel.send(ids[a])
                    }
                    setTimeout(wait, 1000)
                    function wait() {
                        players += 1
                    }
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
    var txt = message.content.split(" ");
    if (txt[0].toLowerCase() == "-start" && players > 1 && gamestart == 0)
                        {
                            message.channel.send("Starting the game with " + players + " players...")
                            gamestart += 1
                            //This part will repeat the product of # of players and 5 times.
                            for(p = 0; p < players; p++)
                            {
                                for(i = 0; i < 5; i++)
                                {
                                    function guarantee(){
                                    pickedcard = Math.floor(Math.random() * 52)
                                    if(all_cards[pickedcard].owner == 0)
                                    {
                                        all_cards[pickedcard].owner = ids[p]
                                    }
                                    else if(all_cards[pickedcard].owner != 0)
                                    {
                                        guarantee();
                                    } 
                                }
                                guarantee();
                                }
                            }
                            message.channel.send("Done dealing cards! Get your decks via DM anytime during the game by using -get!\nWhen it is your turn, use this command to ask another player for their cards: -ask <player #> <value of cards>\nHere are the player #s:")
                            for(x = 0; x < players; x++)
                            {
                                message.channel.send("" + ids[x] + " is " + x + ".").then(function(message)
                                {
                                    message.pin()
                                });
                            }
                            message.channel.send("It is now " + ids[turn] + "'s turn.")
                            turns(message);
                        }
                    });

bot.on("message", message =>
{
var txt = message.content.split(" ");
if (txt[0].toLowerCase() == "-get" && gamestart == 1)
{
        dmmessage = ""
        message.author.send("Here is your current deck:")
        for(b = 0; b < 52; b++)
        {
            if(all_cards[b].owner == message.author.username)
            {
                if(all_cards[b].suit == 0)
                {
                    dmmessage += ":clubs:"
                }
                if(all_cards[b].suit == 1)
                {
                    dmmessage += ":diamonds:"
                }
                if(all_cards[b].suit == 2)
                {
                    dmmessage += ":spades:"
                }
                if(all_cards[b].suit == 3)
                {
                    dmmessage += ":hearts:"
                }
                if(all_cards[b].value == 0)
                {
                    dmmessage += " Ace\n"
                }
                if(all_cards[b].value == 1)
                {
                    dmmessage += " 2\n"
                }
                if(all_cards[b].value == 2)
                {
                    dmmessage += " 3\n"
                }
                if(all_cards[b].value == 3)
                {
                    dmmessage += " 4\n"
                }
                if(all_cards[b].value == 4)
                {
                    dmmessage += " 5\n"
                }
                if(all_cards[b].value == 5)
                {
                    dmmessage += " 6\n"
                }
                if(all_cards[b].value == 6)
                {
                    dmmessage += " 7\n"
                }
                if(all_cards[b].value == 7)
                {
                    dmmessage += " 8\n"
                }
                if(all_cards[b].value == 8)
                {
                    dmmessage += " 9\n"
                }
                if(all_cards[b].value == 9)
                {
                    dmmessage += " 10\n"
                }
                if(all_cards[b].value == 10)
                {
                    dmmessage += " Jack\n"
                }
                if(all_cards[b].value == 11)
                {
                    dmmessage += " Queen\n"
                }
                if(all_cards[b].value == 12)
                {
                    dmmessage += " King\n"
                }
            }
        }
        if(dmmessage.length > 2)
        {
         message.author.send(dmmessage)
         dmmessage = 0
        }
    }
})
;
function turns(message) {
    bot.on("message", message =>
    {
    posessionofcard = 0
    posessionofcard2 = 0
    var txt = message.content.split(" ");
    var txt2 = message.content.split(" ")[1];
    var txt3 = message.content.split(" ")[2];
    if(txt[0].toLowerCase() == "-ask" && ids[turn] == message.author.username)
    {
        if((txt2 < players && txt2 > -1) && ((txt3 < 11 && txt3 > 0) || txt3 == "king" || txt3 == "queen" || txt3 == "jack"))
        {
            if(txt2 != turn)
            {
            if(txt3 == "king" || txt3 == "queen" || txt3 == "jack")
            {
                if(txt3 == "king")
                {
                    txt3 = 12
                }
                if(txt3 == "queen")
                {
                    txt3 = 11
                }
                if(txt3 == "jack")
                {
                    txt3 = 10
                }
            }
            else
            {
                txt3 -= 1
            }
                for(h = txt3; h < 52; h += 13)
                {
                    if(all_cards[h].owner == ids[turn])
                        {
                            posessionofcard += 1
                        }
                }
            if(posessionofcard > 0)
            {
                for(k = txt3; k < 52; k += 13)
                {
                    if(all_cards[k].owner == ids[txt2])
                    {
                        posessionofcard2 += 1
                        all_cards[k].owner = ids[turn]
                    }
                }
                    if(posessionofcard2 > 0)
                    {
                        message.channel.send("You have received " + posessionofcard2 + " cards from " + ids[txt2] + "! Do -get to see them.\nYou also get to go again!")
                        cards[turn].cards += posessionofcard2
                        cards[txt2].cards -= posessionofcard2
                        turns(message);
                    }
                    else
                    {
                        for(v = 0; v < 52; v++)
                        {
                            if(all_cards[v].owner != 0)
                            {
                                gameisover += 1
                            }
                        }

                    if(gameisover != 52)
                    {
                        message.channel.send("Go fish! You picked up a card.")
                        function guarantee2(){
                            pickedcard2 = Math.floor(Math.random() * 52)
                            if(all_cards[pickedcard2].owner == 0)
                            {
                                all_cards[pickedcard2].owner = ids[turn]
                            }
                            else if(all_cards[pickedcard2].owner != 0)
                            {
                                guarantee2();
                            } 
                        }
                        guarantee2();
                        message.author.send("You received:")
                        if(all_cards[pickedcard2].suit == 0)
                        {
                            dmmessage2 = ":clubs:"
                        }
                        if(all_cards[pickedcard2].suit == 1)
                        {
                            dmmessage2 = ":diamonds:"
                        }
                        if(all_cards[pickedcard2].suit == 2)
                        {
                            dmmessage2 = ":spades:"
                        }
                        if(all_cards[pickedcard2].suit == 3)
                        {
                            dmmessage2 = ":hearts:"
                        }
                        if(all_cards[pickedcard2].value == 0)
                        {
                            dmmessage2 += " Ace"
                        }
                        if(all_cards[pickedcard2].value == 1)
                        {
                            dmmessage2 += " 2"
                        }
                        if(all_cards[pickedcard2].value == 2)
                        {
                            dmmessage2 += " 3"
                        }
                        if(all_cards[pickedcard2].value == 3)
                        {
                            dmmessage2 += " 4"
                        }
                        if(all_cards[pickedcard2].value == 4)
                        {
                            dmmessage2 += " 5"
                        }
                        if(all_cards[pickedcard2].value == 5)
                        {
                            dmmessage2 += " 6"
                        }
                        if(all_cards[pickedcard2].value == 6)
                        {
                            dmmessage2 += " 7"
                        }
                        if(all_cards[pickedcard2].value == 7)
                        {
                            dmmessage2 += " 8"
                        }
                        if(all_cards[pickedcard2].value == 8)
                        {
                            dmmessage2 += " 9"
                        }
                        if(all_cards[pickedcard2].value == 9)
                        {
                            dmmessage2 += " 10"
                        }
                        if(all_cards[pickedcard2].value == 10)
                        {
                            dmmessage2 += " Jack"
                        }
                        if(all_cards[pickedcard2].value == 11)
                        {
                            dmmessage2 += " Queen"
                        }
                        if(all_cards[pickedcard2].value == 12)
                        {
                            dmmessage2 += " King"
                        }
                        if(dmmessage2.length > 2)
                        {
                            message.author.send(dmmessage2)
                            dmmessage2 = 0
                        }
                        cards[turn].cards += 1
                    }
                    else if(gameisover == 52)
                    {                    
                        highestcollected = Math.max(collected)
                        message.channel.send(highestcollected)
                        for(s = 0; s < players; s++)
                        {
                            if(s = 0 && highestcollected == collected[s])
                            {
                                winmessage = "" + ids[s] + ""
                            }
                            if(s > 0 && highestcollected == collected[s])
                            {
                                winmessage = " and " + ids[s] + ""
                            }
                        }
                        winmessage += " won the game!\nDo -reset to reset the bot."
                        message.channel.send(winmessage)
                    }
                    turn += 1
                    if(turn == players)
                    {
                        turn = 0
                    }
                    message.channel.send("It is now " + ids[turn] + "'s turn.")
                    turns(message);
                }
            }
            else
            {
                message.channel.send("You don't have any card of that value!")
            }
        }
        else
        {
            message.channel.send("You can't ask yourself for a card!")
        }
    }
    else
    {
        message.channel.send("Please write the -ask in this way: -ask <player #> <card value>. For example: -ask 1 king")
    }
    }
})
}
;
bot.on("message", message =>
{
var txt = message.content.split(" ");
if (txt[0].toLowerCase() == "-check")
{
    for(d = 0; d < players; d++)
    {
        if(message.author.username == ids[d])
        {
            counter = d
        }
    }
    for(p = 0; p < 13; p++)
    {
        if(all_cards[p].owner == message.author.username && all_cards[p + 13].owner == message.author.username && all_cards[p + 26].owner == message.author.username && all_cards[p + 39].owner == message.author.username)
        {
            if(all_cards[p].value == 0)
            {
                yay = "Ace"
            }
            if(all_cards[p].value == 1)
            {
                yay = "2"
            }
            if(all_cards[p].value == 2)
            {
                yay = "3"
            }
            if(all_cards[p].value == 3)
            {
                yay = "4"
            }
            if(all_cards[p].value == 4)
            {
                yay = "5"
            }
            if(all_cards[p].value == 5)
            {
                yay = "6"
            }
            if(all_cards[p].value == 6)
            {
                yay = "7"
            }
            if(all_cards[p].value == 7)
            {
                yay = "8"
            }
            if(all_cards[p].value == 8)
            {
                yay = "9"
            }
            if(all_cards[p].value == 9)
            {
                yay = "10"
            }
            if(all_cards[p].value == 10)
            {
                yay = "Jack"
            }
            if(all_cards[p].value == 11)
            {
                yay = "Queen"
            }
            if(all_cards[p].value == 12)
            {
                yay = "King"
            }
            message.channel.send("" + message.author.username + " collected all the " + yay + " cards!")
            collected[counter] += 1
            cards[counter].cards -= 4
            all_cards[p].owner = counter + 4
            all_cards[p + 13].owner = counter + 4
            all_cards[p + 26].owner = counter + 4
            all_cards[p + 39].owner = counter + 4
        }
    }
}
})
;
bot.login(token);
//message.channel.send("You can't play by yourself. Ask a friend to play by using \"-play.\"")