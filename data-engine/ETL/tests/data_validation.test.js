import { getTransactions, processTransactionAddresses } from "../dao/transaction.dao";
import { checkContractExists } from "../dao/contract.dao";
import {dbConnect, dbDisconnect } from "../helper/mongohelper"
import { expect, jest, test } from '@jest/globals';

jest.setTimeout(100000)

test('check if every transaction\'s contract has a matching document', async () => {
    dbConnect()
    const transactions = await getTransactions()
    async function checkDocumentExists(contractAddress) {
        let exists = await checkContractExists(contractAddress);
        expect(exists).toBe(true);
    }
    try {
        await processTransactionAddresses(transactions, checkDocumentExists);
    } catch (e) {
        console.log(e)
    }
    dbDisconnect()
})