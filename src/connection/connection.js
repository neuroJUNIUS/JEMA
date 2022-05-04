const {MongoClient} = require("mongodb");

const dotenv = require('dotenv');
dotenv.config({path: '../'});

var dbname = process.env.dbname;
var dbpsw = process.env.dbpsw;

const connection_url = `mongodb+srv://${dbname}:${dbpsw}@jema.0rrrx.mongodb.net/JEMA?retryWrites=true&w=majority`;
const client = new MongoClient(connection_url);

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
        }
}

