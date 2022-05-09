const fishes = require("./fish.json");
const Canvas = require("canvas");
const {MessageAttachment} = require("discord.js");
const xp_system = require('../../events/xp-system.module/xp-system.js');

module.exports = {
    run:
        async (client,message,args, error) => {
            try {
                xp_system.addXp(client,message,-5, (err) => {
                    if(err) {
                        console.log(`❌There was an error with xp system!(fish.js)`);
                        return error(err);
                    }
                });
            } catch(e) {
                console.log(`❌There was an error with xp system!(fish.js)`);
                return error(e);
            }
            try {
                var random = Math.floor(Math.random() * (19 - 0 + 1) + 0);
                var fish = null;
                for(var i = 0; i < fishes.length; i++) {
                    if(fishes[i].id == random.toString()) {
                        fish = fishes[i];
                    }
                }
                var weight = Math.floor(Math.random() * (fish.max_weight) - (fish.min_weight) + 1) + (fish.min_weight);

                const canvas = Canvas.createCanvas(80*weight,40*weight);
                const ctx = canvas.getContext('2d');

                const bg = await Canvas.loadImage(fish.image);
                
                ctx.drawImage(bg,0,0, canvas.width, canvas.height);
                const attachment = new MessageAttachment(canvas.toBuffer(), fish.name + ".png");
                try {
                    xp_system.addXp(client,message,parseInt(weight), (err) => {
                        if(err) {
                            console.log(`❌There was an error with xp system!(fish.js)`);
                            return error(err);
                        }

                    });
                } catch(e) {
                    console.log(`❌There was an error with xp system!(fish.js)`);
                    return error(e);
                }
                return message.channel.send({content:`You have caught **${fish.name}** that weights **${weight.toFixed(2)}** kg`, files: [attachment]});
            } catch(e) {
                return error(e);
            }
        },
    help: {
        name:"fish",
        description:"Simple fishing game",
        category:"Trivia"
    }
}