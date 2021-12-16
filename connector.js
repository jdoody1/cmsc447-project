const mysql = require('mysql');
let instance = null;
var obj = {}, x;

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

    async getData_AL() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'AL'";
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

    async getData_AK() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'AK'";
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

    async getData_AZ() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'AZ'";
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

    async getData_AR() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'AR'";
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

    async getData_CA() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'CA'";
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

    async getData_CO() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'CO'";
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

    async getData_CT() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'CT'";
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

    async getData_DE() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'DE'";
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

    async getData_FL() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'FL'";
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

    async getData_GA() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'GA'";
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

    async getData_HI() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'HI'";
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

    async getData_ID() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'ID'";
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

    async getData_IL() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'IL'";
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

    async getData_IN() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'IN'";
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

    async getData_IA() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'IA'";
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

    async getData_KS() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'KS'";
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

    async getData_KY() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'KY'";
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

    async getData_LA() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'LA'";
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

    async getData_ME() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'ME'";
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

    async getData_MD() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'MD'";
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
                const query = "SELECT * FROM countiesData WHERE state_init = 'MA'";
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

    async getData_MI() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'MI'";
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

    async getData_MN() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'MN'";
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

    async getData_MS() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'MS'";
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

    async getData_MO() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'MO'";
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

    async getData_MT() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'MT'";
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

    async getData_NE() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'NE'";
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

    async getData_NV() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'NV'";
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

    async getData_NH() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'NH'";
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

    async getData_NJ() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'NJ'";
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

    async getData_NM() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'NM'";
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

    async getData_NY() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'NY'";
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

    async getData_NC() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'NC'";
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

    async getData_ND() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'ND'";
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

    async getData_OH() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'OH'";
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

    async getData_OK() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'OK'";
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

    async getData_OR() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'OR'";
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

    async getData_PA() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'PA'";
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

    async getData_RI() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'RI'";
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

    async getData_SC() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'SC'";
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

    async getData_SD() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'SD'";
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

    async getData_TN() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'TN'";
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

    async getData_TX() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'TX'";
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

    async getData_UT() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'UT'";
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

    async getData_VT() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'VT'";
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

    async getData_VA() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'VA'";
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

    async getData_WA() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'WA'";
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

    async getData_WV() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'WV'";
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

    async getData_WI() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'WI'";
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

    async getData_WY() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'WY'";
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

    async getData_DC() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'DC'";
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

    async getData_AS() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'AS'";
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

    async getData_GU() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'GU'";
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

    async getData_MP() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'MP'";
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

    async getData_PR() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'PR'";
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

    async getData_UM() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'UM'";
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

    async getData_VI() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM countiesData WHERE state_init = 'VI'";
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
    /*
    stateAbbreviations.forEach(function(item) { //iterate the any array and then keep adding key and values to new Object
        outputObj[item] = {
          headerName: capitalizeFirstLetter(item)
        };
      });

    for (x = 0; x < stateAbbreviations.length; x++) {
        obj['getData_' + stateAbbreviations[i]]() {
            try {
                const response = await new Promise((resolve, reject) => {
                    const query = "SELECT * FROM countiesData WHERE state_init = " + stateAbbreviations[i];
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
    }*/
}

module.exports = Connector;
