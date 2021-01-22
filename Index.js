const TTT = require("./tictactoe")
const Discord = require("discord.js");
const { Console } = require("console");
const client = new Discord.Client();
const prefix = "--"

var tictactoeplayer1 = ""
var tictactoeplayer2 = ""

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith(prefix)) {
    var content = msg.content.split(" ")
    switch (content[0].substring(2)) {
      case 'profile':
        var member = msg.guild.member(msg.mentions.users.first())
        if (member != null) {
          msg.channel.send(require("./ProfileCommands.js").ProfileCheck(member))
        }
        break
      case 'commands':
        require("fs").readFile("commands.txt", 'utf8', function (err, data) {
          if (err) throw err;
          msg.channel.send(data)
        })
        break
      case 'tictactoe':
        msg.channel.send("Waiting for another player...").then(waitmessage => {
          msg.channel.awaitMessages(m => m.content == '--tictactoejoin' && m.author != msg.author, { max: 1, time: 30000, errors: ["time"] }).then(m2 => {
            var gameEmojies = ["↙️", "⬇️", "↘️", "⬅️", "🔯", "➡️", "↖️", "⬆️", "↗️"]
            var gameMoves = {"↖️":[0,0],"⬆️":[0,1],"↗️":[0,2],"⬅️":[1,0],"🔯":[1,1],"➡️":[1,2],"↙️":[2,0],"⬇️":[2,1],"↘️":[2,2]}
            let player1 = msg.author.tag
            let player2 = m2.first().author.tag
            let NextPlayer = [player1, player2]
            let winner = null
            const tttgame = new TTT.TicTacToe(player1, player2)
            const filter = (reaction, user) => {
              return gameEmojies.includes(reaction.emoji.name) && user.tag === NextPlayer[0];
            };
            waitmessage.delete()
            msg.channel.send(`Player 1: ${player1} - playing as ${tttgame.Player1[1]}\nPlayer 2: ${player2} - playing as ${tttgame.Player2[1]}`)
            msg.channel.send(`⬜⬜⬜\n⬜⬜⬜\n⬜⬜⬜\nIt's ${NextPlayer[0]}'s turn.`).then(async gamemessage => {
              while (winner == null){
                await gameEmojies.forEach(emoji=>{gamemessage.react(emoji)})
                await gamemessage.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] }).then(reactions => {
                  tttgame.Move(gameMoves[reactions.first().emoji.name][0], gameMoves[reactions.first().emoji.name][1], NextPlayer[0])
                  gameEmojies.splice(gameEmojies.indexOf(reactions.first().emoji.name),1)
                  gamemessage.reactions.removeAll()
                  gamemessage.edit(`${tttgame.Table[0].join(" ")}\n${tttgame.Table[1].join(" ")}\n${tttgame.Table[2].join(" ")}`)
                  NextPlayer = [NextPlayer[1], NextPlayer[0]]
                  winner = tttgame.CheckForWinner()
                }).catch(err=>{
                  gamemessage.delete()
                  msg.channel.send("Game has been cancelled due to inactivity on one end.")
                  winner = "error"
                })
              }if (winner != "Tie") {
                msg.channel.send(`${winner} is the Winner of this game of Tic Tac Toe!`)
              } else if (winner == "Tie") {
                msg.channel.send("The game has ended with a result of a Tie! Better luck next time!")
              }
            })
          }).catch(err => {
            console.log(err)
            waitmessage.delete()
            msg.channel.send(`<@${msg.author.id}>\nNoone has accepted your match for Tic Tac Toe.`)
          })
        })
        break
    }
  }
});

client.login(require("./BotInfo.json").bot_token);