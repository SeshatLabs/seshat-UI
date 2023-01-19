import Contract from '../entities/contract.entity'

export async function createContract(contract) {
    try {
      const existingContract = await Contract.findOne({ SourceCode: contract.SourceCode });
      if (existingContract) {
        console.log('Contract with provided Address already exists, bypass...');
        return null;
      } else {
        const finalContract = await Contract.create(contract);
        console.log('Contract created successfully');
        return finalContract;
      }
    } catch (error) {
      console.error(error);
    }
  }