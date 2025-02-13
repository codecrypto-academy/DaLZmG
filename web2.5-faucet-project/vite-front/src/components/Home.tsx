import { useState, createContext, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './Home.css';
import { UserContextType } from '../types/UserContextType';

export const UserContext = createContext<UserContextType>({
  wallet: null,
  setWallet: () => {}
});

export const Home = () => {
  const [wallet, setWallet] = useState<string | null>(null);
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);

  const requestAccount = () => {
    if (typeof window.ethereum !== 'undefined') {
      setIsMetamaskInstalled(true);
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts: any) => {
          if (accounts && accounts.length > 0) {
            setWallet(accounts[0]);

            window.ethereum && window.ethereum.on('accountsChanged', (account: any) => {
              setWallet(account[0]);
            });
          } else {
            setWallet(null);
            console.log('No accounts found');
          }
        })
        .catch((error: any) => {
          setWallet(null);
          if (error.code === -32002) {
            console.log('Request permissions pending, please wait');
          } else {
            console.error(error);
          }
        })
    } else {
      setIsMetamaskInstalled(false);
      console.log('MetaMask is not installed!');
    }
  }

  useEffect(() => {
    requestAccount();
  }, []);

  if (!isMetamaskInstalled) {
    return (
      <div className='text-center mt-5'>
        <h3>
          El complemento de Metamask no está instalado
        </h3>
        <p>
          Vaya a la página de extensiones de Chrome para conseguirlo<br/>
          <a href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target='_blank'>pulsando aquí</a>
        </p>
      </div>
    );
  } else if (!wallet) {
    return (
      <div className='d-flex justify-content-center align-items-center text-center h-50'>
        <h5>
          Se necesitan permisos en la extensión Metamask
          <p className='mt-3'>
            (Por favor revise la extensión Metamask)
          </p>
          <button className='btn btn-primary' onClick={requestAccount}>
            Solicitar permisos
          </button>
        </h5>
      </div>
    )
  } else if (isMetamaskInstalled && wallet) {
    return (
      <UserContext.Provider value={{wallet, setWallet}}>
        <div className='container d-flex flex-column home'>
          <Header />
          <div className='flex-grow-1'>
            <Outlet />
          </div>
          <Footer />
        </div>
      </UserContext.Provider>
    );
  } else {
    return (
      <div className='d-flex justify-content-center align-items-center text-center h-50'>
      <h5>
        Loading ...
      </h5>
    </div>
    )
  }
}