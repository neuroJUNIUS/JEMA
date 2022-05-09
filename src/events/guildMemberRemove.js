const statistics = require('./statistics.module/statistics.js');
const birthdays = require('./birthdays.module/birthdays.js');

module.exports = async (client, member) => {
    try {
        var id = member.guild.id;
        try {
            birthdays.die(member.id, id, (e) => {
                if(e) {
                    console.log(`❌ Birthdays die doesn't work...`);                   
                }
            })
            statistics.decrement(member, client, id, (error) => {
                if(error) {
                    console.log(`❌ Statistics decrement doesn't work...`);
                }
            })
        } catch {
            console.log(`❌ Statistics decrement doesn't work...`);
        }
    } catch(e) {
        console.log(`❌ GuildMemberAdd event doesn't work...`);
    }
   
}