/**
 * sf1
 *
 * User: sean
 * Date: 05/05/13
 * Time: 11:53 PM
 *
 */
var config = {
    app: {
        friendlyName: 'Graffiti Engine',
        name:'graffitiengine'
    },
    db: {
        db: 'graffitiengine',
        host: 'localhost',
        port: 27017,  // optional, default: 27017
        collection: 'sessions', // optional, default: sessions
        options:{
            db: {
                safe: true
            }
        }
    },
    salt: '076ee69e63aa1ea999ea872411e433bc',
    cookieSecretString: 'a key string',
    localPort: 3009
};
module.exports = config;
