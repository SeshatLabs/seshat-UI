import mongoose from 'mongoose'

const contractSchema = new mongoose.Schema({
    contractAddress: { type: String, index: { unique: true, dropDups: true } },
    SourceCode: String,
    ABI: String,
    ContractName: String,
    Proxy: String
})

module.exports = mongoose.model('Contract', contractSchema)
