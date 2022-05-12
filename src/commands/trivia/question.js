const questions = require('./questions.json');
const {MessageEmbed} = require('discord.js');
const xp_system = require(`../../events/xp-system.module/xp-system.js`);
module.exports = {
    run:
        async (client,message,args, error) => {
            try {
                let random = Math.floor(Math.random() * questions.length);
                let question = new MessageEmbed()
                    .setTitle(`:question: ${questions[random].question}`)
                    .setDescription(`
                    🇦 ${questions[random].ans_a} \n
                    🇧 ${questions[random].ans_b} \n
                    :regional_indicator_c: ${questions[random].ans_c} \n
                    :regional_indicator_d: ${questions[random].ans_d}`)
                    .setTimestamp()
                    .setThumbnail('https://i.pinimg.com/originals/87/d7/20/87d720410cb06b028de5e3b250bfe391.gif')
                    .setFooter(`${message.author.username}, you only have 15 seconds to answer this question`);

                let question_msg = await message.channel.send({embeds: [question]});
                await question_msg.react("🇦");
                await question_msg.react("🇧");
                await question_msg.react("🇨");
                await question_msg.react("🇩");
                const filter = (reaction, user) => { return ['🇦', '🇧', '🇨','🇩'].includes(reaction.emoji.name) && user.id === message.author.id; };

                question_msg.awaitReactions({filter, max:1, time:15000, errors:['time']}).then( collected => {
                    const reaction = collected.first();

                    if(reaction.emoji.name == questions[random].correct) {
                        question_msg.delete(5000);
                        switch(questions[random].level) {
                            case 0: {
                                xp_system.addXp(client,message,9, (e) => {
                                    if(e) {
                                        console.log(`❌There was an error with xp system! (question.js)`);
                                        return error(e);                                       
                                    }
                                });
                            }
                            case 1: {
                                xp_system.addXp(client,message,15,(e) => {
                                    if(e) {
                                        console.log(`❌There was an error with xp system! (question.js)`);
                                        return error(e);                                       
                                    }
                                });
                            }
                            case 2: {
                                xp_system.addXp(client,message,20,(e) => {
                                    if(e) {
                                        console.log(`❌There was an error with xp system! (question.js)`);
                                        return error(e);                                       
                                    }
                                });
                            }
                        }
                        return message.channel.send(`:earth_africa: Congratulations, ${message.author}, your answer was correct!`);
                    } else {
                        switch(questions[random].level) {
                            case 0: {
                                xp_system.addXp(client,message,-9,(e) => {
                                    if(e) {
                                        console.log(`❌There was an error with xp system! (question.js)`);
                                        return error(e);                                       
                                    }
                                });
                            }
                            case 1: {
                                xp_system.addXp(client,message,-15,(e) => {
                                    if(e) {
                                        console.log(`❌There was an error with xp system! (question.js)`);
                                        return error(e);                                       
                                    }
                                });
                            }
                            case 2: {
                                xp_system.addXp(client,message,-20,(e) => {
                                    if(e) {
                                        console.log(`❌There was an error with xp system! (question.js)`);
                                        return error(e);                                       
                                    }
                                });
                            }
                        }
                        question_msg.delete(5000);
                        return message.channel.send(`:disappointed_relieved::gun: Bad luck, ${message.author}, your answer was wrong...`);
                    }
                }).catch(() => {
                    switch(questions[random].level) {
                        case 0: {
                            xp_system.addXp(client,message,-9,(e) => {
                                if(e) {
                                    console.log(`❌There was an error with xp system! (question.js)`);
                                    return error(e);                                       
                                }
                            });
                        }
                        case 1: {
                            xp_system.addXp(client,message,-15,(e) => {
                                if(e) {
                                    console.log(`❌There was an error with xp system! (question.js)`);
                                    return error(e);                                       
                                }
                            });
                        }
                        case 2: {
                            xp_system.addXp(client,message,-20,(e) => {
                                if(e) {
                                    console.log(`❌There was an error with xp system! (question.js)`);
                                    return error(e);                                       
                                }
                            });
                        }
                    }
                    question_msg.delete(5000);
                    return message.channel.send(`:woman_facepalming: ${message.author}, you did not answer in time!`);
                });
            } catch(e) {
                return error(e);
            }
        },
    help: {
        name:"question",
        description:"Asks you a question!",
        category:"Trivia"
    }
}