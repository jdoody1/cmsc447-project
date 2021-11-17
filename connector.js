const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'countycovid_db'
}); 

connection.connect(function(err) {
    if (err) throw err;
    console.log("You have successfully connected to your SQL server!");
});

class Connector {
    static getConnectorInstance() {
        return instance ? instance : new Connector();
    }

    async getData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM counties";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Connector;