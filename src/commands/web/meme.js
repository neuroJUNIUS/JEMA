const {MessageAttachment} = require("discord.js");
const axios = require('axios').default;
const { MessageEmbed } = require("discord.js");

module.exports = {
	run:
		async (client, message, args, error) => {
			try {
				axios
				.get("https://meme-api.herokuapp.com/gimme")
				.then((resp) => {
                    const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(resp.data.title)
                    //.setURL(resp.data.url)
                    .setImage(resp.data.url);
                    return message.channel.send({ embeds: [embed] });
                    })
			} catch(e) {
                  return error(e);
              }
	},
	help: {
		name: "meme",
		description: "Sends a random meme",
        category: "Web"
    }
}