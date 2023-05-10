import { dbConnect } from '../../data-engine/ETL/helper/mongohelper'
import Campaign from '../../backend/entities/campaign.entity'
export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req, res) {
    dbConnect();
    const { method } = req;
    const { user_sid } = req.query;
    switch (method) {
        case 'GET':
            try {
                const campaigns = await Campaign.find({ advertiser: user_sid }).limit(10);
                res.status(200).json({ success: true, data: campaigns })
            } catch (error) {
                res.status(400).json({ success: false, data: error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }

}
