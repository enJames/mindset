import Cryptr from 'cryptr';
import UserMindsetData from '../models/UserMindsetData';

const cryptr = new Cryptr('myHashes');

const MindsetDataController = {
    create(req, res) {
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
        return UserMindsetData
            .create({
                user_name: request.userName,
                part_one_sum,
                part_two_sum,
                grand_sum: part_one_sum + part_two_sum,
                part_one: request.partOne,
                part_two: request.partTwo
            })
            .then(() => res.status(201).redirect(`/result?key=${nameHash}`))
            .catch(() => res.status(500).render('error'));
    }
};

export default MindsetDataController;
