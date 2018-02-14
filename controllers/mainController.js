const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Cryptr = require('cryptr');

const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const cryptr = new Cryptr('myHashes');

const connection = new Sequelize('postgres://king:pass@localhost:5432/mindsetdb');

module.exports = app => {
    let newMindsetData = connection.define('user_mindset_data', {
        user_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        part_one_sum: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        part_two_sum: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        grand_sum: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        part_one: {
            type: Sequelize.JSON,
            allowNull: false
        },
        part_two: {
            type: Sequelize.JSON,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    newMindsetData.sync().catch(error => console.error('Unable to create table', error));

    class User {
        constructor(mindsetResponse) {
            this.userName = mindsetResponse.userName;
            this.partOne = mindsetResponse.partOne;
            this.partTwo = mindsetResponse.partTwo;
        }
        get grandSum() {
            let grandTotal;
            return grandTotal = this.partOne.sum + this.partTwo.sum;
        }
    }

    app.get('/', (req, res) => {
        res.render('index');
    });
    app.get('/result', (req, res) => {
        let request = req.query;
        let dehashed = cryptr.decrypt(request.key);
        connection.query(`SELECT * FROM user_mindset_data WHERE user_name='${dehashed}'`).then(data => {
            let queryResult = data[0][0];

            connection.query('SELECT * FROM mindset_content').then(mindsetQueryContent => {
                let outputContent;
                let total = queryResult.grand_sum;

                switch (true) {
                    case (total >= 8 && total <= 16):
                        outputContent = mindsetQueryContent[0][0].content;
                        break;

                    case (total >= 17 && total <= 24):
                        outputContent = mindsetQueryContent[0][1].content;
                        break;

                    case (total >= 25 && total <= 32):
                        outputContent = mindsetQueryContent[0][2].content;
                        break;

                    case (total >= 33 && total <= 40):
                        outputContent = mindsetQueryContent[0][3].content;
                        break;

                    case (total >= 41 && total <= 48):
                        outputContent = mindsetQueryContent[0][4].content;
                        break;

                    default:
                        outputContent = 'There was an error';
                }

                res.render('result', {
                    name: queryResult.user_name,
                    partOne: queryResult.part_one_sum,
                    partTwo: queryResult.part_two_sum,
                    grandSum: queryResult.grand_sum,
                    content: outputContent
                });
            }).catch(error => console.error("Unable to fetch content", error));
        }).catch(error => console.error("Unable to fetch data", error));

    });

    app.post('/', jsonParser, (req, res) => {
        let userRequest = req.body;

        Object.defineProperty(userRequest.partOne, 'sum', {
            get() {
                let sum = 0;

                for (let values of Object.values(userRequest.partOne)) {
                    sum += Number(values);
                }

                return sum;
            }
        });

        Object.defineProperty(userRequest.partTwo, 'sum', {
            get() {
                let sum = 0;

                for (let values of Object.values(userRequest.partTwo)) {
                    sum += Number(values);
                }

                return sum;
            }
        });

        let userMindsetData = new User(userRequest);

        newMindsetData.create({
            user_name: userMindsetData.userName,
            part_one_sum: userMindsetData.partOne.sum,
            part_two_sum: userMindsetData.partTwo.sum,
            grand_sum: userMindsetData.grandSum,
            part_one: userMindsetData.partOne,
            part_two: userMindsetData.partTwo
        })
        .then(() => {
            let nameHash = cryptr.encrypt(userMindsetData.userName)
            res.redirect(`/result?key=${nameHash}`);
        })
        .catch(error => console.error('There was an error while inserting data', error));
    });
};
