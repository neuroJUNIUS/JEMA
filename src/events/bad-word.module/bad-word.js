
module.exports = {
    insert:
        async (swears, error) => {

        },
    check:
        async (client, message, error) => {
            try {
                const illegal_words = ["fuck", "pavyzdys", "blogaszodis", "whore", "shit", "arse", "ass", "bitch", "bastard", "bollocks", "bullshit", "cock", "crap", "cunt", "nigga", "nigger", "piss", "prick", "slut", "twat", "faggot"];
                let messageText = message.content;
                let text=messageText.toLowerCase();

                for (let i = 0; i < illegal_words.length; i++) {

                    if(text.indexOf(illegal_words[i]) > -1) {
                        message.channel.bulkDelete(1);
                        text="good";
                        break;
                    }
                }  
            } catch(e) {
                return error(e);
            }

        }
}