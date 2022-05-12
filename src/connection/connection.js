const {MongoClient, MongoExpiredSessionError} = require("mongodb");

const dotenv = require('dotenv');
dotenv.config({path: '../'});

var dbname = process.env.dbname;
var dbpsw = process.env.dbpsw;

const connection_url = `mongodb+srv://${dbname}:${dbpsw}@jema.0rrrx.mongodb.net/JEMA?retryWrites=true&w=majority`;
const client = new MongoClient(connection_url);
const Levels = require('discord-xp')
Levels.setURL(connection_url)

module.exports = {
    remove:
        async(database, collection, query, error ) => {
            try {
                client.connect( (e) => {
                    if(e) {
                        return error(e);
                    }
                    const db = client.db(database);
                    db.collection(collection).remove(query), (err, obj) => {
                        if(err) {
                            return error(err);
                        }
                    }
                })
            } catch (e) {
                return error(e);
            }
        },
    insert:
        async (database, collection, value, error) => {
            try {
                client.connect((e) => {
                    const db = client.db(database);
                    db.collection(collection).insertOne(value);
                    if(e) {
                        return error(e);
                    }
                })

            } catch(e) {
                return error(e);
            }

        },
    check:
       async (database, collection, check, callback, error) => {
           try {
            client.connect((e) => {
                const db = client.db(database);
                db.collection(collection).find(
                    check,
                    {$exists: true}
                ).toArray((err, item) => {
                    if(item) {
                        return callback(true);
                    } else {
                        return callback(false);
                    }
                });
                if(e) {
                    return error(e);
                }
            })

           } catch (e) {
               return error(e);
           }

        },
    get:

        async (database, collection, criteria, callback, error) => {
            try {
                client.connect((e) => {
                    const db = client.db(database);
                    db.collection(collection).find(criteria).toArray((err, item) => {
                        callback(item);
                        if(err) {
                            return error(e);
                        }
                    })
                    if(e) {
                        return error(e);
                    }
                })           
             } catch(e) {
                return error(e);
            }

        },
    increment:
        async (database, collection, criteria, value, callback, error) => {
            try {
                client.connect((e) => {
                    const db = client.db(database);
                    var newVal = { $set: value };
                    db.collection(collection).updateOne(criteria, newVal, (err, result) => {
                        if(err) {
                            return error(err);
                        }
                    });
                    if(e) {
                        return error(err);
                    }
                });
            } catch(e) {
                if(e) {
                    return error(e);
                }
            }
            
        }
        
        },
    addXP:
        async(database, collection, message) => {
            client.connect((error) => {
                const db = client.db(database);
                Levels.appendXp(message.author.id, message.guild.id, 30)
                    .then(leveledUp => {
                        if(leveledUp) {
                            Levels.fetch(message.author.id, message.guild.id)
                                .then(user => {
                                    message.channel.send(`${message.author}, congratulations! You have leveled up to level **${user.level}**! :tada:`)
                                })
                        }
                    })
            })
        },
    Levels
}

