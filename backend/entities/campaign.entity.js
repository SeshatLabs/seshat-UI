import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    advertiser: String,
    budget: Number,
    description: String,
    lastStatusChange: Date,
    media: Buffer,
    mode: String,
    runningStatus: Boolean,
    timeRemaining: Number,
    title: String,
})

export default mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);
