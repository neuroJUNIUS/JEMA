
module.exports = async(client, message) =>
 {
    const [cmd, ...args] = message.content
    .trim()
    .substring(5)
    .split(/\s+/);

    let cmdfile = client.commands.get(cmd);

     if(!message.content.startsWith("jema"))
     {
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