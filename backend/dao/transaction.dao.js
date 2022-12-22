
import Transaction from '../entities/transaction.entity'

export async function getTransactionByID(id){
    const transaction = Transaction.find({"id":id})
    return transaction
}

export async function getTransactions(){
    //TODO spike, how handel the paggination
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