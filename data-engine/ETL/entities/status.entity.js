import mongoose from 'mongoose'

const StatusSchema = new mongoose.Schema({
    next_page_token: String,
    running_status: Boolean
})

export default mongoose.model('Status', StatusSchema)
