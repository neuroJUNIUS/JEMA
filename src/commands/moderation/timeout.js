module.exports = {
	run:
		async (client, message, args) => {
			if (message.member.permissions.has('BAN_MEMBERS'))
			{
				let text = message.content;
				const array = text.split(" ");
				let time = array[3] * 60 * 1000;
				let member = message.mentions.members.first();
				if(!member) return message.reply("Please mention a valid member of this server");
				if(!member.kickable) return message.reply("I cannot mute this member!");
				if(!Number.isInteger(time)) return message.reply("Enter valid time fo the mute");

				return member.timeout(time); 
			}
		},
	help:{
		name: "timeout",
		description: "timeouts member"
		}
}