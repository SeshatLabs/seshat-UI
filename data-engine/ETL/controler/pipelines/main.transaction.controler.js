import { fetchTxs } from "../../helper/ubiquityhelper"
import { txpreprocessor } from "../../processors/preprocessors"
import {createTransaction} from "../../dao/transaction.dao"
import {getNextPagetoken, updateNextPageToken} from "../../dao/status.dao"


export async function mainPipeline() {
    const page_size = 100
    let transactions

    for (let i=0; i<1000; i++){
        let page_token = await getNextPagetoken()
        console.log(page_token)
        transactions = await fetchTxs('ethereum', 'mainnet', page_size, page_token)
        await updateNextPageToken(transactions.meta.paging.next_page_token)

        for (let i=0; i < page_size; i++) {
            try {
                const preprocessedTransactions = txpreprocessor(transactions, page_token)
                const finalTransaction = await createTransaction(preprocessedTransactions.data[i])
              } catch (error) {
                console.log(error)
              }
        }
    }
}