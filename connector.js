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

    async getData_MD() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData_MD";
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

    async getData_MA() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData_MA";
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
