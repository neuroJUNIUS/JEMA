
module.exports = {
    insert:
        async (swears, error) => {

        },
    check:
        async (client, message, error) => {
            try {
                const illegal_words = ["pavyzdys", "blogaszodis"];
                let text = message.content;
                const splitMessage = text.split(/[ &()_+-={};':",.<>?@\r?\n]/);

                for (let i = 0; i < illegal_words.length; i++) {

                    if(splitMessage.includes(illegal_words[i])) {
                        message.channel.bulkDelete(1);
                    }
                }  
            } catch(e) {
                return error(e);
            }

        }
}