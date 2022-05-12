const connection = require('../connection/connection.js');
const birthdays = require('../events/birthdays.module/birthdays.js');

module.exports = 
    async (client, message) => 
    {
        try {
            client.user.setActivity("jema help");
            console.log("Bot is running now...");
            connection.get("jema_users", "birthdays", {} , (result) => {
                var i = 0;
                setInterval( () => {
                    if(i == result.length) {
                        i = 0;
                    }

                    birthdays.check(result[i].user_id, result[i].user_server, (age) => {
                        if(age) {
                            const guild = client.guilds.cache.get(result[i].user_server);
                            const channel = guild.channels.cache.filter(c => c.type == "GUILD_TEXT").find(x => x.position === 0);
                            var prevTime = age - (i*5);
                            var currTime = age;
                            var prevYear = Math.floor(prevTime/2678400);
                            var currYear = Math.floor(currTime/2678400);

                            if(currYear - prevYear > 0) {
                                switch(currYear % 10)
                                {
                                    case 1: {
                                        channel.send(`Congratulations, <@${result[i].user_id}> it's your **${currYear}**st year in this server`);
                                    }
                                    case 2: {
                                        channel.send(`Congratulations, <@${result[i].user_id}> it's your **${currYear}**nd year in this server`);
                                    }
                                    case 3: {
                                        channel.send(`Congratulations, <@${result[i].user_id}> it's your **${currYear}**rd year in this server`);
                                    }
                                    default: {
                                        channel.send(`Congratulations, <@${result[i].user_id}> it's your **${currYear}**th year in this server`);
                                    }
                                }

                            }
                            i++;
                        }
                    }, (error) => {
                        if(error) {
                            console.log(`❌ Birthday check doesn't work...`);       
                        }
                    });
                }, 5000);
            }, (e) => {
                if(e) {
                    console.log(`❌ Birthday check doesn't work...`);                           
                }
            });

        } catch(e) {
            console.log(`🤦 Bot failed in ready event...`);
            process.abort();
        }
}