import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../data/inputs";

export const Balance = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  };

  const requestAccount = () => {
    if (typeof window.ethereum !== 'undefined') {
      setIsMetamaskInstalled(true);
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts: any) => {
          if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);

            window.ethereum && window.ethereum.on('accountsChanged', (account: any) => {
              setAccount(account[0]);
            });
            // console.log(accounts);
          } else {
            setAccount(null);
            console.log('No accounts found');
          }
        })
        .catch((error: any) => {
          setAccount(null);
          if (error.code === -32002) {
            console.log('Request permissions pending, please wait');
          } else {
            console.error(error);
          }
        })
    } else {
      console.log('MetaMask is not installed!');
    }
  }

  useEffect(() => {
    requestAccount();
  }, []);

  useEffect(() => {
    if (account) {
      console.log('Getting balance for:', account);
      window.ethereum && window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
        .then((balanceWei: any) => {
          // Convertir manualmente a Ether
          const balanceEther = parseFloat(balanceWei) / Math.pow(10, 18); 
          setBalance(balanceEther);
        })
        .catch((error: any) => {
          setBalance(null);
          console.error(error.message);
        });
    }
  }, [account]);

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
  } else if (!account) {
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
  } else if (isMetamaskInstalled && account) {
    return (
      <div>
        <h3 className='text-center'>Cuenta Metamask seleccionada</h3>
        <p className='text-center my-3'>Wallet address: <span className='font-weight-bold'>{account ? account: '...'}</span></p>
        <p className='text-center'>Wallet balance: <span className='font-weight-bold'>{balance != null ? balance: '...'}</span></p>

        <form className="mx-auto my-5 col-12 col-md-6" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center">Destino de la transacción</h3>
            <div className="form-group mt-3">
              <input className="form-control" placeholder="0x0..." {...register("walletId", { required: true })} />
              {errors.walletId && <span>Este campo es obligatorio</span>}
            </div>
            <div className="form-group mt-3">
              <input className="form-control text-right" placeholder="0.00" {...register("amount", { required: true })} />
              {errors.amount && <span>Este campo es obligatorio</span>}
            </div>
            <div className="form-group mt-3">
              <input className="form-control btn btn-primary" type="submit" />
            </div>
          </form>
      </div>
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
