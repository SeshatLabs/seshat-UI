
import { processTransactionContractAddresses } from "../../dao/transaction.dao";
import { fetchContracts } from "../../helper/etherscanhelper";
import { contractpreprocessor } from "../../processors/preprocessors";
import { createContract } from '../../dao/contract.dao'

export async function contractPipeline() {
    //TODO: in future we need to receive contractAddress from Kafka queue, When fetching a transaction, if contract exist, push its address to the Kafka, receive that here to do further processing
    //TODO: When fetching a new tx, add timestamp, to set a curser for downstream processors

    await processTransactionContractAddresses(async (contractAddress) => {
        let contracts = await fetchContracts(contractAddress)
        if (contracts) {
            let finalContracts = contractpreprocessor(contractAddress, contracts)
            finalContracts.forEach(async function (finalContract) {
                await createContract(finalContract)
            })
        }
    })
}
