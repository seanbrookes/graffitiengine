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
        friendlyName: 'Four Five Six',
        name:'fourfivesix'
    },
    db: {
        db: 'fourfivesix',
        host: 'localhost',
        port: 27017,  // optional, default: 27017
        collection: 'sessions', // optional, default: sessions
        options:{
            db: {
                safe: true
            }
        }
    },
    salt: '076ee61d63aa1ea999ea872411e433bc',
    cookieSecretString: 'a key string',
    localPort: 3004
};
module.exports = config;
