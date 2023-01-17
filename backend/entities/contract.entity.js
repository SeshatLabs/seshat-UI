import mongoose from 'mongoose'

const contractSchema = new mongoose.Schema({
    contractAddress: String,
    SourceCode: String,
    ABI: String,
    ContractName: String,
    Proxy: String
})

module.exports = mongoose.model.Schema || mongoose.model('Contract', contractSchema)
