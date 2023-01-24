import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    id: String,
    block_id: String,
    date: Number,
    status: String,
    num_events: Number,
    meta: String || null,
    block_number: Number,
    confirmations: Number,
    events: [{
        id: String,
        transaction_id: String,
        type : {type: String},
        denomination: String,
        destination: String,
        source: String,
        destination: String,
        meta: {
            contract: String,
            type: {type: String},
            base_fee: Number,
            fee_burned: Number,
            gas_limit: Number,
            gas_price: Number,
            gas_used: Number
        },
        date: Number,
        amount: Number,
        decimals: Number,
        }
    ],
    next_page_token: String
})

export default mongoose.model('Transaction', TransactionSchema);

/* Transactions data model
total: 100,
data: [tx1, tx2, ...],
"meta": {
        "paging": {
            "next_page_token": "0x0d71716136e467386775efd0b32a7e6879022907a9a3d2bbdfdc749bb2dff30e-16199752"
        }
    }
*/

/*
tx: {
            "id": "0x9f4a56096e4c320894eed3fc947020175ea7ec0016b60e44b4f323700f43b078",
            "block_id": "0x7e9313dee421865d921d2e076f8da01de8e1e186ca9b6e66f13cc8b853316852",
            "date": 1671223835,
            "status": "completed",
            "num_events": 2,
            "meta": null,
            "block_number": 16199752,
            "confirmations": 13,
            "events": [
                {
                    "id": "0x9f4a56096e4c320894eed3fc947020175ea7ec0016b60e44b4f323700f43b078-fee",
                    "transaction_id": "0x9f4a56096e4c320894eed3fc947020175ea7ec0016b60e44b4f323700f43b078",
                    "type": "fee",
                    "denomination": "ETH",
                    "source": "0x473780deAF4a2Ac070BBbA936B0cdefe7F267dFc",
                    "meta": {
                        "base_fee": 13849103866,
                        "fee_burned": 306217535581126,
                        "gas_limit": 27500,
                        "gas_price": 13849103866,
                        "gas_used": 22111
                    },
                    "date": 1671223835,
                    "amount": 306217535581126,
                    "decimals": 18
                },
                {
                    "id": "0x9f4a56096e4c320894eed3fc947020175ea7ec0016b60e44b4f323700f43b078-382",
                    "transaction_id": "0x9f4a56096e4c320894eed3fc947020175ea7ec0016b60e44b4f323700f43b078",
                    "type": "transfer",
                    "denomination": "ETH",
                    "source": "0x473780deAF4a2Ac070BBbA936B0cdefe7F267dFc",
                    "destination": "0x388C818CA8B9251b393131C08a736A67ccB19297",
                    "meta": null,
                    "date": 1671223835,
                    "amount": 31970624102846306,
                    "decimals": 18
                }
            ]
        }
*/
