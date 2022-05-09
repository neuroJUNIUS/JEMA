const birthdays = require('./birthdays.module/birthdays.js');
const statistics = require('./statistics.module/statistics.js');

module.exports = async (client, member) => {
    try {
        try {
            birthdays.add(client, member.id, member.guild.id, (error) => {
                if(error) {
                    console.log(`❌ Birthday insertion doesn't work...`);                    
                }
            });        
        } catch {
            console.log(`❌ Birthday insertion doesn't work...`);                 
        }

        var id = member.guild.id;
        try {
            statistics.increment(member, client, id, (error) => {
                if(error) {
                    console.log(`❌ Statistics increment doesn't work...`);
                }
            });
        } catch {
            console.log(`❌ Statistics increment doesn't work...`);            
        }
    } catch(e) {
        console.log(`❌ GuildMemberAdd event doesn't work...`);
    }

}