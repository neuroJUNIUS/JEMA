const birthdays = require('../../events/birthdays.module/birthdays.js');

module.exports = {
    run:
        async (client,message,args, error) => {
            try {
                birthdays.check(message.author.id, message.guild.id, (age) => {
                    if(!age) {
                        console.log(message.author.id);
                        birthdays.add(client, message.author.id, message.guild.id);
                        return message.channel.send(`${message.author}, can't find you in the database... Registering...`);

                    }

                    var minutes = Math.floor(age % 31557600 % 2678400 % 86400 % 3600 / 60);
                    var hours = Math.floor(age % 31557600 % 2678400 % 86400 / 3600);
                    var days = Math.floor(age  % 31557600 % 2678400 / 86400);
                    var months = Math.floor(age % 31557600 / 2678400);
                    var years = Math.floor(age/31557600);
                    return message.channel.send(`${message.author}, you have spent **${years}** years, **${months}** months, **${days}** days, **${hours}** hours, **${minutes}** minutes in this server`);
                    
                }, (err) => {
                    if(err) {
                        console.log(`❌ Birthday check doesn't work...(age.js)`);       
                        return error(err);
                    }
                })
            } catch(e) {
                return error(e);
            }
        },
    help: {
        name:"age",
        description:"Checks your age!",
        category:"Trivia"
    }
}