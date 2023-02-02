import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState({});
  const [blockTransactions, setBlockTransactions] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      setBlock(await alchemy.core.getBlock("0x92fc42b9642023f2ee2e88094df80ce87e15d91afa812fef383e6e5cd96e2ed3"));
    }

    getBlockNumber();
  }, []);

  useEffect(() => {
    async function getBlockTransactions() {
      setBlockTransactions(await alchemy.core.getTransactionReceipt(block?.transactions[0]))
    }

    getBlockTransactions()
  }, [setBlock, block])

  return (
    <>
      <div className="App">Block Number: {blockNumber}</div>

      
    </>
  );
}

export default App;
