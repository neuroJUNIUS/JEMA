
const connection = require('../../connection/connection.js');

module.exports = {
    run:
        async (client,message,args, error) => {
            try {
                
            } catch(e) {
                return error(e);
            }
        },
    help: {
        name:"profile",
        description:"Shows your profile!",
        category:"Trivia"
    }
}