module.exports = async(client, message) =>
 {
    const [cmd, ...args] = message.content
    .trim()
    .substring(5)
    .split(/\s+/);

    let cmdfile = client.commands.get(cmd);
     if(message.author.bot) return;

     if(!message.content.startsWith("jema"))
     {
        let channel = message.channel; 
        channel.messages.fetch({limit: 5 }).then(messages => {
        let notsame = 1;
        let arr = [];
        for(let [key, value] of messages)
            {
                arr.push(value);
            }
        
        for(let i = 1; i < 5; i++)
        {
            if(arr[i-1].content != arr[i].content || arr[i-1].author != arr[i].author)
            {
                notsame = 0;
            }
            }
        if(notsame == 1)
        {


            let member = message.member;
            if(member.kickable)
                member.timeout(5000);
            message.channel.bulkDelete(5).then(() => {
                message.channel.send("No spam " + message.author.username)});
            
            
        }
        
        })
        return;
     }
     else
     {
         if(cmdfile)
         {
             cmdfile.run(client, message, args);    
         }
     }
 }