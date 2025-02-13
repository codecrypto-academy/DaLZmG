import { useEffect, useState, useContext } from 'react'
import { UserContext } from './Home'

export const Balance = () => {
  const { wallet, setWallet } = useContext(UserContext);
  const [balance, setBalance] = useState<string | null>(null);

  const getBalance = () => {
    fetch(`http://localhost:3000/api/balance/${wallet}`)
    .then(res => res.json())
    .then (data => {
      console.log(data);
      setBalance(data.balance);
    })
    .catch(err => {
      console.error(err);
      setBalance(null);
    })
  }

  useEffect(() => {
    getBalance();
  }, [wallet])

  if (!balance) {
    return <div>Loading...</div>
  }

  return (
    <div className='mt-5'>
      <h3 className='text-center'>Account Balance using BackEnd</h3>
      <p className='text-center my-3'>Wallet address: <span className='font-weight-bold'>{wallet ? wallet: '...'}</span></p>
      <p className='text-center'>Wallet balance: <span className='font-weight-bold'>{balance != null ? balance: '...'}</span></p>
    </div>
  )
}