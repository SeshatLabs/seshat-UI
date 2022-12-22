import axios from 'axios'

const instance = axios.create({
    url: '',
    headers: {
        'Authorization': 'Bearer ZHtLOMsDvmhUPmOv4EqPEx-SluEIqrgJD853HUJhWpbnTK8k'
    }
})

// async function getTransactions () {
//     const result = await instance.get('https://svc.blockdaemon.com/universal/v1/ethereum/mainnet/txs?page_size=1').then(function (response) {
//         //console.log(response.data.data)
//         return response.data.data
//     }).catch(function (error) {
//         console.log(error)
//     })
// }

async function getTransactions() {
    try {
      const { data } = await instance.get(
        "https://svc.blockdaemon.com/universal/v1/ethereum/mainnet/txs?page_size=1"
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }


// getTransactions().then(data => console.log(data))