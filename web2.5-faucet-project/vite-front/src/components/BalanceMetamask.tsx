import { useEffect, useState, useContext } from 'react';
import { UserContext } from './Home';
// import { useForm, SubmitHandler } from "react-hook-form";
// import { Inputs } from "../data/inputs";

export const BalanceMeta = () => {
  const { wallet, setWallet } = useContext(UserContext);
  const [balance, setBalance] = useState<string | null>(null);
  
  const getBalance = () => {
    if (wallet) {
      console.log('Getting balance for:', wallet);
      window.ethereum && window.ethereum.request({method: 'eth_getBalance', params: [wallet, 'latest']})
        .then((balanceWei: any) => {
          const balanceEther = Number(balanceWei) / 10**18;
          setBalance(balanceEther.toString());
        })
        .catch((error: any) => {
          setBalance(null);
          console.error(error.message);
        });
    } else {
      // console.log('No account selected');
      setBalance(null);
    }
  }

  useEffect(() => {
    getBalance();
  }, [wallet]);

    return (
      <div className='mt-5'>
        <h3 className='text-center'>Account Balance using Metamask</h3>
        <p className='text-center my-3'>Wallet address: <span className='font-weight-bold'>{wallet ? wallet: '...'}</span></p>
        <p className='text-center'>Wallet balance: <span className='font-weight-bold'>{balance != null ? balance: '...'}</span></p>
      </div>
    );
}