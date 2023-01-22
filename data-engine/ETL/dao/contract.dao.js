import Contract from '../entities/contract.entity'

export async function createContract(contract) {
  try {
    const finalContract = await Contract.create(contract);
    console.log('Contract created successfully');
    return finalContract;
  } catch (error) {
    console.error(error);
  }
}

export async function checkContractExists(contractAddress) {
  try {
    const existingContract = await Contract.findOne({ contractAddress: contractAddress });
    if (existingContract) return true;
    return false;
  } catch (error) {
    console.error(error);
  }
}