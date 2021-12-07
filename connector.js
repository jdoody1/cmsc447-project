const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'CovidDB'
}); 

connection.connect(function(err) {
    if (err) throw err;
    console.log("You have successfully connected to your SQL server!");
});

class Connector {
    static getConnectorInstance() {
        return instance ? instance : new Connector();
    }

    async getData(stateInit) {
        try {
            return await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = '" + stateInit + "'";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Connector;
