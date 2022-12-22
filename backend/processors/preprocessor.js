
export function preprocessor(transactions, next_page_token){
    for (let i=0; i < transactions.data.length; i++){
        transactions.data[i]['next_page_token'] = next_page_token
    }
    return transactions
}

