
import Transaction from '../entities/transaction.entity'

export async function getTransactionByID(id){
    const transaction = Transaction.find({"id":id})
    return transaction
}

export async function getTransactions(){
    const cursor = Transaction.find().batchSize(100)
    // Just add a testCursor to test the contract pipeline
    const testCursor = Transaction.find().limit(10)
    return testCursor
}

export async function createTransaction(transaction){
    if (await transactionExist(transaction.id)){
        console.log('transaction with provided id exists, bypass ...')
        return null
    }else{
        const finalTransaction = await Transaction.create(transaction)
        console.log('transaction created successfully')
        return finalTransaction
    } 
}

export async function transactionExist(id){
    const transaction = await getTransactionByID(id)
    if(transaction.length == 0) {
        return false
    }
    return true
}

export async function updateTransactionByID(id, action){
    //const transaction = await getTransactionByID({"id": id})
    const newTransaction = await Transaction.updateOne({"id": id}, action)
    return newTransaction
}