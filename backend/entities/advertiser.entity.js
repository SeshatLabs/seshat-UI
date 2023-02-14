import mongoose from 'mongoose';

const advertiserSchema = new mongoose.Schema({
    name: { type: String, index: { unique: true, dropDups: true } },
})

export default mongoose.models.Advertiser || mongoose.model('Advertiser', advertiserSchema);
