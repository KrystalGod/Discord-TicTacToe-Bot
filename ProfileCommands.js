const Discord = require("discord.js")

module.exports.ProfileCheck = function (member) {
    var emmbed = new Discord.MessageEmbed()
    emmbed.setTitle(`An overview of ${member.user.tag}'s profile`)
        .setColor("#04D9FF")
        .setImage(member.user.avatarURL())
        .addField("User Tag", member.user.tag)
        .addField("User ID", member.user.id)
        .addField("Account Creation Date", member.user.createdAt)
        .addField("Server Join Date", member.joinedAt)
        .setTimestamp()
    return emmbed
}