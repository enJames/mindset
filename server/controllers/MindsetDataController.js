import Cryptr from 'cryptr';
import models from '../models/index';
import Feedback from '../data/Feedback';

// Mindset model
const MindsetData = models.enejomindset;
const cryptr = new Cryptr('myHashes');

const MindsetDataController = {
    create: (req, res) => {
        const request = req.body;
        const nameHash = cryptr.encrypt(request.userName);

        let part_one_sum = Object.values(request.partOne).reduce((total, value) => {
            total += value;
            return total;
        });
        let part_two_sum = Object.values(request.partTwo).reduce((total, value) => {
            total += value;
            return total;
        });

        // Create mindset data and persist to database
        MindsetData
            .create({
                user_name: request.userName,
                part_one_sum,
                part_two_sum,
                grand_sum: part_one_sum + part_two_sum,
                part_one: request.partOne,
                part_two: request.partTwo
            })
            .then(() => res.redirect(`/result?key=${nameHash}`))
            .catch(error => console.error('There was a problem', error));
    },
    display: (req, res) => {
        let feedbackContent;
        const dehashed = cryptr.decrypt(req.query.key);

        MindsetData
            .findOne({
                where: { user_name: `${dehashed}` }
            })
            .then((data) => {
                const userMindsetScore = data.dataValues;

                switch (true) {
                case (userMindsetScore.grand_sum >= 8 && userMindsetScore.grand_sum <= 16):
                    feedbackContent = Feedback.feedback_8_16;
                    break;

                case (userMindsetScore.grand_sum >= 17 && userMindsetScore.grand_sum <= 24):
                    feedbackContent = Feedback.feedback_17_24;
                    break;

                case (userMindsetScore.grand_sum >= 25 && userMindsetScore.grand_sum <= 32):
                    feedbackContent = Feedback.feedback_25_32;
                    break;

                case (userMindsetScore.grand_sum >= 33 && userMindsetScore.grand_sum <= 40):
                    feedbackContent = Feedback.feedback_33_40;
                    break;

                case (userMindsetScore.grand_sum >= 41 && userMindsetScore.grand_sum <= 48):
                    feedbackContent = Feedback.feedback_41_48;
                    break;

                default:
                    feedbackContent = 'There was an error';
                }

                res.render('result', {
                    name: userMindsetScore.user_name,
                    partOne: userMindsetScore.part_one_sum,
                    partTwo: userMindsetScore.part_two_sum,
                    total: userMindsetScore.grand_sum,
                    feedbackContent
                });
            })
            .catch(error => console.error(error));

    }
};

export default MindsetDataController;
