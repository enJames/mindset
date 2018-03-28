import Cryptr from 'cryptr';
import models from '../models/index';

// Mindset model
const MindsetData = models.Mindset;
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
            .then(() => res.status(201).redirect(`/result?key=${nameHash}`))
            .catch(error => console.error('There was a problem', error));
    },
    display: (req, res) => {

    }
};

export default MindsetDataController;
