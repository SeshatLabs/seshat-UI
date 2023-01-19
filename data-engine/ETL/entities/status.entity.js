import mongoose from 'mongoose'

const StatusSchema = new mongoose.Schema({
    next_page_token: String,
    running_status: Boolean
})

module.exports = mongoose.models.Status || mongoose.model('Status', StatusSchema)