import { useContext, useState } from "react";
import { UserContext } from "./Home";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../types/TypeInputs";

export const Transfer = () => {
  const { wallet, setWallet } = useContext(UserContext);
  const [transMessage, setTransMessage] = useState<string | null>(null);
  const [transError, setTransError] = useState<string | null>(null);
  const [ transConfirmationData, setTransConfirmationData ] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    requestTransfer(data);
  };

  const requestTransfer = ({ walletId, amount }: Inputs) => {
    setTransMessage(null);
    setTransError(null);

    if (amount <= 0) {
      setIsLoading(false);
      setTransError('Transaction error: amount must be greater than 0');
      console.error('Error al realizar la transacción: el amount debe ser mayor que 0');
      return;
    }

    const transParams = {
      to: walletId, 
      from: wallet,
      value: '0x' + (BigInt(parseFloat(amount.toString()) * 10**18)).toString(16)
    }

    try {
      setIsLoading(true);

      window.ethereum && window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transParams as TransParams]
      })
      .then((transHash: string) => {
        setTransMessage('Transaction done! ' + transHash?.toString() || '' + 'Waiting confirmation...');
        setIsLoading(false);
        console.log('Transacción realizada ', transHash, 'Waiting confirmation...');
        waitForTransaction(transHash);

      })
      .catch((error: Error) => {
        setTransError(error.message);
        setIsLoading(false);
        console.error('Error al realizar la transacción ', error);
      });
    } catch (error) {
      setTransMessage('Transaction error ' + error);
      setIsLoading(false);
      console.error('Error al realizar la transacción ', error);
    }
  }

  async function waitForTransaction(txHash: string, maxRetries: number = 30, interval: number = 5000): Promise<void> {
    let retries = 0;
  
    while (retries < maxRetries) {
      try {
        const receipt = await window.ethereum.request({
          method: "eth_getTransactionReceipt",
          params: [txHash],
        });
  
        if (receipt) {
          console.log("Transacción confirmada:", receipt);
          setTransConfirmationData('Transaction confirmed: ' + JSON.stringify(receipt, null, 2));
          return;
        }
      } catch (error) {
        console.error("Error al verificar la transacción:", error);
      }
  
      console.log(`Esperando confirmación... (${retries + 1}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, interval));
      retries++;
    }
  
    console.warn("Se agotaron los intentos de confirmación.");
  }

  if (isLoading) {
    return (
      <div className='grid-template-columns text-center mt-5'>
        <h1>
          Waiting Metamask approval...
        </h1>
        <img className="spinner" src="/spin.svg" />
      </div>
    )
  } else {
    return (
      <div>
        {/* <h1>Transfer</h1> */}
        <form className="mx-auto my-5 col-12 col-md-6" name='trans_form' onSubmit={handleSubmit(onSubmit)}>
          <h5 className="text-center">El origen de la transacción es el Wallet seleccionado</h5>
          <h4 className="text-center">{wallet}</h4>
          <h3 className="text-center mt-4">Destino de la transacción</h3>
          <div className="form-group mt-3">
            <input className="form-control" placeholder="0x0..." {...register("walletId", { required: true })} />
            {errors.walletId && <p className="mt-2 text-center font-italic">Este campo es obligatorio</p>}
          </div>
          <div className="form-group mt-3">
            <input className="form-control text-right" placeholder="0.00" {...register("amount", { required: true })} />
            {errors.amount && <p className="mt-2 text-center font-italic">Este campo es obligatorio</p>}
          </div>
          <div className="form-group mt-3">
            <input className="form-control btn btn-primary" type="submit" />
          </div>
          <div>
            {transMessage && <p className="text-center text-success font-italic">{transMessage}</p>}
            {transConfirmationData && <pre className="">{transConfirmationData}</pre>}
            {transError && <p className="text-center text-danger font-italic">{transError}</p>}
          </div>
        </form>
      </div>
    )
  }
}