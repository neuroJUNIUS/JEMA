const {MongoClient} = require("mongodb");

const dotenv = require('dotenv');
dotenv.config({path: '../'});

var dbname = process.env.dbname;
var dbpsw = process.env.dbpsw;

const connection_url = `mongodb+srv://${dbname}:${dbpsw}@jema.0rrrx.mongodb.net/JEMA?retryWrites=true&w=majority`;
const client = new MongoClient(connection_url);
const Levels = require('discord-xp')
Levels.setURL(connection_url)

module.exports = {
    insert:
        async (database, collection, value) => {
            client.connect((error) => {
                const db = client.db(database);
                db.collection(collection).insertOne(value);
            });
        },
    check:
       async (database, collection, check, callback) => {
            client.connect((error) => {
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
            })
        },
    get:
        async (database, collection, criteria, callback) => {
            client.connect((error) => {
                const db = client.db(database);
                db.collection(collection).find(criteria).toArray((err, item) => {
                    callback(item);
                })
            })
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

