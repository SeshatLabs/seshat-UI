export function txpreprocessor(transactions, next_page_token){
    for (let i=0; i < transactions.data.length; i++){
        transactions.data[i]['next_page_token'] = next_page_token
    }
    return transactions
}

export function contractpreprocessor(id, contracts){
    let newContracts = []
    let newContract
    contracts.forEach(function(contract) {
            newContract = {
                contractAddress: id,
                SourceCode: contract['SourceCode'],
                ABI: contract['ABI'],
                ContractName: contract['ContractName'],
                Proxy: contract['Proxy']
            }
            newContracts.push(newContract)
    })
    return newContracts
}
