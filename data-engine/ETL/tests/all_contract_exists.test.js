import { processTransactionContractAddresses } from "../dao/transaction.dao";
import { checkContractExists } from "../dao/contract.dao";
import { dbConnect, dbDisconnect } from "../helper/mongohelper"
import { expect, jest, test } from '@jest/globals';

jest.setTimeout(100000)

test('check if every (first 10) transaction\'s contract has a matching document', async () => {
    dbConnect()
    await processTransactionContractAddresses(async (contractAddress) => {
        let exists = await checkContractExists(contractAddress);
        expect(exists).toBe(true);
    }, 10);
    dbDisconnect()
})
