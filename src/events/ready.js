
module.exports = 
    async (client, message) => 
    {
        try {
            client.user.setActivity("jema help");
            console.log("Bot is running now...");
        } catch(e) {
            console.log(`🤦 Bot failed in ready event...`);
            process.abort();
        }
}