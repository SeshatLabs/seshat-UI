import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    media: Buffer,
    description: String,
    advertiser: String,
    mode: String,
    title: String,
    budget: Number,
    runningStatus: Boolean,
    timeRemaining: Number,
    lastStatusChange: Date
})

export default mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);
